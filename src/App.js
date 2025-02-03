import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import "draft-js/dist/Draft.css";

const styleMap = {
  "BOLD": { fontWeight: "bold", fontSize: "16px" },
  "RED-LINE": { color: "red", fontSize: "16px" },
  "UNDERLINE": { textDecoration: "underline", fontSize: "16px" },
  "HEADER": { fontWeight: "bold", fontSize: "40px" }
};

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    return savedContent
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      : EditorState.createEmpty();
  });

  // Handle input before actual text is added to the editor
  const handleBeforeInput = (chars, editorState) => {
    if (chars !== " ") return "not-handled"; // Only handle space key

    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const text = block.getText();

    let token = null;
    let inlineStyle = null;

    // Identify which special token is at the beginning of the line
    if (text.startsWith("***")) {
      token = "***";
      inlineStyle = "UNDERLINE";
    } else if (text.startsWith("**")) {
      token = "**";
      inlineStyle = "RED-LINE";
    } else if (text.startsWith("*")) {
      token = "*";
      inlineStyle = "BOLD";
    } else if (text.startsWith("#")) {
      token = "#";
      inlineStyle = "HEADER";
    }

    if (token) {
      // Remove the token (e.g., "#", "*", "**", "***") from the text
      const tokenSelection = selection.merge({
        anchorOffset: 0,
        focusOffset: token.length
      });

      const newContentState = Modifier.replaceText(
        contentState,
        tokenSelection,
        "" // Remove the token (i.e., "#", "*", etc.)
      );

      let newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );

      newEditorState = EditorState.forceSelection(
        newEditorState,
        newEditorState.getSelection().merge({
          anchorOffset: 0,
          focusOffset: 0
        })
      );

      // Apply the inline style after removing the token
      if (inlineStyle) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, inlineStyle);
      }

      setEditorState(newEditorState); // Update the editor state
      return "handled";
    }

    return "not-handled"; // If no special token is found, return not-handled
  };

  // Save the editor content to localStorage
  const handleSave = () => {
    const content = editorState.getCurrentContent();
    localStorage.setItem("editorContent", JSON.stringify(convertToRaw(content)));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Draft.js Editor</h1>
      <div style={styles.editorWrapper}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={styleMap}
          placeholder="Start typing..."
        />
      </div>
      <button style={styles.saveButton} onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "auto",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    color: "#333"
  },
  editorWrapper: {
    border: "1px solid #ccc",
    padding: "15px",
    minHeight: "250px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    marginBottom: "20px"
  },
  saveButton: {
    display: "block",
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default DraftEditor;
