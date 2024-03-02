import { proxy, useSnapshot } from 'valtio'
import { LucideExpand, LucideMagnet, LucideShrink } from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Tooltip } from '@nextui-org/react'
import { useTheme } from 'next-themes'

export const compactMode = proxy({ value: false })
export const snapToGridEnabled = proxy({ value: false })
export default function BlocksToolbar() {
  const { theme } = useTheme()
  const isCompactMode = useSnapshot(compactMode)
  const snapToGrid = useSnapshot(snapToGridEnabled)

  const activeColor = theme === 'dark' ? 'primary' : 'secondary'
  return (
    <div className="absolute left-4 bottom-4 z-10 bg-white dark:bg-black flex flex-col gap-2 p-1 border-1 border-default-100 rounded-large">
      <Tooltip size="sm" content={'Compact mode'}>
        <Button
          onClick={() => {
            compactMode.value = !isCompactMode.value
          }}
          size="sm"
          radius="md"
          color={isCompactMode.value ? activeColor : 'default'}
          variant={isCompactMode.value ? 'flat' : 'light'}
          isIconOnly
        >
          {isCompactMode.value ? (
            <LucideExpand size={18} />
          ) : (
            <LucideShrink size={18} />
          )}
        </Button>
      </Tooltip>
      <Tooltip size="sm" content={'Snap to grid'}>
        <Button
          onClick={() => {
            snapToGridEnabled.value = !snapToGrid.value
          }}
          size="sm"
          radius="md"
          color={snapToGrid.value ? activeColor : 'default'}
          variant={snapToGrid.value ? 'flat' : 'light'}
          isIconOnly
        >
          <LucideMagnet size={18} strokeWidth={1.5} />
        </Button>
      </Tooltip>
    </div>
  )
}
