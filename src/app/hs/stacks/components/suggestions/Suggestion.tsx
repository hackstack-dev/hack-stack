import { Button } from '@nextui-org/button'
import { LucideHand } from 'lucide-react'
import {
  Modal,
  ModalContent,
  Tab,
  Tabs,
  useDisclosure
} from '@nextui-org/react'
import { ModalBody, ModalHeader } from '@nextui-org/modal'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import React from 'react'
import { Card, CardBody } from '@nextui-org/card'

export function Suggestion() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selected, setSelected] = React.useState<string | number>('category')

  return (
    <>
      <Button
        color="success"
        variant="light"
        radius="full"
        startContent={<LucideHand size={16} strokeWidth={2} />}
        onPress={onOpen}
      >
        Make a Suggestion
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
              <ModalHeader>
                <RoughNotationGroup show={true}>
                  Missing a
                  <RoughNotation type="underline" color="#d946ef">
                    <span className="mx-1">category</span>
                  </RoughNotation>
                  or a
                  <RoughNotation type="underline" color="#d946ef">
                    <span className="mx-1">block</span>
                  </RoughNotation>
                  ? can't find your favorite
                  <RoughNotation type="underline" color="#d946ef">
                    <span className="mx-1">tech</span>
                  </RoughNotation>
                  ? Suggest it!
                </RoughNotationGroup>
              </ModalHeader>
              <ModalBody>
                <p className="text-default-500">
                  Help us improve the app by suggesting new blocks, categories
                  or technologies.
                </p>
                <h2>I Want to suggest a:</h2>
                <Tabs
                  color="primary"
                  aria-label="Tabs colors"
                  radius="full"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                >
                  <Tab key="category" title="Category">
                    <Card>
                      <CardBody>Category</CardBody>
                    </Card>
                  </Tab>
                  <Tab key="block" title="Block">
                    <Card>
                      <CardBody>Block</CardBody>
                    </Card>
                  </Tab>
                  <Tab key="tech" title="Tech">
                    <Card>
                      <CardBody>Tech</CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
