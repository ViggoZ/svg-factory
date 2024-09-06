import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface OptimizedSVGsProps {
    svgs: {
      name: string
      originalSize: number
      optimizedSize: number
      optimizedSvg: string
    }[]
  }
  
  export default function OptimizedSVGs({ svgs }: OptimizedSVGsProps) {
    const [copySuccess, setCopySuccess] = useState('');
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // 5秒后停止撒花
      return () => clearTimeout(timer);
    }, []);

    const totalOriginalSize = svgs.reduce((sum, svg) => sum + svg.originalSize, 0);
    const totalOptimizedSize = svgs.reduce((sum, svg) => sum + svg.optimizedSize, 0);
    const totalSavedSize = totalOriginalSize - totalOptimizedSize;
    const totalSavedSizeKB = (totalSavedSize / 1024).toFixed(2);
    const totalSavedSizeMB = (totalSavedSize / (1024 * 1024)).toFixed(2);
    const totalSavedPercentage = ((totalSavedSize / totalOriginalSize) * 100).toFixed(2);

    const handleCopyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess('SVG copied to clipboard');
        setTimeout(() => setCopySuccess(''), 3000);
      }).catch(err => {
        console.error('Failed to copy SVG: ', err);
      });
    };

    const truncateFileName = (name: string, maxLength: number = 20) => {
      return name.length > maxLength ? name.substring(0, maxLength - 3) + '...' : name;
    };

    return (
      <div className="w-full p-4 sm:p-12 bg-[#F1F0E2] rounded-2xl">
        {showConfetti && (
          <Confetti
            recycle={false} // 不循环播放
            run={showConfetti} // 控制动画是否运行
            numberOfPieces={2000} // 撒花的数量
            initialVelocityX={10} // 水平初始速度
            initialVelocityY={60} // 垂直初始速度
            gravity={0.3} // 重力效果
            wind={0} // 水平风力效果
          />
        )}
        <div className='flex justify-between items-center pb-4 pr-2'>
        <h2 className="text-sm sm:text-xl font-bold">Optimized {svgs.length} SVGs: </h2>
        <div>
        <span className="text-sm sm:text-md font-bold pr-2">
          saved {totalSavedSize >= 1024 * 1024 ? `${totalSavedSizeMB} MB` : `${totalSavedSizeKB} KB`}
        </span>
        <span className="text-xs sm:text-md font-semibold bg-green-500 px-3 py-1 rounded-full">
          -{totalSavedPercentage}%</span>
          
        </div>
        
        </div>
        <ul className="max-h-80 overflow-y-auto custom-scrollbar pr-2">
          {svgs.map((svg, index) => (
            <li key={index} className="mb-4 flex gap-1 items-center bg-[#DAD9C4] p-2 rounded-lg">
              <img src="/ic_svg_file.svg" alt="File Icon" width={40} height={40} />
              <div className="flex flex-col gap-1"> 
              <span className="font-bold">{truncateFileName(svg.name)}</span>
              <span className="text-xs">
                {(svg.originalSize / 1024).toFixed(2)} KB → {(svg.optimizedSize / 1024).toFixed(2)} KB,{' '}
                {((1 - svg.optimizedSize / svg.originalSize) * 100).toFixed(2)}% optimized
              </span>
              </div>
              <div className="ml-auto flex gap-2">
                <button onClick={() => downloadSVG(svg.optimizedSvg, svg.name)}><img src="/ic_download.svg" alt="Download Icon" width={30} height={30} /></button>
                <button onClick={() => handleCopyToClipboard(svg.optimizedSvg)}><img src="/ic_copy.svg" alt="Copy Icon" width={30} height={30} /></button>
              </div>
            </li>
          ))}
        </ul>
        {copySuccess && <div className="mt-4 text-green-600">{copySuccess}</div>}
      </div>
    )
  }

  // 添加下载和复制功能
  function downloadSVG(svg: string, name: string) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg));
    element.setAttribute('download', name);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('SVG copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy SVG: ', err);
    });
  }