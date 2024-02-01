import { Button } from '@nextui-org/button'
import { LucidePlus } from 'lucide-react'

export function NewBlockDialog() {
  return (
    <Button
      color="secondary"
      variant="ghost"
      startContent={<LucidePlus size={16} />}
      className="absolute top-6 left-6 z-10"
      size="sm"
    >
      Block
    </Button>
  )
}
