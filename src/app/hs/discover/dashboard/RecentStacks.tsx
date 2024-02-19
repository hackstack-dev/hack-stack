import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import StackItems from '@/app/hs/stacks/list/StackItems'
import React from 'react'
import PageDataLoading from "@/app/hs/components/ui/PageDataLoading";

export default function RecentStacks() {
  const { isAuthenticated } = useConvexAuth()
  const recentlyAddedStacks = useQuery(
    api.stack.recentlyAddedStacks,
    !isAuthenticated ? 'skip' : {}
  )
  return (
    <>
      {!recentlyAddedStacks && (
          <PageDataLoading />
      )}
      {recentlyAddedStacks && (
        <StackItems items={recentlyAddedStacks} isPublicItems />
      )}
    </>
  )
}
