import type { Metadata } from 'next'

import { Open_Sans } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'

import { cn } from '@/lib/utils'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Suspense } from 'react'
import Loading from '@/components/ui/loading'


const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Macchu Chat App ',
  description: ' by Macchu Pro',
  icons:{
    icon:['title.png']
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignUpUrl={'/'}>
      <html lang='en' suppressHydrationWarning>
        <body className={cn(font.className, 'bg-zinc-200 dark:bg-[#313338]')}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem={true}
            storageKey='discord-theme'
            disableTransitionOnChange
          >
            <SocketProvider>
              <ModalProvider />
              <QueryProvider>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}