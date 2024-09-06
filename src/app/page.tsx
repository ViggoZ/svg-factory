'use client'

import { useEffect, useState } from 'react'
import DropZone from '../components/DropZone'
import FileList from '../components/FileList'
import OptimizedSVGs from '../components/OptimizedSVGs'
import { optimizeSVG } from '../utils/svgOptimizer'
import ErrorAlert from '../components/ErrorAlert'
import imageCompression from 'browser-image-compression'

export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [optimizedFiles, setOptimizedFiles] = useState<any[]>([])
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const MAX_FILES = 40;
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

  const handleFileSelect = (selectedFiles: File[]) => {
    if (selectedFiles.length > MAX_FILES) {
      setError(`You can upload a maximum of ${MAX_FILES} files at a time.`);
      return;
    }
    if (selectedFiles.some(file => file.size > MAX_FILE_SIZE)) {
      setError('Each file must be less than 8MB.');
      return;
    }
    setFiles(selectedFiles);
    setStep(2);
  }

  const handlePaste = (event: ClipboardEvent) => {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const items = Array.from(clipboardData.items);
      const svgFiles = items.filter(item => item.type === 'image/svg+xml').map(item => item.getAsFile());
      if (svgFiles.length > 0) {
        const allFiles = [...files, ...svgFiles.filter(file => file !== null) as File[]];
        if (allFiles.length > MAX_FILES) {
          setError(`You can upload a maximum of ${MAX_FILES} files at a time.`);
          return;
        }
        if (allFiles.some(file => file && file.size > MAX_FILE_SIZE)) {
          setError('Each file must be less than 8MB.');
          return;
        }
        setFiles(allFiles);
        setStep(2);
      } else {
        const text = clipboardData.getData('text');
        if (text) {
          const blob = new Blob([text], { type: 'image/svg+xml' });
          const file = new File([blob], 'pasted.svg', { type: 'image/svg+xml' });
          const allFiles = [...files, file];
          if (allFiles.length > MAX_FILES) {
            setError(`You can upload a maximum of ${MAX_FILES} files at a time.`);
            return;
          }
          if (file.size > MAX_FILE_SIZE) {
            setError('Each file must be less than 8MB.');
            return;
          }
          setFiles(allFiles);
          setStep(2);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [files]);

  const handleDownload = () => {
    if (optimizedFiles.length === 1) {
      const link = document.createElement('a')
      const blob = new Blob([optimizedFiles[0].optimizedData], { type: optimizedFiles[0].type })
      link.href = URL.createObjectURL(blob)
      link.download = optimizedFiles[0].name
      link.click()
    } else if (optimizedFiles.length > 1) {
      import('jszip').then((JSZip) => {
        const zip = new JSZip.default()
        optimizedFiles.forEach((file) => {
          const blob = new Blob([file.optimizedData], { type: file.type })
          zip.file(file.name, blob)
        })
        zip.generateAsync({ type: 'blob' }).then((content) => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(content)
          link.download = 'optimized_files.zip'
          link.click()
        })
      })
    }
  }

  const handleOptimize = async () => {
    if (files.length === 0) {
      setError('Please upload files first')
      return
    }

    const optimized = await Promise.all(
      files.map(async (file) => {
        if (file.type === 'image/svg+xml') {
          const result = await optimizeSVG(file)
          return {
            name: file.name,
            originalSize: file.size,
            optimizedSize: result.size,
            optimizedData: result.data,
            type: 'image/svg+xml',
          }
        } else if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/webp') {
          const options = {
            useWebWorker: true,
            maxIteration: 10,
            preserveExif: true,
            alwaysKeepResolution: true,
            initialQuality: 0.6, // 默认值
          }

          if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            options.initialQuality = 0.6
          } else if (file.type === 'image/webp') {
            options.initialQuality = 0.8
          }

          const compressedFile = await imageCompression(file, options)
          const compressedFileData = await compressedFile.arrayBuffer()
          return {
            name: file.name,
            originalSize: file.size,
            optimizedSize: compressedFile.size,
            optimizedData: new Uint8Array(compressedFileData),
            type: file.type,
          }
        } else {
          // 对于不支持的文件类型，直接返回��始文件
          return {
            name: file.name,
            originalSize: file.size,
            optimizedSize: file.size,
            optimizedData: new Uint8Array(await file.arrayBuffer()),
            type: file.type,
          }
        }
      })
    )
    setOptimizedFiles(optimized)
    setStep(3)
  }

  const handleStartOver = () => {
    setFiles([])
    setOptimizedFiles([])
    setStep(1)
  }

  return (
    <main className="flex flex-col items-center gap-4 w-full">
      <div className="text-center mb-4 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold">Free Bulk Image Optimizer</h1>
        <p className="text-base pt-4">Optimize your images with our free and easy-to-use tool for bulk image optimization. 100% automatically and free.</p>
      </div>
      {step === 1 && (
        <>
          <DropZone onFileSelect={handleFileSelect} />
          <button 
            onClick={handleOptimize} 
            className="mt-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl"
          >
            Optimize Images
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <FileList files={files} />
          <button 
            onClick={handleOptimize} 
            className="mt-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl"
          >
            Optimize Images
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <OptimizedSVGs svgs={optimizedFiles} />
          <div className="flex mt-4 w-full gap-3">
            <button onClick={handleDownload} className="mr-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl">
              Download All Images
            </button>
            <button onClick={handleStartOver} className="w-full py-4 font-bold border-2 border-neutral-800 hover:bg-white/50 text-neutral-800  transition duration-300 rounded-2xl">
              Start Over
            </button>
          </div>
        </>
      )}
      {error && <div className="mt-4"><ErrorAlert message={error} onClose={() => setError(null)} /></div>}
    </main>
  )
}


