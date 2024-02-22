import { NodeProps } from 'reactflow'

import BlockNodeDataDisplay from '@/app/hs/stacks/components/blocks/node-types/BlockNodeDataDisplay'
import {BlockNodeData} from "@/app/hs/stacks/components/blocks/Blocks.types";
export default function BlockNode(props: NodeProps<BlockNodeData>) {
  const { data, selected } = props
  return (
    <>
      <BlockNodeDataDisplay selected={selected} {...data} />
    </>
  )
}
