import { proxy } from 'valtio'
import {
  ShareSettings,
  ShareStackBlockSettings,
  ShareStackDetailsSettings
} from '@/app/hs/stacks/components/share/ShareStack.types'

export const shareStackBlockSettings = proxy<ShareStackBlockSettings>({
  background: 'transparent',
  color: '#ffffff',
  fontSize: 12,
  techColor: '#555555',
  techFontSize: 16,
  borderColor: '#8b5cf6',
  borderWidth: 1,
  borderRadius: 5,
  boxShadow: 'unset',
  blockSize: 'normal'
})

export const shareStackDetailsSettings = proxy<ShareStackDetailsSettings>({
  showDetails: true,
  background: '#ffffff',
  color: '#000000',
  fontSize: 16,
  descriptionColor: '#000000',
  descriptionFontSize: 12,
  borderColor: '#000000',
  borderWidth: 1,
  borderRadius: 4,
  boxShadow: 'unset'
})

export const shareStackGroupSettings = proxy<ShareSettings>({
  background: 'transparent',
  color: '#fff',
  fontSize: 16,
  borderColor: '#fff',
  borderWidth: 1,
  borderRadius: 4,
  boxShadow: 'unset'
})

export const shareStackEdgeSettings = proxy<{ color: string }>({
  color: '#fff'
})
