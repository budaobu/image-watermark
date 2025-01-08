'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ColorPicker } from '@/components/ui/color-picker'
import { Upload } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const initialState = {
  watermarkText: '仅供验证使用',
  tileWatermark: false,
  opacity: 50,
  size: 50,
  color: '#000000',
  spacing: 50,
  angle: 0,
  positionX: 50,
  positionY: 50,
}

export default function ImageWatermark() {
  const [image, setImage] = useState<string | null>(null)
  const [watermarkText, setWatermarkText] = useState(initialState.watermarkText)
  const [tileWatermark, setTileWatermark] = useState(initialState.tileWatermark)
  const [opacity, setOpacity] = useState(initialState.opacity)
  const [size, setSize] = useState(initialState.size)
  const [color, setColor] = useState(initialState.color)
  const [spacing, setSpacing] = useState(initialState.spacing)
  const [angle, setAngle] = useState(initialState.angle)
  const [positionX, setPositionX] = useState(initialState.positionX)
  const [positionY, setPositionY] = useState(initialState.positionY)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setTimeout(applyWatermark, 0)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file)
    }
  }

  const applyWatermark = useCallback(() => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      ctx.fillStyle = color
      ctx.font = `${size}px Arial`
      ctx.globalAlpha = opacity / 100

      if (tileWatermark) {
        for (let x = 0; x < canvas.width; x += spacing * 10) {
          for (let y = 0; y < canvas.height; y += spacing * 10) {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate((angle * Math.PI) / 180)
            ctx.fillText(watermarkText, 0, 0)
            ctx.restore()
          }
        }
      } else {
        const x = (positionX / 100) * canvas.width
        const y = (positionY / 100) * canvas.height
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((angle * Math.PI) / 180)
        ctx.fillText(watermarkText, 0, 0)
        ctx.restore()
      }
    }
    img.src = image
  }, [image, watermarkText, tileWatermark, opacity, size, color, spacing, angle, positionX, positionY])

  useEffect(() => {
    if (image) {
      applyWatermark()
    }
  }, [image, watermarkText, tileWatermark, opacity, size, color, spacing, angle, positionX, positionY, applyWatermark])

  const downloadImage = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'watermarked-image.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const resetSettings = () => {
    setWatermarkText(initialState.watermarkText)
    setTileWatermark(initialState.tileWatermark)
    setOpacity(initialState.opacity)
    setSize(initialState.size)
    setColor(initialState.color)
    setSpacing(initialState.spacing)
    setAngle(initialState.angle)
    setPositionX(initialState.positionX)
    setPositionY(initialState.positionY)
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="tile-watermark"
              checked={tileWatermark}
              onCheckedChange={setTileWatermark}
            />
            <Label htmlFor="tile-watermark">平铺水印</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="watermark-text">水印文字</Label>
            <Input
              id="watermark-text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="watermark-color">水印颜色</Label>
            <div className="flex space-x-2">
              <ColorPicker color={color} onChange={setColor} />
              <Input
                id="watermark-color"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-2">
                <Label htmlFor="opacity">水印透明度</Label>
                <Slider
                  id="opacity"
                  min={0}
                  max={100}
                  step={1}
                  value={[opacity]}
                  onValueChange={([value]) => setOpacity(value)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>当前值: {opacity}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-2">
                <Label htmlFor="size">水印大小</Label>
                <Slider
                  id="size"
                  min={0}
                  max={100}
                  step={1}
                  value={[size]}
                  onValueChange={([value]) => setSize(value)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>当前值: {size}</p>
            </TooltipContent>
          </Tooltip>

          {tileWatermark && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="space-y-2">
                  <Label htmlFor="spacing">水印间距</Label>
                  <Slider
                    id="spacing"
                    min={0}
                    max={100}
                    step={1}
                    value={[spacing]}
                    onValueChange={([value]) => setSpacing(value)}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>当前值: {spacing}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-2">
                <Label htmlFor="angle">水印倾斜角度</Label>
                <Slider
                  id="angle"
                  min={-90}
                  max={90}
                  step={1}
                  value={[angle]}
                  onValueChange={([value]) => setAngle(value)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>当前值: {angle}</p>
            </TooltipContent>
          </Tooltip>

          {!tileWatermark && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-2">
                    <Label htmlFor="positionX">水印位置（左右）</Label>
                    <Slider
                      id="positionX"
                      min={0}
                      max={100}
                      step={1}
                      value={[positionX]}
                      onValueChange={([value]) => setPositionX(value)}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>当前值: {positionX}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-2">
                    <Label htmlFor="positionY">水印位置（上下）</Label>
                    <Slider
                      id="positionY"
                      min={0}
                      max={100}
                      step={1}
                      value={[positionY]}
                      onValueChange={([value]) => setPositionY(value)}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>当前值: {positionY}</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          <div className="flex space-x-2">
            <Button onClick={resetSettings} variant="outline">重置</Button>
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {image ? (
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-500">点击或拖拽上传图片</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageUpload(file)
              }}
            />
          </div>

          <Button onClick={downloadImage} className="w-full" disabled={!image}>
            下载图片
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}

