import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'
import HeaderNav from '../components/HeaderNav'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SVG Factory - Free Bulk SVG Optimizer',
  description: 'Optimize your SVG files 100% automatically and for free with SVG Factory.',
  keywords: 'SVG, SVG Optimizer, Free SVG Optimizer, Bulk SVG Optimizer, SVG Factory',
  openGraph: {
    title: 'SVG Factory - Free Bulk SVG Optimizer',
    description: 'Optimize your SVG files 100% automatically and for free with SVG Factory.',
    images: [
      {
        url: '/og-image.webp', 
        width: 1200,
        height: 630,
        alt: 'SVG Factory - Free Bulk SVG Optimizer',
      },
    ],
    url: 'https://svg-factory.vercel.app/', 
    siteName: 'SVG Factory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVG Factory - Free Bulk SVG Optimizer',
    description: 'Optimize your SVG files 100% automatically and for free with SVG Factory.',
    images: ['/og-image.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon/favicon-48x48.png" />
        <link rel="manifest" href="/favicon/manifest.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="application-name" content="Favicon Generator" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/favicon/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="1024x1024" href="/favicon/apple-touch-icon-1024x1024.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Favicon Generator" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      </head>
      <body className={`flex flex-col min-h-screen bg-[#E2E1CF] text-neutral-800`}>
        <HeaderNav />
        <main className="flex-grow flex items-center justify-center px-4 pt-28 sm:pt-24 pb-12">
          <div className="flex-grow flex items-center justify-center max-w-xl">
            {children}
          </div>
        </main>
        <div className="w-full">
          <img src="/factory.svg" alt="Factory" className="w-full" />
        </div>
        <footer className='px-6 pt-4 sm:pt-0 pb-6 bg-neutral-800 text-neutral-500 text-center'>Copyright © 2021-2024 <a href='https://decohack.com' title='Decohack' target='_blank'>Decohack</a>. Created with ❤️ by  <a href='https://x.com/decohack' title='Viggo' target='_blank'>Viggo</a></footer>
      </body>
    </html>
  )
}
