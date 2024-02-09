import {
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection
} from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import React from 'react'
import { ChevronDownIcon } from 'lucide-react'

const getDescriptionsMap = (isPublic: boolean) => {
  // change the description based on the public state
  const publishOrUnpublish = isPublic ? 'Unpublish' : 'Publish'
  const visibility = isPublic ? 'visible' : 'non visible'
  return {
    save: 'Save your changes',
    publish: `${publishOrUnpublish} your stack to make it ${visibility} to others. You can always edit it later.`,
    delete: 'Delete the stack. This action cannot be undone.'
  }
}

const getLabelsMap = (isPublic: boolean): Record<string, string> => {
  const publishOrUnpublish = isPublic ? 'Unpublish' : 'Publish'
  return {
    save: 'Save changes',
    publish: `${publishOrUnpublish}`,
    delete: 'Delete'
  }
}

interface EditStackActionsProps {
  onSaveChanges: () => Promise<void>
  onPublicChange: () => Promise<void>
  onStackDelete: () => Promise<void>
  isPublic: boolean
}
export default function EditStackActions({
  onSaveChanges,
  onPublicChange,
  onStackDelete,
  isPublic
}: EditStackActionsProps) {
  const [selectedOption, setSelectedOption] = React.useState<Selection>(
    new Set(['save'])
  )
  const labelsMap = getLabelsMap(isPublic)
  const descriptionsMap = getDescriptionsMap(isPublic)
  const selectedOptionValue = Array.from(selectedOption)[0]

  const handleAction = async () => {
    switch (selectedOptionValue) {
      case 'save':
        await onSaveChanges()
        break
      case 'publish':
        await onPublicChange()
        break
      case 'delete':
        await onStackDelete()
        break
    }
  }
  return (
    <ButtonGroup variant="ghost" className="mb-4">
      <Button onClick={handleAction} variant="solid" color="primary">
        {labelsMap[selectedOptionValue]}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="faded" color="primary" isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
          className="max-w-[300px]"
        >
          <DropdownItem key="save" description={descriptionsMap.save}>
            {labelsMap.save}
          </DropdownItem>
          <DropdownItem key="publish" description={descriptionsMap.publish}>
            {labelsMap.publish}
          </DropdownItem>
          <DropdownItem key="delete" description={descriptionsMap.delete}>
            {labelsMap.delete}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  )
}
