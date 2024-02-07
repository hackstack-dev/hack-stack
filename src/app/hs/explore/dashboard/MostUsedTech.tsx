import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedStats from '@/app/hs/explore/dashboard/components/MostUsedStats'

export default function MostUsedTech() {
  const mostUsedTech = useQuery(api.stats.getMostUsedTech, {})
  return <MostUsedStats title="Most used tech" data={mostUsedTech} />
}
