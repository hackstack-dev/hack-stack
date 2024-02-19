import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import TopBuildersCard from '@/app/hs/discover/dashboard/components/TopBuildersCard'
import { LucideLayoutTemplate } from 'lucide-react'
import React from 'react'

export function TopTemplateMakers() {
  const topTemplateMakers = useQuery(api.users.getTopTemplateMakers, {})
  return (
    <TopBuildersCard
      users={topTemplateMakers ?? []}
      title="Top Template Makers"
      icon={<LucideLayoutTemplate size={20} stroke="#22d3ee" />}
    />
  )
}
