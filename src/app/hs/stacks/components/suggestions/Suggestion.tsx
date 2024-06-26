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
import { CategoryForm } from '@/app/hs/stacks/components/suggestions/CategoryForm'
import { BlockForm } from '@/app/hs/stacks/components/suggestions/BlockForm'
import { TechForm } from '@/app/hs/stacks/components/suggestions/TechForm'
import { colorMap } from '@/app/lib/utils'

const iconSize: Record<string, number> = {
  sm: 12,
  md: 16,
  lg: 20
}

interface SuggestionsProps {
  item: 'category' | 'block' | 'tech'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'light' | 'flat' | 'faded' | 'shadow' | 'ghost'
}
export function Suggestion({
  item,
  size = 'md',
  variant = 'light'
}: SuggestionsProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selected, setSelected] = React.useState<string>(item)

  const handleOpen = () => {
    onOpen()
  }
  return (
    <>
      <Button
        size={size}
        color="success"
        variant={variant}
        radius="full"
        startContent={<LucideHand size={iconSize[size]} strokeWidth={2} />}
        onPress={handleOpen}
      >
        <span className="hidden md:inline-block">Suggest new {item}</span>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="hidden md:block">
                  <RoughNotationGroup show={true}>
                    Missing a
                    <RoughNotation type="underline" color="#8b5cf6">
                      <span className="mx-1">category</span>
                    </RoughNotation>
                    or a
                    <RoughNotation type="underline" color="#facc15">
                      <span className="mx-1">block</span>
                    </RoughNotation>
                    ? can't find your favorite
                    <RoughNotation type="underline" color="#e11d48">
                      <span className="mx-1">tech</span>
                    </RoughNotation>
                    ? Suggest it!
                  </RoughNotationGroup>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-default-500">
                  Help us improve the app by suggesting new blocks, categories
                  or technologies and you might enter our contributors hall of
                  fame!
                </p>
                <h2>I Want to suggest a:</h2>
                <Tabs
                  color={colorMap[selected]}
                  aria-label="Tabs colors"
                  radius="full"
                  selectedKey={selected}
                  onSelectionChange={(v) => setSelected(v as string)}
                >
                  <Tab key="category" title="Category">
                    <CategoryForm />
                  </Tab>
                  <Tab key="block" title="Block">
                    <BlockForm />
                  </Tab>
                  <Tab key="tech" title="Tech">
                    <TechForm />
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
