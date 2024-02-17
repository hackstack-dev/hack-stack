import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedStats from '@/app/hs/discover/dashboard/components/MostUsedStats'
import React from 'react'
import { Select, Selection, SelectItem } from '@nextui-org/react'

interface MostUsedByBlocksProps {
  filters: Selection
  options: { label: string; value: string }[]
}
export default function MostUsedByBlocks({
  filters,
  options
}: MostUsedByBlocksProps) {
  const [blockIds, setBlockIds] = React.useState<Selection>(new Set(filters))
  const mostUsedLanguage = useQuery(api.stats.getMostUsedTechByBlockName, {
    blockIds: Array.from(blockIds) as string[]
  })

  const handleSelectionChange = (keys: Selection) => {
    setBlockIds(new Set(Array.from(keys)))
  }

  const getTitle = () => {
    const blockId = Array.from(blockIds)[0] as string
    if (blockId) {
      const block = options.find((option) => option.value === blockId)
      return `Most used ${block?.label}`
    }
    return 'Most used tech in block'
  }
  return (
    <div>
      <Select
        size="sm"
        variant="flat"
        placeholder="Select blocks"
        selectedKeys={blockIds}
        onSelectionChange={handleSelectionChange}
        classNames={{
          trigger: 'rounded-t-medium rounded-b-none'
        }}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      <MostUsedStats title={getTitle()} data={mostUsedLanguage} withFilter />
    </div>
  )
}
