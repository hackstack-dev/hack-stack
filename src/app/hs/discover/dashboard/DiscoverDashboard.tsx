'use client'
import MostUsedTech from '@/app/hs/discover/dashboard/MostUsedTech'
import MostUsedBlocks from '@/app/hs/discover/dashboard/MostUsedBlocks'
import MostUsedProjectTypes from '@/app/hs/discover/dashboard/MostUsedProjectTypes'
import RecentStacks from '@/app/hs/discover/dashboard/RecentStacks'
import React from 'react'
import DashboardSection from '@/app/hs/discover/dashboard/components/DashboardSection'
import RisingStacks from '@/app/hs/discover/dashboard/RisingStacks'
import MostUsedByBlocks from '@/app/hs/discover/dashboard/MostUsedByBlocks'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'

export default function DiscoverDashboard() {
  const blocks = useQuery(api.blocks.getAllBlocks, {})
  const blockOptions =
    blocks?.map((block) => ({
      label: block.name,
      value: block._id
    })) || []
  return (
    <>
      <DashboardSection title="Trends">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <MostUsedBlocks />
          <MostUsedTech />
          <MostUsedProjectTypes />
        </div>
      </DashboardSection>
      <DashboardSection title="Trends of your choice">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <MostUsedByBlocks filters={new Set([])} options={blockOptions} />
          <MostUsedByBlocks filters={new Set([])} options={blockOptions} />
          <MostUsedByBlocks filters={new Set([])} options={blockOptions} />
        </div>
      </DashboardSection>

      <DashboardSection title="Recently Added">
        <RecentStacks />
      </DashboardSection>
      <DashboardSection title="Rising Stacks">
        <RisingStacks />
      </DashboardSection>
    </>
  )
}
