import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import TopBuildersCard from '@/app/hs/discover/dashboard/components/TopBuildersCard'
import { LucideBlocks } from 'lucide-react'
import React from 'react'

export function TopStackBuilders() {
  const topStackBuilders = useQuery(api.users.getTopStackBuilders, {})
  return (
    <TopBuildersCard
      users={topStackBuilders ?? []}
      title="Top Stack Builders"
      icon={<LucideBlocks size={20} stroke="hotpink" />}
    />
  )
}
