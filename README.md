Here’s the properly formatted version of your README with the required edits and proper syntax:


# Draft.js Editor

This is a simple text editor built using [Draft.js](https://draftjs.org/), a powerful React-based framework for building rich text editors. The editor supports basic inline styling such as **bold**, *italic*, underline, and custom header formatting. Additionally, the content is automatically saved to `localStorage` to persist across page reloads.

## Features
- **Inline Styling**: 
  - **Bold** (`*text*`)
  - **Red Line** (`**text**`)
  - **Underlined** (`***text***`)
  - **Header** (`# text`)
- **LocalStorage Persistence**: Saves editor content to `localStorage`, so it remains even after page reloads.
- **Custom Styling**: Custom styles are applied for different inline styles like bold, red line, underlined text, and headers.
- **React & Draft.js**: This project utilizes `React` for the UI and `Draft.js` for handling rich text editing.

## Installation

Follow the steps below to run this project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/draft-js-editor.git
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd draft-js-editor
npm install
```

### 3. Run the project

To start the development server and view the editor locally, use:

```bash
npm start
```

Your app will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

- **Inline Styles**: To apply formatting, type the following symbols before the text:
  - `*text*` for **bold**
  - `**text**` for **red line**
  - `***text***` for **underlined** text
  - `# text` for **headers**

  After typing the symbols, press the **spacebar** to apply the respective style.

- **Save Content**: Click the "Save" button to save the current editor content to `localStorage`. This allows the content to persist across page reloads.

- **Persistence**: The content of the editor will automatically be saved in `localStorage`. Upon page reload, the editor will retrieve and display the saved content.

## Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request with your changes. Here are a few ways you can contribute:
- Report bugs
- Suggest improvements or features
- Submit code for bugs or features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Now you can copy and paste this into your `README.md`. This version is formatted correctly with proper markdown syntax!
