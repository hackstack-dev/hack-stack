'use client'
import MostUsedTech from '@/app/hs/discover/dashboard/MostUsedTech'
import MostUsedBlocks from '@/app/hs/discover/dashboard/MostUsedBlocks'
import MostUsedProjectTypes from '@/app/hs/discover/dashboard/MostUsedProjectTypes'
import RecentStacks from '@/app/hs/discover/dashboard/RecentStacks'
import React from 'react'
import DashboardSection from '@/app/hs/discover/dashboard/components/DashboardSection'
import RisingStacks from '@/app/hs/discover/dashboard/RisingStacks'

export default function DiscoverDashboard() {
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
