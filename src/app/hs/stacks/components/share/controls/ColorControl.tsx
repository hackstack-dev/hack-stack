import { cn } from '@/app/lib/utils'
import React from 'react'

interface CanvasControlsProps {
  value?: string
  onChange: (value: string) => void
}
export default function ColorControl({
  value = '',
  onChange
}: CanvasControlsProps) {
  return (
    <input
      className={cn(
        'w-[32px] h-[36px] cursor-pointer',
        'bg-transparent appearance-none border-none',
        '[&::-webkit-color-swatch]:border-2',
        '[&::-webkit-color-swatch]:border-primary',
        '[&::-webkit-color-swatch]:rounded-full'
      )}
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
