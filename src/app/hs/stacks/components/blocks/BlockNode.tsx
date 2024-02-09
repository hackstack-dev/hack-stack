import { NodeProps } from 'reactflow'

import BlockNodeDataDisplay from '@/app/hs/stacks/components/blocks/BlockNodeDataDisplay'
export default function BlockNode(props: NodeProps) {
  const { data, selected } = props
  return (
    <>
      <BlockNodeDataDisplay selected={selected} {...data} />
    </>
  )
}
