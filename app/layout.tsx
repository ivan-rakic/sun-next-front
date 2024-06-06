import '@/styles/globals.scss'
import globalStyles from '@/styles/reusable.module.scss'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import React from 'react';
import { Changa } from 'next/font/google'


const inter = Changa({ weight: ['400'], subsets: ['latin'] })
export default function RootLayout({ children, }: { children: React.ReactNode }) {




  // TODO: promeniti strukturu rootLayouta, tako da HomePage, koji se dolazi iz childrena, moze da bude preLoad-ovan
  // -- proveriti kakva struktura Layouta treba biti sa ciljem da se HomePage, Header, Hero i Footer comp. pre-loaduju

  return (
    <html>
      <body className={inter.className}>
        <div className={globalStyles.container}>
          <Header data={null} />
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

