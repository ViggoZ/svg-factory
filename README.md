# SVG Factory

[English](README.md) | [中文](README.zh.md)
# SVG Factory

SVG Factory is a completely free tool designed to help users easily compress SVG files. Our goal is to make SVG compression simple, fast, and efficient. Whether you are a designer, developer, or anyone who needs to handle SVG files, SVG Factory can assist you.

## About the Author

This website was developed by [Viggo](https://x.com/decohack), who is not a professional developer but managed to create this tool with the help of AI. The entire project was developed using [Cursor](https://www.cursor.so/) and designed in [Figma](https://www.figma.com/). It took approximately 3 hours to complete.

## Features

- **Batch Optimization**: Optimize multiple SVG files at once.
- **Paste Optimization**: Support for optimizing SVG content pasted from the clipboard.
- **Download Optimized Results**: Optimized SVG files can be downloaded individually or as a package.
- **Real-time Feedback**: Provides a comparison of file sizes before and after optimization and the optimization percentage.

## Installation and Running

### 1. Clone the Repository

```bash
git clone https://github.com/ViggoZ/svg-factory.git
cd svg-factory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
npm start
```

## Main Components

### `src/app/page.tsx`

The main page component, responsible for managing file upload, optimization, and download processes.

### `src/components/DropZone.tsx`

File upload area component, supporting drag-and-drop and paste operations.

### `src/components/FileList.tsx`

Component displaying the list of uploaded files.

### `src/components/OptimizedSVGs.tsx`

Component displaying the list of optimized SVG files, providing download and copy functions.

### `src/components/HeaderNav.tsx`

Navigation bar component, containing the project name and navigation links.

### `src/components/ErrorAlert.tsx`

Error alert component, used to display error messages.

## Dependencies

- **React**: For building the user interface.
- **Next.js**: For building server-rendered React applications.
- **SVGO**: For optimizing SVG files.
- **react-dropzone**: For handling file drag-and-drop operations.
- **react-confetti**: For displaying confetti effects after successful optimization.

## Contributing

Issues and pull requests are welcome. Please ensure to run `npm run lint` and `npm run test` before submitting your code.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact Me

If you have any questions or feedback, feel free to contact me via:

- Email: [viggo.zw@gmail.com](mailto:viggo.zw@gmail.com)
- Twitter: [@decohack](https://x.com/decohack)
- Support Me: [Buy Me a Coffee](https://buymeacoffee.com/viggoz)