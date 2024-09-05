import Image from 'next/image';

interface FileListProps {
    files: File[]
  }
  
  export default function FileList({ files }: FileListProps) {
    return (
      <div className="w-full p-12 bg-[#F1F0E2] rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Selected Files</h2>
          <span className="text-sm text-gray-600">({files.length} files selected)</span>
        </div>
        <ul className="max-h-64 overflow-y-auto custom-scrollbar">
          {files.map((file, index) => (
            <li key={index} className="flex items-center pb-2">
              <Image src="/ic_svg_file.svg" alt="File Icon" width={20} height={20} className="mr-2" />
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </li>
          ))}
        </ul>
      </div>
    )
  }