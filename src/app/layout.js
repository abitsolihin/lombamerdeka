'use client'

import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation'; // Impor useRouter

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Dapatkan objek router

  // Periksa apakah path saat ini adalah '/lomba/[id]' atau '/lomba/slug'
  const isLombaPage = pathname.startsWith('/lomba/');

  return (
    <html lang="en">
      <body>
        <NextTopLoader color='#000000' />
        <AuthProvider>
          <main className='min-h-screen flex justify-center mx-4 md:mx-24'>
            {isLombaPage ? null : <Navbar />} {/* Menyembunyikan Navbar jika di laman Lomba */}
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
