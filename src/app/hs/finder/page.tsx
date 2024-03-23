'use client'

import React from 'react'
import type { Id } from '~/convex/_generated/dataModel'
import { useTheme } from 'next-themes'
import TechList from '@/app/hs/finder/TechList'
import SidebarFilters from '@/app/hs/finder/SidebarFilters'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'

export default function TechFinderPage() {
  const { theme } = useTheme()
  const [blockFilter, setBlockFilter] = React.useState<Id<'blocks'>[]>([])

  const queryData = useQuery(api.blocks.blocksByCategories, {})
  const handleBlockFilterClick = (block: Id<'blocks'>) => {
    if (blockFilter.includes(block)) {
      setBlockFilter((p) => p.filter((b) => b !== block))
    } else {
      setBlockFilter((p) => [...p, block])
    }
  }

  const removeSelectedBlocks = React.useCallback((blockIds: Id<'blocks'>[]) => {
    setBlockFilter((p) => p.filter((b) => !blockIds.includes(b)))
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[400px_1fr]">
      <SidebarFilters
        queryData={queryData}
        theme={theme}
        blockFilter={blockFilter}
        onBlockFilterClick={handleBlockFilterClick}
        removeSelectedBlocks={removeSelectedBlocks}
      />
      <TechList blockFilter={blockFilter} theme={theme}         queryData={queryData} />
    </div>
  )
}
