import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src="/logo.png?height=32&width=32"
                      alt="图片加水印 Logo"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <Link href="/">Home</Link>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                <Button asChild variant="ghost">
                  <Link href="https://buymeacoffee.com/lizhaoshui" target="_blank" rel="noopener noreferrer">
                    Donate
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

