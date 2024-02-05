import { NodeProps } from 'reactflow'
import { cn, getTechLogo } from '@/app/lib/utils'

import Image from 'next/image'
import BlockNodeDataDisplay from '@/app/hs/stacks/create/components/steps/blocks/BlockNodeDataDisplay'
export default function BlockNode(props: NodeProps) {
  const { data, selected } = props
  return (
    <>
      {/*<NodeToolbar isVisible={undefined} position={Position.Top}>*/}
      {/*  <ButtonGroup variant="flat" size="sm" radius="lg">*/}
      {/*    <Button>*/}
      {/*      <LucideTrash size={16} />*/}
      {/*    </Button>*/}
      {/*    <Button>*/}
      {/*      <LucideCopy size={16} />*/}
      {/*    </Button>*/}
      {/*    <Button>*/}
      {/*      <LucidePackagePlus size={16} />*/}
      {/*    </Button>*/}
      {/*  </ButtonGroup>*/}
      {/*</NodeToolbar>*/}
      <BlockNodeDataDisplay selected={selected} {...data} />
    </>
  )
}
