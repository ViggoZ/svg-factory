'use client'

export default function About() {
  return (
    <main className="flex flex-col items-center gap-4 w-full">
      <div className="text-center mb-4 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold">About SVG Factory</h1>
        <p className="text-base pt-4">
          SVG Factory is a free and easy-to-use tool for bulk SVG optimization. Our mission is to help designers and developers optimize their SVG files quickly and efficiently.
        </p>
      </div>
      <div className="w-full max-w-3xl bg-[#F1F0E2] p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Our Features</h2>
        <ul className="list-disc list-inside">
          <li>Bulk SVG optimization</li>
          <li>Drag & Drop file upload</li>
          <li>Paste SVG content directly</li>
          <li>Download optimized SVGs individually or as a zip file</li>
          <li>100% free and open-source</li>
        </ul>
      </div>
      <div className="w-full max-w-3xl bg-[#F1F0E2] p-6 rounded-2xl mt-4">
        <h2 className="text-xl font-bold mb-4">About the Author</h2>
        <p>
          This website was developed by <a href="https://x.com/decohack" target="_blank" rel="noopener noreferrer" className="text-blue-600">Viggo</a>, who is not a professional developer but managed to create this tool with the help of AI. The entire project was developed using <a href="https://www.cursor.so/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Cursor</a> and designed in <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600">Figma</a>. It took approximately 3 hours to complete.
        </p>
        <p className="mt-4">
          If you find this tool useful, please consider supporting the author by <a href="https://buymeacoffee.com/viggoz" target="_blank" rel="noopener noreferrer" className="text-blue-600">buying me a coffee</a>.
        </p>
      </div>
      <div className="w-full max-w-3xl bg-[#F1F0E2] p-6 rounded-2xl mt-4">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        <p>
          If you have any questions or feedback, please feel free to reach out to us at <a href="mailto:viggo.zw@gmail.com" className="text-blue-600">viggo.zw@gmail.com</a>.
        </p>
      </div>
    </main>
  )
}