import type { NodeProps } from 'reactflow'
import { useSnapshot } from 'valtio'
import {
  connectionsOrientation,
  enableConnections
} from '@/app/hs/stacks/components/blocks/Blocks.state'
import { useTheme } from 'next-themes'
import type { GroupNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import CustomHandle from '@/app/hs/components/ui/FlowEditor/handles/CustomHandle'
import ResizableGroupNodeDisplay from '@/app/hs/components/ui/FlowEditor/node-types/ResizableGroupNodeDisplay'

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
