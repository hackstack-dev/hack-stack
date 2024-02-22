import { Button } from '@nextui-org/button'
import { LucideShare2 } from 'lucide-react'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { ModalBody, ModalHeader } from '@nextui-org/modal'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'
import ShareStackStudio from '@/app/hs/stacks/components/share/ShareStackStudio'
import { Stack } from '~/convex/types'

interface ShareStackButtonProps {
  stack: Stack
}
export default function ShareStackButton({ stack }: ShareStackButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button

        variant="solid"
        radius="full"
        size="sm"
        onPress={onOpen}
        isIconOnly
      >
        <LucideShare2 size={16} strokeWidth={1.5} />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        scrollBehavior="outside"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between">
                  <h1 className="pt-6 pb-2">Share your stack and design it as you want</h1>
              </ModalHeader>
              <ModalBody>
                <FlowProvider>
                  <ShareStackStudio stack={stack} />
                </FlowProvider>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
