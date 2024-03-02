import { Button } from '@nextui-org/button'
import { LucidePlus } from 'lucide-react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { ModalBody, ModalHeader } from '@nextui-org/modal'
import BlockLibrary from '@/app/hs/stacks/components/blocks/library/BlockLibrary'
import { AddBlockProps } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Suggestion } from '@/app/hs/stacks/components/suggestions/Suggestion'

export function NewBlockDialog({ onAddBlock }: AddBlockProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color="secondary"
        variant="solid"
        startContent={<LucidePlus size={16} strokeWidth={1.5} />}
        className="absolute top-4 left-4 z-10"
        radius="md"
        size="sm"
        onPress={onOpen}
      >
        Block
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="outside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between">
                Block Library
                <div className="mt-4 mr-4">
                  <Suggestion item="block" />
                </div>
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
