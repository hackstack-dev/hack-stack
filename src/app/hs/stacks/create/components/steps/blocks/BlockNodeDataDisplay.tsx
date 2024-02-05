import { NodeProps } from 'reactflow'
import { cn, getTechLogo } from '@/app/lib/utils'

import Image from 'next/image'
import { BlockNodeData } from '@/app/hs/stacks/create/components/steps/blocks/Blocks.types'

interface BlockNodeDataDisplayProps extends BlockNodeData {
  selected: boolean
}
export default function BlockNodeDataDisplay({
  selected,
  blockName,
  tech
}: BlockNodeDataDisplayProps) {
  const techLogo = tech?.icon ?? 'logo.svg'
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
      <div
        className={cn([
          'min-w-[200px]',
          'bg-white dark:bg-[#111]',
          'border-2 border-primary',
          'rounded-md hs-block-shadow',
          'transition-[border,box-shadow] duration-300 linear',
          selected && [
            'shadow-[1px_1px_0_1px_#fff,3px_3px_0_1px_#222,5px_5px_0_1px_#fff]',
            'dark:shadow-[1px_1px_0_1px_#222,3px_3px_0_1px_#d946ef,5px_5px_0_1px_#222]'
          ]
        ])}
      >
        <div className="flex items-stretch">
          <div className="flex flex-col justify-center px-2 dark:bg-transparent rounded-tl-sm rounded-bl-sm">
            <Image
              src={getTechLogo(techLogo)}
              alt={techLogo}
              width={32}
              height={32}
              className="h-8"
            />
          </div>
          <div className="border-l-2 border-primary py-2 px-4">
            <h3 className="text-default-500 text-sm">{blockName}</h3>

            <span>{tech?.name ?? 'Not selected'}</span>
          </div>
        </div>
      </div>
    </>
  )
}
