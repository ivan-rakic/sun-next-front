'use client';

import { Changa, Inter } from 'next/font/google'
import '@/styles/globals.scss'
import globalStyles from '@/styles/reusable.module.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Hero from '@/components/hero'


const inter = Changa({ weight: ['400'], subsets: ['latin'] })

export const metadata = {
  title: 'sunradio.rs',
  description: 'sunradio...',
}

const fallBackLinks = [
  {
    id: 1,
    url: '/about',
    newTab: false,
    text: 'PODCAST',
  },
  {
    id: 2,
    url: '/about',
    newTab: false,
    text: 'ABOUT US',
  },
  {
    id: 3,
    url: '/about',
    newTab: false,
    text: 'SUPPORT',
  },
  {
    id: 4,
    url: '/about',
    newTab: false,
    text: 'WHO ARE WE',
  },
]



export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <div className={globalStyles.container}>
            <Header links={fallBackLinks} logoUrl={null} logorText={null} />
            <Hero />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
  )
}
