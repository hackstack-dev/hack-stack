import React from 'react'
import { Modal, ModalContent } from '@nextui-org/react'

interface DrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const Drawer = ({
  isOpen,
  onOpenChange,
  children
}: React.PropsWithChildren<DrawerProps>) => {
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="transparent"
      size="full"
      classNames={{
        wrapper: 'flex justify-end'
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut'
            }
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn'
            }
          }
        }
      }}
      className="rounded-md max-w-sm w-full h-screen max-h-screen"
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}

export default Drawer
