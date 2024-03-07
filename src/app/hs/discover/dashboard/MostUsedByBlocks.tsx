import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedStats from '@/app/hs/discover/dashboard/components/MostUsedStats'
import React from 'react'
import { Select, Selection, SelectItem } from '@nextui-org/react'

function getRandomFilter(options: { label: string; value: string }[]) {
  const filter =
    options[Math.floor(Math.random() * options.length)]?.value ?? ''
  return new Set([filter])
}

interface MostUsedByBlocksProps {
  options: { label: string; value: string }[]
}
export default function MostUsedByBlocks({ options }: MostUsedByBlocksProps) {
  const [blockIds, setBlockIds] = React.useState<Selection>(new Set())
  const mostUsedLanguage = useQuery(api.stats.getMostUsedTechByBlockName, {
    blockIds: Array.from(blockIds) as string[]
  })

  React.useEffect(() => {
    if (options.length) {
      setBlockIds(getRandomFilter(options))
    }
  }, [options])
  const handleSelectionChange = (keys: Selection) => {
    setBlockIds(new Set(Array.from(keys)))
  }

  const getTitle = () => {
    const blockId = Array.from(blockIds)[0] as string
    if (blockId) {
      const block = options.find((option) => option.value === blockId)
      return `Most used in ${block?.label}`
    }
    return 'Most used tech in block'
  }
  return (
    <div>
      <Select
        size="md"
        variant="flat"
        color="primary"
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
