import { NodeProps } from 'reactflow'
import { cn, getTechLogo } from '@/app/lib/utils'

import Image from 'next/image'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { useTheme } from 'next-themes'

interface BlockNodeDataDisplayProps extends BlockNodeData {
  selected: boolean
}
export default function BlockNodeDataDisplay({
  selected,
  blockName,
  tech
}: BlockNodeDataDisplayProps) {
  const { theme } = useTheme()
  const techLogo = tech?.icon ?? 'icon.svg'
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
          'border-2 border-secondary',
          'rounded-md hs-block-shadow',
          'transition-[border,box-shadow] duration-300 linear',
          selected && [
            'shadow-[1px_1px_0_1px_#fff,3px_3px_0_1px_#d946ef,5px_5px_0_1px_#fff]',
            'dark:shadow-[1px_1px_0_1px_#222,3px_3px_0_1px_#d946ef,5px_5px_0_1px_#222]'
          ]
        ])}
      >
        <div className="flex items-stretch">
          <div className="flex flex-col justify-center px-2 dark:bg-transparent rounded-tl-sm rounded-bl-sm">
            <Image
              src={getTechLogo(techLogo, theme)}
              alt={techLogo}
              width={32}
              height={32}
              className="h-8"
            />
          </div>
          <div className="border-l-2 border-secondary py-2 px-4">
            <h3 className="text-default-500 text-sm">{blockName}</h3>

            <span>{tech?.name ?? 'Not selected'}</span>
          </div>
        </div>
      </div>
    </>
  )
}
