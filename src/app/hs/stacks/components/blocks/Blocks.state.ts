import { proxy } from 'valtio'
import { ConnectionLineType } from 'reactflow'
import { BlocksConfig } from '@/app/hs/stacks/components/blocks/Blocks.types'

export const compactMode = proxy({ value: false })
export const snapToGridEnabled = proxy({ value: false })
export const enableConnections = proxy({ value: false })

export const connectionsOrientation = proxy<{
  value: BlocksConfig['connectionsOrientation']
}>({ value: 'vertical' })

export const connectionsLineType = proxy<{
  value: BlocksConfig['connectionsLineType']
}>({ value: ConnectionLineType.Bezier })

export const enableConnectionAnimation = proxy({ value: false })
