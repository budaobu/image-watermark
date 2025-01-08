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
        保护您的隐私！🔒
        在本地设备上为图片添加水印，免网络连接，安全便捷。完美适用于身份证、驾照、护照等敏感证件。#隐私保护 #图片加水印 #本地处理
      </p>
      <ImageWatermark />
    </main>
  )
}

