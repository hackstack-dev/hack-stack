import { getTechLogo, TECH_TAGS } from '@/app/lib/utils'
import TechTag from '@/app/hs/finder/TechTag'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider, Image, Link, ScrollShadow } from '@nextui-org/react'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import type { Doc, Id } from '~/convex/_generated/dataModel'
import { getShortUrl } from '@/app/hs/finder/TechFinder.utils'
import { Chip } from '@nextui-org/chip'
import { Suggestion } from '@/app/hs/stacks/components/suggestions/Suggestion'

interface TechListProps {
  queryData?: {
    category: Doc<'categories'>
    blocks: Doc<'blocks'>[]
  }[]
  blockFilter: Id<'blocks'>[]
  theme?: string
}

export default function TechList({
  blockFilter,
  theme,
  queryData
}: TechListProps) {
  const [tagFilter, setTagFilter] = React.useState<string[]>([])

  const techData = useQuery(
    api.tech.findTechByMultipleBlocks,
    blockFilter.length ? { blockIds: blockFilter } : 'skip'
  )

  const handleTagFilterClick = (tag: string) => {
    if (tagFilter.includes(tag)) {
      setTagFilter((p) => p.filter((t) => t !== tag))
    } else {
      setTagFilter((p) => [...p, tag])
    }
  }

  const applyTechFilters = React.useCallback(
    (data: typeof techData) => {
      let filteredData = data

      if (tagFilter.length) {
        filteredData = filteredData?.filter((item) =>
          item.tags?.some((tag) => tagFilter.includes(tag))
        )
      }

      return filteredData
    },
    [tagFilter]
  )

  const findTechBlockName = (blockId: Id<'blocks'>) => {
    return queryData
      ?.map((item) => {
        if (item.blocks.some((block) => block._id === blockId)) {
          return item.blocks.find((block) => block._id === blockId)?.name
        }
      })
      .filter(Boolean)
  }

  return (
    <div className="p-4">
      <header className="flex items-center justify-between p-4 bg-white dark:bg-black border dark:border-default-100 rounded-lg">
        <div className="flex items-center gap-4">
          <span>Filter by:</span>
          {TECH_TAGS.map((tag) => (
            <TechTag
              key={tag}
              tag={tag}
              active={tagFilter.includes(tag)}
              onClick={() => handleTagFilterClick(tag)}
            />
          ))}
        </div>
        <Suggestion item="tech" />
      </header>
      <ScrollShadow className="h-[calc(100dvh-180px)]" hideScrollBar>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 pb-1">
          {applyTechFilters(techData)?.map((tech) => (
            <Card
              key={tech._id}
              className="max-w-[400px] bg-transparent border dark:border-default-100 dark:bg-neutral-900/60"
            >
              <CardHeader className="flex gap-3">
                <Image
                  alt={tech.name}
                  height={25}
                  radius="sm"
                  src={getTechLogo(tech.icon, theme)}
                  width={25}
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold">{tech.name}</h2>
                  <Link
                    className="text-xs"
                    size="sm"
                    color="secondary"
                    isExternal
                    showAnchorIcon
                    href={tech.websiteUrl}
                  >
                    {getShortUrl(tech.websiteUrl || '')}
                  </Link>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-xs text-default-500">{tech.description}</p>
              </CardBody>
              <Divider />
              <CardFooter className="flex items-center flex-wrap gap-2">
                {findTechBlockName(tech.blockId)?.map((blockName) => (
                  <Chip
                    variant="flat"
                    size="sm"
                    key={blockName}
                    color="secondary"
                  >
                    {blockName}
                  </Chip>
                ))}

                {tech.tags?.map((tag) => (
                  <TechTag tag={tag} active={tagFilter.includes(tag)} />
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollShadow>
    </div>
  )
}
