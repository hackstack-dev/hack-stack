import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import StackItems from '@/app/hs/stacks/list/StackItems'
import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function RecentStacks() {
  const { isAuthenticated } = useConvexAuth()
  const recentlyAddedStacks = useQuery(
    api.stack.recentlyAddedStacks,
    !isAuthenticated ? 'skip' : {}
  )
  return (
    <>
      {!recentlyAddedStacks && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {recentlyAddedStacks && (
        <StackItems items={recentlyAddedStacks} isPublicItems />
      )}
    </>
  )
}
