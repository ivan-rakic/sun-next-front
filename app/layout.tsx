import "@/styles/globals.scss";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import React from "react";
import { Changa } from "next/font/google";

const inter = Changa({ weight: ["400"], subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <div className="w-full">
          <Header />
          <Hero />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
