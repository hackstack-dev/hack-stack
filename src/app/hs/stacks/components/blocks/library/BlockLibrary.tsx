import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import React from 'react'
import { Chip } from '@nextui-org/chip'
import { Input } from '@nextui-org/input'
import { LucideSearch } from 'lucide-react'
import { ScrollShadow, Spinner } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import {
  AddBlockProps,
  BlockNodeData
} from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Doc } from '~/convex/_generated/dataModel'

interface BlockLibraryProps extends AddBlockProps {
  onClose: () => void
}
export default function BlockLibrary({
  onAddBlock,
  onClose
}: BlockLibraryProps) {
  const queryData = useQuery(api.blocks.blocksByCategories, {})
  const [search, setSearch] = React.useState('')
  const [categoryFilter, setCategoryFilter] = React.useState('')
  const [filteredItems, setFilteredItems] =
    React.useState<typeof queryData>(queryData)

  const applyFilters = React.useCallback(() => {
    let filteredData = queryData

    if (categoryFilter) {
      filteredData = filteredData?.filter(
        (item) => item.category.name === categoryFilter
      )
    }

    if (search) {
      filteredData = filteredData?.flatMap((d) => {
        const lowerCasedSearch = search.toLowerCase()
        const blocks = d.blocks.filter((block) => {
          return (
            block.name.toLowerCase().includes(lowerCasedSearch) ||
            block.tags.some((tag) =>
              tag.toLowerCase().includes(lowerCasedSearch)
            )
          )
        })
        if (blocks.length) {
          return { ...d, blocks }
        }
        return []
      })
    }
    setFilteredItems(filteredData)
  }, [categoryFilter, search, queryData])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    applyFilters()
  }, [categoryFilter, search, applyFilters])

  const handleFilterClick = (category: string) => {
    if (categoryFilter === category) {
      setCategoryFilter('')
    } else {
      setCategoryFilter(category)
    }
  }

  const handleAddBlock = (block: BlockNodeData) => {
    onAddBlock(block)
    onClose()
  }

  return (
    <div className="flex items-start gap-4">
      <div className="min-w-[200px]">
        <Input
          size="md"
          placeholder={'Search blocks'}
          onValueChange={setSearch}
          startContent={<LucideSearch strokeWidth={1} />}
        />
        <ScrollShadow className="h-[480px]" hideScrollBar>
          {queryData?.map(({ category }) => (
            <div key={category._id} className="my-6 space-y-4">
              <Button
                key={category._id}
                size="sm"
                variant="flat"
                color={categoryFilter === category.name ? 'primary' : 'default'}
                onClick={() => handleFilterClick(category.name)}
                className="w-full"
              >
                {category.name}
              </Button>
            </div>
          ))}
        </ScrollShadow>
      </div>
      <>
        {!queryData ? (
          <div className="mx-auto my-4">
            <Spinner color="primary" />
          </div>
        ) : (
          <ScrollShadow size={10} className="h-[500px] px-6">
            {filteredItems?.map(({ category, blocks }) => (
              <div key={category._id} className="mb-4">
                <h2 className="w-full pb-2 font-semibold">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blocks.map((block) => (
                    <div
                      className="cursor-pointer bg-default-100 dark:bg-black p-4 rounded-md transition-all hover:ring-1 ring-primary"
                      key={block._id}
                      onClick={() =>
                        handleAddBlock({
                          id: block._id,
                          blockName: block.name,
                          tech: {} as Doc<'tech'>
                        })
                      }
                    >
                      <h3 className="text-lg">{block.name}</h3>
                      <p className="text-xs font-light text-default-500 mt-2 mb-4">
                        {block.description}
                      </p>
                      <div className="text-small flex items-center gap-2 flex-wrap">
                        {block.tags.map((tag) => (
                          <Chip
                            key={tag}
                            size="sm"
                            color="primary"
                            variant="bordered"
                          >
                            {tag}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollShadow>
        )}
      </>
    </div>
  )
}
