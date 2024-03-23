import { ScrollShadow } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import React from 'react'
import type { Doc, Id } from '~/convex/_generated/dataModel'
import FinderSkeleton from '@/app/hs/finder/FinderSkeleton'

interface SidebarFiltersProps {
  queryData?: {
    category: Doc<'categories'>
    blocks: Doc<'blocks'>[]
  }[]

  theme?: string
  blockFilter: Id<'blocks'>[]
  onBlockFilterClick: (block: Id<'blocks'>) => void
  removeSelectedBlocks: (blockIds: Id<'blocks'>[]) => void
}
export default function SidebarFilters({
  queryData,
  theme,
  onBlockFilterClick,
  blockFilter,
  removeSelectedBlocks
}: SidebarFiltersProps) {
  const [categoryFilter, setCategoryFilter] = React.useState<
    Id<'categories'>[]
  >([])

  const [filteredItems, setFilteredItems] =
    React.useState<typeof queryData>(queryData)

  const applyFilters = React.useCallback(() => {
    let filteredData = queryData

    if (categoryFilter.length) {
      filteredData = filteredData?.filter((item) =>
        categoryFilter.includes(item.category._id)
      )
    }

    setFilteredItems(filteredData)
  }, [categoryFilter, queryData])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    applyFilters()
  }, [categoryFilter, applyFilters])

  const handleCategoryFilterClick = (category: Id<'categories'>) => {
    if (categoryFilter.includes(category)) {
      setCategoryFilter((p) => p.filter((c) => c !== category))
      // find and remove all blocks from the selected category
      const blockIds = queryData
        ?.flatMap((item) => item.blocks)
        .filter((block) => block.category === category)
        .map((block) => block._id)
      removeSelectedBlocks(blockIds ?? [])
    } else {
      setCategoryFilter((p) => [...p, category])
    }
  }

  return (
    <aside className="border-r-1 dark:border-default-50 p-4">
      <ScrollShadow className="h-[calc(100dvh-95px)]" hideScrollBar>
        <h2 className="text-xl mb-4">Categories</h2>
        {!queryData && <FinderSkeleton length={6} cols="3" />}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {queryData?.map(({ category }) => (
            <div key={category._id}>
              <Button
                key={category._id}
                size="sm"
                radius="lg"
                variant={theme === 'dark' ? 'flat' : 'solid'}
                color={
                  categoryFilter.includes(category._id) ? 'primary' : 'default'
                }
                onClick={() => handleCategoryFilterClick(category._id)}
                className="w-full"
              >
                {category.name}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl mb-4">Blocks</h2>
          {!queryData && <FinderSkeleton length={30} cols="2" />}
          {filteredItems?.map(({ category, blocks }) => (
            <div key={category._id} className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blocks.map((block) => (
                  <Button
                    key={block._id}
                    size="sm"
                    radius="lg"
                    variant={theme === 'dark' ? 'flat' : 'solid'}
                    color={
                      blockFilter.includes(block._id) ? 'secondary' : 'default'
                    }
                    onClick={() => onBlockFilterClick(block._id)}
                    className="w-full"
                  >
                    {block.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollShadow>
    </aside>
  )
}
