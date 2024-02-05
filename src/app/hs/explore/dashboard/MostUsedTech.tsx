import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedCount from '@/app/hs/explore/dashboard/components/MostUsedCount'

export default function MostUsedTech() {
  const mostUsedTech = useQuery(api.stack.getMostUsedTech, {})
  return <MostUsedCount title="Most used tech" data={mostUsedTech} />
}
