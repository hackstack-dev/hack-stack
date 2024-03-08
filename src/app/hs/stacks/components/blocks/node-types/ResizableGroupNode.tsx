import { NodeProps } from 'reactflow'
import { GroupNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import ResizableGroupNodeDisplay from '@/app/hs/stacks/components/blocks/node-types/ResizableGroupNodeDisplay'
import { useSnapshot } from 'valtio'
import {
  connectionsOrientation,
  enableConnections
} from '@/app/hs/stacks/components/blocks/Blocks.state'
import CustomHandle from '@/app/hs/stacks/components/blocks/handles/CustomHandle'
import { useTheme } from 'next-themes'

export default function ResizableGroupNode(props: NodeProps<GroupNodeData>) {
  const { theme } = useTheme()
  const withConnections = useSnapshot(enableConnections)
  const connOrientation = useSnapshot(connectionsOrientation)
  return (
    <>
      <CustomHandle
        visible={withConnections.value}
        orientation={connOrientation.value}
        type="target"
        theme={theme}
        nodeType={'resizableGroupNode'}
      />
      <ResizableGroupNodeDisplay {...props} />
      <CustomHandle
        visible={withConnections.value}
        orientation={connOrientation.value}
        type="source"
        theme={theme}
        nodeType={'resizableGroupNode'}
      />
    </>
  )
}
