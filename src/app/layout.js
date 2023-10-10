

import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
import NextTopLoader from 'nextjs-toploader';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
