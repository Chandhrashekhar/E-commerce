import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { ShoppingCart, MessageSquare } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Product Ordering System
              </Link>
              <nav className="flex gap-4">
                <Link href="/" className="flex items-center gap-1 hover:text-primary">
                  <ShoppingCart className="h-4 w-4" />
                  Products
                </Link>
                <Link href="/chat" className="flex items-center gap-1 hover:text-primary">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </Link>
              </nav>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
