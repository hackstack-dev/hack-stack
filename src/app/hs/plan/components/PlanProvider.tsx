'use client'

import { Suggestion } from '@/app/hs/stacks/components/suggestions/Suggestion'
import { useRouter } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Spinner } from '@nextui-org/react'

export default function PlanProvider() {
  const router = useRouter()
  const myUser = useQuery(api.users.getMyUser)
  if (!myUser?.isAdmin) {
    router.push('/hs/404')
  }
  if (!myUser?.isAdmin) {
    return (
      <div className="h-screen w-full flex flex-col justify-center">
        <Spinner />
      </div>
    )
  }
  return <Suggestion item="category" />
}
