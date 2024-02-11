import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedStats from '@/app/hs/discover/dashboard/components/MostUsedStats'

export default function MostUsedBlocks() {
  const mostUsedBlocks = useQuery(api.stats.getMostUsedBlocks, {})
  return <MostUsedStats title="Most used blocks" data={mostUsedBlocks} />
}
