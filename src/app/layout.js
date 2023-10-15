

import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2066100267293064"
        />
        <NextTopLoader color='#000000' />
        <AuthProvider>
          <main className='min-h-screen flex justify-center mx-4 md:mx-24'>
            <Navbar />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
