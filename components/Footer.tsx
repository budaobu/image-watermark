import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            图片加水印 - 安全的本地水印工具
          </p>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} Joey Hu. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <Button asChild variant="ghost">
            <Link href="https://buymeacoffee.com/lizhaoshui" target="_blank" rel="noopener noreferrer">
              Donate
            </Link>
          </Button>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Joey Hu with{' '}
            <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
              v0.dev
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

