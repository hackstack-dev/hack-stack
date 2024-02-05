import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedCount from '@/app/hs/explore/dashboard/components/MostUsedCount'

export default function MostUsedBlocks() {
  const mostUsedBlocks = useQuery(api.stack.getMostUsedBlocks, {})
  return (
    <MostUsedCount title="Most used blocks" data={mostUsedBlocks} />
  )
}
