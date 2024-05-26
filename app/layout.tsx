'use client';

import { Changa, Changa_One, Inter } from 'next/font/google'
import '@/styles/globals.scss'
import globalStyles from '@/styles/reusable.module.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import React from 'react';

const inter = Changa({ weight: ['400'], subsets: ['latin'] })

export const metadata = {
  title: 'sunradio.rs',
  description: 'sunradio...',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const [headerData, setHeaderData] = React.useState(null);


  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={globalStyles.container}>
          <Header data={null as any} />
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

