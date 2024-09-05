"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HeaderNav() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const goToUploadPage = () => {
    router.push('/upload'); // 假设上传文件的页面路径是 '/upload'
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed items-center w-full z-50 ${isScrolled ? 'bg-factory' : ''}`}>
      <nav className="flex justify-between text-center max-w-7xl mx-auto p-4">
        <Link href="/" className="flex items-center" onClick={goToUploadPage}>
          <img src="/logo.svg" alt="SVG Factory Logo" className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4" />
          <span className="text-xl sm:text-3xl font-bold text-neutral-800">SVG Factory</span>
        </Link>
        <div className="flex gap-2">
          <Link href="https://x.com/decohack" target="_blank" rel="noopener noreferrer" className="text-neutral-800 flex items-center h-full p-1 hover:text-neutral-950 rounded-full transition duration-300">
            <img src="/ic_twitter.svg" alt="Twitter Logo" className="w-8 h-8" />
          </Link>
          <Link href="https://buymeacoffee.com/viggoz" target="_blank" rel="noopener noreferrer" className="text-neutral-800 flex items-center h-full p-1 hover:text-neutral-950 rounded-full transition duration-300">
            <img src="/ic_coffee.svg" alt="Buy Me a Coffee Logo" className="w-8 h-8" />
          </Link>
          <Link href="/about" className="text-neutral-800 flex items-center h-full p-3 hover:text-neutral-950 rounded-full transition duration-300">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}