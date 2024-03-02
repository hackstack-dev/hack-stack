import { Button } from '@nextui-org/button'
import { LucidePlus } from 'lucide-react'
import React from 'react'

interface AddGroupButtonProps {
  handleAddGroup: () => void
  ref?: React.Ref<HTMLButtonElement>
}

export default React.forwardRef(function AddGroupButton({
  handleAddGroup,
  ref
}: AddGroupButtonProps) {
  return (
    <Button
      ref={ref}
      color="default"
      variant="faded"
      startContent={<LucidePlus size={16} strokeWidth={1.5} />}
      className="absolute top-4 left-28 z-10"
      radius="md"
      size="sm"
      onPress={handleAddGroup}
    >
      Group
    </Button>
  )
})
