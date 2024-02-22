import React from 'react'
import type { BackgroundProps, BackgroundVariant, Node } from 'reactflow'

export type StackDetailsNodeData = {
  show: boolean
  name: string
  description: string
  style: Omit<ShareStackDetailsSettings, 'showDetails'>
}

export interface CanvasControlsProps {
  canvasSettings: BackgroundProps
  setCanvasSettings: React.Dispatch<React.SetStateAction<BackgroundProps>>
}
export interface ControlsProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
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
}
