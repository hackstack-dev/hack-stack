import { NodeProps, NodeToolbar, Position } from 'reactflow'
import { cn } from '@/app/lib/utils'
import {
  LucideCopy,
  LucideDatabase,
  LucidePackagePlus,
  LucideTrash
} from 'lucide-react'
import { ButtonGroup } from '@nextui-org/react'
import { Button } from '@nextui-org/button'

export default function BlockNode(props: NodeProps) {
  const { data, selected } = props
  return (
    <>
      <NodeToolbar isVisible={undefined} position={Position.Top}>
        <ButtonGroup variant="flat" size="sm" radius="lg">
          <Button>
            <LucideTrash size={16} />
          </Button>
          <Button>
            <LucideCopy size={16} />
          </Button>
          <Button>
            <LucidePackagePlus size={16} />
          </Button>
        </ButtonGroup>
      </NodeToolbar>
      <div
        className={cn([
          'bg-white dark:bg-[#111]',
          'border-2 border-primary',
          'rounded-md hs-block-shadow',
          'shadow-[1px_1px_0_1px_#fff,3px_3px_0_1px_#222,5px_5px_0_1px_#fff,7px_7px_0_1px_#222]',
          'dark:shadow-[1px_1px_0_1px_#222,3px_3px_0_1px_#ED8A19,5px_5px_0_1px_#222,7px_7px_0_1px_#EA6248]',
          'transition-[border,box-shadow] duration-300 linear',
          selected && 'shadow-none dark:border-white dark:shadow-none'
        ])}
      >
        <header className="flex items-center gap-2 px-4 py-2">
          <LucideDatabase size={16} />
          <h3>{data.label}</h3>
        </header>
        <section>Select</section>
      </div>
    </>
  )
}
