'use client'
import MostUsedTech from '@/app/hs/explore/dashboard/MostUsedTech'
import MostUsedBlocks from '@/app/hs/explore/dashboard/MostUsedBlocks'

export default function ExploreDashboard() {
  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <MostUsedTech />
      <MostUsedBlocks />
    </div>
  )
}
