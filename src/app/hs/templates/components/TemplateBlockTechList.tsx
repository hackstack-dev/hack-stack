import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { useOnSelectionChange } from 'reactflow'
import { Chip } from '@nextui-org/chip'
import { Avatar } from '@nextui-org/react'
import { getTechLogo } from '@/app/lib/utils'
import { useTheme } from 'next-themes'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'

export default function TemplateBlockTechList() {
  const { theme } = useTheme()
  const [blockData, setBlockData] = React.useState<BlockNodeData>()

  const techs = useQuery(
    api.tech.findTechByBlock,
    blockData?.id ? { blockId: blockData.id as Id<'blocks'> } : 'skip'
  )

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setBlockData(nodes[0]?.data)
    }
  })
  return (
    <div className="absolute z-20 left-6 bottom-6">
      <div className="flex items-center flex-wrap gap-4">
        {blockData?.blockName && (
          <span className="text-sm text-foreground-500">
            {blockData.blockName}:
          </span>
        )}
        {techs?.map((tech) => (
          <Chip
            key={tech._id}
            size="sm"
            variant="bordered"
            avatar={<Avatar size="sm" src={getTechLogo(tech.icon, theme)} />}
          >
            {tech.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
