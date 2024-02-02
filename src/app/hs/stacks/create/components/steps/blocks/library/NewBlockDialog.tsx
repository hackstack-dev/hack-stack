import { Button } from '@nextui-org/button'
import { LucidePlus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import BlockLibrary from '@/app/hs/stacks/create/components/steps/blocks/library/BlockLibrary'
import { AddBlockProps } from '@/app/hs/stacks/create/components/steps/blocks/Blocks.types'

export function NewBlockDialog({ onAddBlock }: AddBlockProps) {
  const { theme } = useTheme()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color={theme === 'dark' ? 'secondary' : 'primary'}
        variant="solid"
        startContent={<LucidePlus size={16} />}
        className="absolute top-6 left-6 z-10"
        size="sm"
        onPress={onOpen}
      >
        Block
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Block Library
              </ModalHeader>
              <ModalBody>
                <BlockLibrary onAddBlock={onAddBlock} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
