<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="flex flex-col items-center justify-center text-center mb-12 relative">
      <!-- Dark Mode & GitHub Actions -->
      <div class="absolute right-0 top-0 flex items-center gap-2">
         <a href="https://github.com/budaobu/image-watermark" target="_blank" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <Icon name="simple-icons:github" class="w-6 h-6" />
        </a>
         <Button 
          variant="ghost" 
          size="sm"
          :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
          @click="toggleDark()"
        />
      </div>

      <div class="flex items-center gap-3 mb-2">
        <div class="w-12 h-12 bg-gray-900 dark:bg-primary-500 text-white rounded-xl flex items-center justify-center shadow-md">
          <Icon name="i-heroicons-identification" class="w-7 h-7" />
        </div>
        <h1 class="font-bold text-3xl text-gray-900 dark:text-white tracking-tight">证件照加水印</h1>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
        安全、免费、浏览器本地处理 | 支持 JPG, PNG, WebP, AVIF
      </p>
    </div>

    <!-- Main Tool Area -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      
      <!-- Left: Settings Panel -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white dark:bg-gray-900 p-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm sticky top-24">
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="i-heroicons-adjustments-horizontal" class="w-5 h-5 text-primary-500" />
              水印设置
            </h2>
            <Button 
              size="xs" 
              variant="ghost" 
              icon="i-heroicons-arrow-path" 
              label="重置"
              @click="resetSettings"
            />
          </div>
          
          <!-- Watermark Text -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">水印文字</label>
            <Input 
              v-model="config.text" 
              placeholder="请输入水印文字" 
              icon="i-heroicons-pencil-square"
              class="w-full"
            />
          </div>

          <!-- Color -->
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">文字颜色</label>
            <div class="flex gap-2">
              <input 
                type="color" 
                v-model="config.color" 
                class="h-9 w-12 rounded border border-gray-200 dark:border-gray-700 p-0.5 bg-white cursor-pointer"
              >
              <Input v-model="config.color" class="flex-1" />
            </div>
          </div>

          <!-- Tiled Switch -->
          <div class="mb-5 flex items-center justify-between">
            <label class="text-sm font-medium text-gray-600 dark:text-gray-300">平铺水印</label>
            <Switch v-model="config.tiled" />
          </div>

          <!-- Sliders -->
          <div class="space-y-5">
            <!-- Opacity -->
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-600 dark:text-gray-300">透明度</label>
                <span class="text-sm font-bold text-primary-500">{{ config.opacity }}%</span>
              </div>
              <Slider 
                v-model="config.opacity" 
                :min="0" 
                :max="100"
              />
            </div>

            <!-- Size -->
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-600 dark:text-gray-300">字体大小</label>
                <span class="text-sm font-bold text-primary-500">{{ config.size }}</span>
              </div>
              <Slider 
                v-model="config.size" 
                :min="1" 
                :max="100"
              />
            </div>

            <!-- Gap (Tiled only) -->
            <div v-if="config.tiled">
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-600 dark:text-gray-300">水印间距</label>
                <span class="text-sm font-bold text-primary-500">{{ config.gap }}%</span>
              </div>
              <Slider 
                v-model="config.gap" 
                :min="0" 
                :max="100"
              />
            </div>

            <!-- Rotate -->
            <div>
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-600 dark:text-gray-300">旋转角度</label>
                <span class="text-sm font-bold text-primary-500">{{ config.rotate }}°</span>
              </div>
              <Slider 
                v-model="config.rotate" 
                :min="-180" 
                :max="180"
              />
            </div>

            <!-- Position X (Single only) -->
            <div v-if="!config.tiled">
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-600 dark:text-gray-300">水平位置 (X)</label>
                <span class="text-sm font-bold text-primary-500">{{ config.x }}%</span>
              </div>
              <Slider 
                v-model="config.x" 
                :min="0" 
                :max="100"
              />
            </div>

            <!-- Position Y (Single only) -->
            <div v-if="!config.tiled">
              <div class="flex justify-between mb-2">
                <label class="text-sm font-medium text-gray-600 dark:text-gray-300">垂直位置 (Y)</label>
                <span class="text-sm font-bold text-primary-500">{{ config.y }}%</span>
              </div>
              <Slider 
                v-model="config.y" 
                :min="0" 
                :max="100"
              />
            </div>
          </div>

        </div>
      </div>

      <!-- Right: Upload & Preview -->
      <div class="lg:col-span-2 flex flex-col h-full">
        <!-- State 1: No Image -->
        <div 
          v-if="!previewUrl"
          ref="dropZoneRef"
          @click="triggerFileSelect"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          :class="[
            'flex-1 border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer min-h-[400px] shadow-sm group',
            isDragging 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' 
              : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-primary-400'
          ]"
        >
          <div class="w-20 h-20 bg-primary-50 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-sm">
            <Icon name="i-heroicons-photo" class="w-10 h-10" />
          </div>
          <h2 class="text-xl font-bold text-gray-700 dark:text-white mb-2">点击或拖拽图片到这里</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs mx-auto leading-relaxed">
            支持 JPG, PNG, WebP, AVIF 格式<br>纯本地处理，保护证件隐私
          </p>
          <Button 
            size="lg" 
            color="primary" 
            class="px-8 font-bold shadow-md hover:-translate-y-0.5 transition-transform"
            label="选择图片"
          />
        </div>

        <!-- State 2: Preview -->
        <div v-else class="flex flex-col gap-4 animate-fade-in">
          <div class="relative bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800 shadow-sm group">
            <!-- Canvas Result -->
            <img 
              :src="previewUrl" 
              class="w-full h-auto max-h-[70vh] object-contain mx-auto" 
              alt="Watermarked Preview"
            >
            
            <!-- Re-upload Mask -->
            <div 
              @click="triggerFileSelect"
              class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm"
            >
               <Button 
                icon="i-heroicons-arrow-path"
                label="更换图片"
                variant="solid"
                class="bg-white !text-gray-900 hover:bg-gray-100 dark:bg-white dark:!text-gray-900 shadow-lg"
               />
            </div>
          </div>

          <div class="flex justify-end gap-3">
             <Button 
                @click="downloadImage"
                size="lg" 
                icon="i-heroicons-arrow-down-tray" 
                label="下载处理后的图片"
                class="w-full sm:w-auto shadow-md"
              />
          </div>
        </div>

        <!-- Hidden File Input -->
        <input 
          type="file" 
          ref="fileInputRef" 
          accept="image/*" 
          class="hidden" 
          @change="handleFileChange"
        >
        
        <!-- Hidden Canvas -->
        <canvas ref="canvasRef" class="hidden"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { useTitle, useDark, useToggle, watchThrottled } from '@vueuse/core'
import Button from '../components/ui/Button.vue'
import Input from '../components/ui/Input.vue'
import Slider from '../components/ui/Slider.vue'
import Switch from '../components/ui/Switch.vue'
import Icon from '../components/ui/Icon.vue'

// SEO/Title
useTitle('证件照加水印 - 安全免费的在线工具')

// Theme
const isDark = useDark()
const toggleDark = useToggle(isDark)

// --- State ---
const fileInputRef = ref<HTMLInputElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDragging = ref(false)

// Image Objects
const originalImage = ref<HTMLImageElement | null>(null)
const previewImage = ref<HTMLImageElement | null>(null) // Downscaled for performance
// Preview URL (Display)
const previewUrl = ref('')

// Config Interface
interface WatermarkConfig {
  text: string
  color: string
  opacity: number
  size: number
  rotate: number
  x: number
  y: number
  tiled: boolean
  gap: number
}

const defaultConfig: WatermarkConfig = {
  text: '仅供 xxx 验证使用',
  color: '#000000',
  opacity: 50,
  size: 50,
  rotate: 0,
  x: 50,
  y: 50,
  tiled: false,
  gap: 50
}

const config = reactive<WatermarkConfig>({ ...defaultConfig })

// --- Methods ---

const resetSettings = () => {
  Object.assign(config, { ...defaultConfig })
}

const triggerFileSelect = () => {
  fileInputRef.value?.click()
}

// 1. Create a downscaled preview image if original is too large
const createPreviewImage = (original: HTMLImageElement): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
        const MAX_WIDTH = 1500
        if (original.naturalWidth <= MAX_WIDTH) {
            resolve(original)
            return
        }

        const scale = MAX_WIDTH / original.naturalWidth
        const canvas = document.createElement('canvas')
        canvas.width = MAX_WIDTH
        canvas.height = original.naturalHeight * scale
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
             resolve(original)
             return
        }
        
        ctx.drawImage(original, 0, 0, canvas.width, canvas.height)
        
        const img = new Image()
        img.onload = () => resolve(img)
        img.src = canvas.toDataURL('image/jpeg', 0.8) // Use JPEG for smaller memory footprint in preview
    })
}

const handleFiles = (fileList: FileList | null) => {
  if (!fileList || fileList.length === 0) return
  
  const file = fileList[0]
  if (!file.type.startsWith('image/')) {
    alert('请上传有效的图片文件')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = async () => {
      originalImage.value = img
      // Create optimized preview version
      previewImage.value = await createPreviewImage(img)
      
      // Wait for DOM update
      nextTick(() => {
        drawWatermark() // Draws using previewImage by default
      })
    }
    img.src = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  handleFiles(target.files)
  target.value = ''
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  handleFiles(e.dataTransfer?.files || null)
}

// Core: Draw Watermark
// Modified to support rendering to a specific canvas with a specific image
// If no args provided, uses previewImage + on-screen canvas (Fast Mode)
const drawWatermark = (targetImage?: HTMLImageElement, targetCanvas?: HTMLCanvasElement) => {
  // Default to preview image for UI responsiveness
  const img = targetImage || previewImage.value
  const canvas = targetCanvas || canvasRef.value
  
  if (!img || !canvas) return

  // Use 'willReadFrequently' if we were reading back a lot, but here we mostly write.
  const ctx = canvas.getContext('2d', { alpha: false }) 
  if (!ctx) return
  
  if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
  }

  // Clear previous content
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)

  ctx.save()

  // Improved Font Sizing Logic
  const baseFontSize = Math.max(20, img.naturalWidth / 25) 
  const scaleFactor = 0.5 + (config.size / 100) * 2.5
  const fontSize = baseFontSize * scaleFactor

  ctx.font = `bold ${fontSize}px sans-serif`
  ctx.fillStyle = config.color
  ctx.globalAlpha = config.opacity / 100
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  if (config.tiled) {
    const angle = (config.rotate * Math.PI) / 180
    
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(angle)

    const textMetrics = ctx.measureText(config.text)
    const textWidth = textMetrics.width
    
    const gapX = textWidth + fontSize * (1 + (config.gap / 100) * 3)
    const gapY = fontSize + fontSize * (2 + (config.gap / 100) * 3)

    const diag = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))
    const limit = diag / 2 + Math.max(gapX, gapY)

    for (let x = -limit; x < limit; x += gapX) {
      for (let y = -limit; y < limit; y += gapY) {
        const offsetX = (Math.floor(y / gapY) % 2 !== 0) ? gapX / 2 : 0
        ctx.fillText(config.text, x + offsetX, y)
      }
    }
  } else {
    const posX = (img.naturalWidth * config.x) / 100
    const posY = (img.naturalHeight * config.y) / 100

    ctx.translate(posX, posY)
    ctx.rotate((config.rotate * Math.PI) / 180)

    ctx.fillText(config.text, 0, 0)
  }

  ctx.restore()

  // Only update preview URL if we are drawing to the visible canvas
  if (!targetCanvas) {
      previewUrl.value = canvas.toDataURL('image/png')
  }
}

const downloadImage = () => {
  if (!originalImage.value) return
  
  // Create a temporary canvas for high-res rendering
  const tempCanvas = document.createElement('canvas')
  
  // Render using the ORIGINAL full-res image
  drawWatermark(originalImage.value, tempCanvas)

  // Download logic
  const link = document.createElement('a')
  link.href = tempCanvas.toDataURL('image/png')
  link.download = `watermarked_${Date.now()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // Clean up
  tempCanvas.remove()
}

// Optimized Watcher via watchThrottled
watchThrottled(
  config,
  () => {
    // Only redraw if we have an image
    if (previewImage.value) {
      drawWatermark() // Uses preview image
    }
  },
  { throttle: 50, leading: true, trailing: true }
)
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
