import { cn, getTechLogo } from '@/app/lib/utils'

import Image from 'next/image'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { useTheme } from 'next-themes'
import { compactMode } from '@/app/hs/stacks/components/blocks/BlocksToolbar'
import { useSnapshot } from 'valtio'

interface BlockNodeDataDisplayProps extends BlockNodeData {
  selected: boolean
}
export default function BlockNodeDataDisplay({
  selected,
  blockName,
  tech
}: BlockNodeDataDisplayProps) {
  const isCompactMode = useSnapshot(compactMode)
  const { theme } = useTheme()
  const techLogo = tech?.icon ?? 'icon.svg'
  return (
    <>
      <div
        className={cn([
          'bg-white dark:bg-[#0a0a0a] border-1',
          'border-secondary',
          'rounded-md hs-block-shadow',
          'transition-[border,box-shadow] duration-300 linear',
          selected && [
            'shadow-[1px_1px_0_1px_#fff,2px_2px_0_1px_#d946ef,3px_3px_0_1px_#fff]',
            'dark:shadow-[1px_1px_0_1px_#222,2px_2px_0_1px_#d946ef,3px_3px_0_1px_#222]'
          ],
          !isCompactMode.value && 'min-w-[200px]'
        ])}
      >
        <div className="flex items-stretch">
          <div
            className={cn(
              'flex flex-col justify-center dark:bg-transparent rounded-tl-sm rounded-bl-sm',
              isCompactMode.value ? 'p-2' : 'px-2'
            )}
          >
            <Image
              src={getTechLogo(techLogo, theme)}
              alt={techLogo}
              width={32}
              height={32}
              className="h-8"
            />
          </div>
          {!isCompactMode.value && (
            <div className="border-l-1 border-secondary py-2 px-4">
              <h3 className="text-default-500 text-sm">{blockName}</h3>

              <span>{tech?.name ?? '____________'}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
