import { ReactNode } from "react";

import { Metadata } from "next";
import { Inter } from 'next/font/google'

import clsx from "clsx";
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";
import BottomBar from "@/components/shared/BottomBar";
import NextNProgressClient from '@/components/shared/NextProgress'

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
          <NextNProgressClient />
          <TopBar />
          <main className="flex flex-row">
            <LeftSideBar />
            <section className="main-container">
              <div className={classes.wrapper}>
                {children}
              </div>
            </section>
            <RightSideBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout;