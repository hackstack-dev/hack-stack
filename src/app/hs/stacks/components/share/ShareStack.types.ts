import React from 'react'
import type { BackgroundProps, BackgroundVariant, Node } from 'reactflow'

export type StackDetailsNodeData = {
  name: string
  description: string
}

export interface CanvasControlsProps {
  canvasSettings: BackgroundProps
  setCanvasSettings: React.Dispatch<React.SetStateAction<BackgroundProps>>
}

export interface ShareSettings {
  background: string
  color: string
  fontSize: number
  borderColor: string
  borderWidth: number
  borderRadius: number
  boxShadow: string
}

export interface ShareStackDetailsSettings extends ShareSettings {
  showDetails: boolean
  descriptionColor: string
  descriptionFontSize: number
}

export interface ShareStackBlockSettings extends ShareSettings {
  techColor: string
  techFontSize: number
  blockSize: string
}
