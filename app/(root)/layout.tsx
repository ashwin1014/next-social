import { ReactNode } from "react";

import { Metadata } from "next";
import { Inter } from 'next/font/google'

import clsx from "clsx"
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

import TopBar from "@/components/shared/TopBar";

import '../globals.css'
import classes from './layout.module.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Social',
  description: 'Threads Clone built with Next.js',
}

function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body className={clsx(inter.className, 'bg-dark-1')}>
          <TopBar />
          <main>
            <section className="main-container">
              <div className={classes.wrapper}>
                {children}
              </div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout;