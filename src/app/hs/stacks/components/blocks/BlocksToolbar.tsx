import { proxy, useSnapshot } from 'valtio'
import {
  LucideExpand,
  LucideShrink,
} from 'lucide-react'
import { Button } from '@nextui-org/button'

export const compactMode = proxy({ value: false })
export default function BlocksToolbar() {
  const isCompactMode = useSnapshot(compactMode)
  return (
    <div className="absolute left-32 top-6 z-10 bg-white dark:bg-black">
      <Button
        onClick={() => {
          compactMode.value = !isCompactMode.value
        }}
        size="sm"
        radius="md"
        color="primary"
        variant="bordered"
        isIconOnly
      >
        {isCompactMode.value ? (
          <LucideExpand size={18} />
        ) : (
          <LucideShrink size={18} />
        )}
      </Button>
    </div>
  )
}
