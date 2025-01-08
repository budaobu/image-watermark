import React from 'react'
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-10 p-0 border-none"
    />
  )
}

