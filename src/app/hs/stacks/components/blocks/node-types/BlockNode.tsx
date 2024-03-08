import { NodeProps } from 'reactflow'
import { useTheme } from 'next-themes'

import BlockNodeDataDisplay from '@/app/hs/stacks/components/blocks/node-types/BlockNodeDataDisplay'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { useSnapshot } from 'valtio'
import {
  connectionsOrientation,
  enableConnections
} from '@/app/hs/stacks/components/blocks/Blocks.state'
import CustomHandle from '@/app/hs/stacks/components/blocks/handles/CustomHandle'

export default function BlockNode(props: NodeProps<BlockNodeData>) {
  const { theme } = useTheme()

  const { data, selected } = props
  const withConnections = useSnapshot(enableConnections)
  const connOrientation = useSnapshot(connectionsOrientation)
  return (
    <>
      <CustomHandle
        visible={withConnections.value}
        orientation={connOrientation.value}
        type="target"
        nodeType={'blockNode'}
        theme={theme}
      />
      <BlockNodeDataDisplay selected={selected} {...data} />
      <CustomHandle
        visible={withConnections.value}
        orientation={connOrientation.value}
        type="source"
        nodeType={'blockNode'}
        theme={theme}
      />
    </>
  )
}
