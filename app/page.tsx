import { Metadata } from 'next'
import ImageWatermark from '@/components/ImageWatermark'

export const metadata: Metadata = {
  title: '图片加水印 | 安全的本地水印工具',
  description: '在本地设备上为您的图片添加水印，保护您的隐私和敏感信息。无需网络连接，安全可靠。',
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">图片加水印</h1>
      <p className="mb-6">
        我们提供一种安全的方法，让您可以在本地设备上为您的图片添加水印，无需任何网络连接。这是保护您敏感证件（如身份证、驾照、护照等）隐私的理想选择。
      </p>
      <ImageWatermark />
    </main>
  )
}

