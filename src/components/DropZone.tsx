import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ErrorAlert from './ErrorAlert'

interface DropZoneProps {
  onFileSelect: (files: File[]) => void
}

export default function DropZone({ onFileSelect }: DropZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      setError('Please upload files in SVG format');
    } else {
      onFileSelect(acceptedFiles);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/svg+xml': ['.svg'] } });

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const text = clipboardData.getData('text');
      if (text) {
        const blob = new Blob([text], { type: 'image/svg+xml' });
        const file = new File([blob], 'pasted.svg', { type: 'image/svg+xml' });
        onFileSelect([file]);
      }
    }
  };

  return (
    <div onPaste={handlePaste} className='w-full'>
      <div {...getRootProps()} className="w-full max-w-7xl border-2 border-dashed border-neutral-800 px-6 py-10 bg-[#F1F0E2] text-center cursor-pointer rounded-3xl">
        <input {...getInputProps()} />
        <img src="/ic_upload.svg" alt="Upload Icon" className="w-24 h-24 mx-auto mb-4" />
        {
          isDragActive ?
            <p className='text-lg font-bold'>Drop the SVG files here ...</p> :
            <p className='text-lg font-bold'>Drag & Drop SVG files or paste SVG Here</p>
        }
        <button className="flex mt-4 mx-auto px-12 py-4 bg-neutral-800 hover:bg-neutral-950 text-white text-base transition duration-300 rounded-2xl">
        <img src="/ic_add.svg" alt="Upload Icon" className="w-6 h-6 mx-auto pr-2" />
          Upload
        </button>
      </div>
      {error && <div className="mt-4"><ErrorAlert message={error} onClose={() => setError(null)} /></div>}
    </div>
  );
}