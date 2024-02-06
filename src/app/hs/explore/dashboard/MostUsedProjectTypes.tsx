import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import MostUsedStats from '@/app/hs/explore/dashboard/components/MostUsedStats'

export default function MostUsedProjectTypes() {
  const mostUsedProjectTypes = useQuery(api.stack.getMostUsedProjectTypes, {})
  return <MostUsedStats title="Most used types" data={mostUsedProjectTypes} />
}
