'use client'

import { useEffect, useState } from 'react'
import DropZone from '../components/DropZone'
import FileList from '../components/FileList'
import OptimizedSVGs from '../components/OptimizedSVGs'
import { optimizeSVG } from '../utils/svgOptimizer'
import ErrorAlert from '../components/ErrorAlert'

export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  const [optimizedSVGs, setOptimizedSVGs] = useState<any[]>([])
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setStep(2)
  }

  const handlePaste = (event: ClipboardEvent) => {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const items = Array.from(clipboardData.items);
      const svgFiles = items.filter(item => item.type === 'image/svg+xml').map(item => item.getAsFile());
      if (svgFiles.length > 0) {
        setFiles([...files, ...svgFiles.filter(file => file !== null)] as File[]);
        setStep(2);
      } else {
        const text = clipboardData.getData('text');
        if (text) {
          const blob = new Blob([text], { type: 'image/svg+xml' });
          const file = new File([blob], 'pasted.svg', { type: 'image/svg+xml' });
          setFiles([...files, file]);
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
    if (optimizedSVGs.length === 1) {
      const link = document.createElement('a')
      const blob = new Blob([optimizedSVGs[0].optimizedSvg], { type: 'image/svg+xml' })
      link.href = URL.createObjectURL(blob)
      link.download = optimizedSVGs[0].name
      link.click()
    } else if (optimizedSVGs.length > 1) {
      import('jszip').then((JSZip) => {
        const zip = new JSZip.default()
        optimizedSVGs.forEach((svg) => {
          zip.file(svg.name, svg.optimizedSvg)
        })
        zip.generateAsync({ type: 'blob' }).then((content) => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(content)
          link.download = 'optimized_svgs.zip'
          link.click()
        })
      })
    }
  }

  const handleOptimize = async () => {
    if (files.length === 0) {
      setError('Please upload SVG files first')
      return
    }

    const optimized = await Promise.all(
      files.map(async (file) => {
        const result = await optimizeSVG(file)
        return {
          name: file.name,
          originalSize: file.size,
          optimizedSize: result.size,
          optimizedSvg: result.data,
        }
      })
    )
    setOptimizedSVGs(optimized)
    setStep(3)
  }

  const handleStartOver = () => {
    setFiles([])
    setOptimizedSVGs([])
    setStep(1)
  }

  return (
    <main className="flex flex-col items-center gap-4 w-full">
      <div className="text-center mb-4 w-full">
        <h1 className="text-2xl sm:text-4xl font-bold">Free Bulk SVG Optimizer</h1>
        <p className="text-base pt-4">Optimize your SVG files with SVG Factory, a free and easy-to-use tool for bulk SVG optimization. 100% automatically and free.</p>
      </div>
      {step === 1 && (
        <>
          <DropZone onFileSelect={handleFileSelect} />
          <button 
            onClick={handleOptimize} 
            className="mt-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl"
          >
            Optimize SVGs
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
            Optimize SVGs
          </button>
        </>
      )}
      {step === 3 && (
        <>
          <OptimizedSVGs svgs={optimizedSVGs} />
          <div className="flex mt-4 w-full gap-3">
            <button onClick={handleDownload} className="mr-4 w-full py-4 bg-neutral-800 hover:bg-neutral-950 transition duration-300 text-white rounded-2xl">
              Download All SVGs
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


