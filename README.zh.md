# SVG Factory

[English](README.md) | [中文](README.zh.md)

## 关于 SVG Factory

SVG Factory 是一个完全免费的工具，旨在帮助用户轻松压缩 SVG 文件。我们的目标是让 SVG 压缩变得简单、快速且高效。无论您是设计师、开发者还是任何需要处理 SVG 文件的人，SVG Factory 都能为您提供帮助。

### 关于作者

这个网站是由 [Viggo](https://x.com/decohack) 开发，我并非专业开发者，但在 AI 的帮助下成功创建了这个工具。整个项目使用 [Cursor](https://www.cursor.so/) 开发，并在 [Figma](https://www.figma.com/) 中设计。整个过程大约花费了 3 小时完成。

## 功能

- **批量优化**：一次性优化多个 SVG 文件。
- **粘贴优化**：支持从剪贴板粘贴 SVG 内容进行优化。
- **下载优化结果**：优化后的 SVG 文件可以单独下载或打包下载。
- **实时反馈**：提供优化前后的文件大小对比和优化百分比。

## 安装与运行

### 1. 克隆仓库

```bash
git clone https://github.com/ViggoZ/svg-factory.git
cd svg-factory
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 主要组件

### `src/app/page.tsx`

主页面组件，负责管理文件上传、优化和下载流程。

### `src/components/DropZone.tsx`

文件上传区域组件，支持拖放和粘贴操作。

### `src/components/FileList.tsx`

显示已上传文件列表的组件。

### `src/components/OptimizedSVGs.tsx`

显示优化后的 SVG 文件列表，并提供下载和复制功能。

### `src/components/HeaderNav.tsx`

导航栏组件，包含项目名称和导航链接。

### `src/components/ErrorAlert.tsx`

错误提示组件，用于显示错误信息。

## 依赖库

- **React**：用于构建用户界面。
- **Next.js**：用于构建服务器渲染的 React 应用。
- **SVGO**：用于优化 SVG 文件。
- **react-dropzone**：用于处理文件拖放操作。
- **react-confetti**：用于在优化成功后显示撒花效果。

## 贡献

欢迎提交 Issue 和 Pull Request。请确保在提交代码前运行 `npm run lint` 和 `npm run test`。

## 许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

### 联系我

如果您有任何问题或反馈，请随时通过以下方式联系我：

- 邮箱：[viggo.zw@gmail.com](mailto:viggo.zw@gmail.com)
- Twitter：[@decohack](https://x.com/decohack)
- 支持我：[Buy Me a Coffee](https://buymeacoffee.com/viggoz)