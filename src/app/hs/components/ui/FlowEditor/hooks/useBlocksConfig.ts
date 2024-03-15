import {
  compactMode,
  connectionsLineType,
  connectionsOrientation,
  enableConnectionAnimation,
  enableConnections,
  snapToGridEnabled
} from '@/app/hs/stacks/components/blocks/Blocks.state'
import type { BlocksConfig } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { ConnectionLineType } from 'reactflow'
import React from 'react'

export default function useBlocksConfig() {
  const getBlocksConfig = () => {
    return {
      compactMode: compactMode.value,
      snapToGrid: snapToGridEnabled.value,
      enableConnections: enableConnections.value,
      connectionsOrientation: connectionsOrientation.value,
      connectionsLineType: connectionsLineType.value,
      animated: enableConnectionAnimation.value
    }
  }

  const setBlocksConfig = React.useCallback((config: BlocksConfig) => {
    compactMode.value = config.compactMode
    snapToGridEnabled.value = config.snapToGrid
    enableConnections.value = config.enableConnections
    connectionsOrientation.value = config.connectionsOrientation ?? 'vertical'
    connectionsLineType.value =
      config.connectionsLineType ?? ConnectionLineType.Bezier
    enableConnectionAnimation.value = config.animated ?? false
  }, [])

  return {
    getBlocksConfig,
    setBlocksConfig
  }
}
