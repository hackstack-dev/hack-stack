import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import StackItems from '@/app/hs/stacks/list/StackItems'
import React from 'react'
import PageDataLoading from "@/app/hs/components/ui/PageDataLoading";

export default function RisingStacks() {
  const { isAuthenticated } = useConvexAuth()
  const risingStacks = useQuery(
    api.stack.risingStacks,
    !isAuthenticated ? 'skip' : {}
  )
  return (
    <>
      {!risingStacks && (
          <PageDataLoading />
      )}
      {risingStacks && <StackItems items={risingStacks} isPublicItems />}
    </>
  )
}
