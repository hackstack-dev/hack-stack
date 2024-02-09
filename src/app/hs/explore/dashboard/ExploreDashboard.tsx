'use client'
import MostUsedTech from '@/app/hs/explore/dashboard/MostUsedTech'
import MostUsedBlocks from '@/app/hs/explore/dashboard/MostUsedBlocks'
import MostUsedProjectTypes from '@/app/hs/explore/dashboard/MostUsedProjectTypes'
import RecentStacks from '@/app/hs/explore/dashboard/RecentStacks'
import React from 'react'
import DashboardSection from '@/app/hs/explore/dashboard/components/DashboardSection'
import RisingStacks from '@/app/hs/explore/dashboard/RisingStacks'

export default function ExploreDashboard() {
  return (
    <>
      <DashboardSection title="Trends">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <MostUsedBlocks />
          <MostUsedTech />
          <MostUsedProjectTypes />
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
