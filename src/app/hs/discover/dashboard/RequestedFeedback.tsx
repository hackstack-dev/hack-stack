import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import StackItems from '@/app/hs/stacks/list/StackItems'
import React from 'react'

export default function RequestedFeedback() {
  const { isAuthenticated } = useConvexAuth()
  const requestedFeedback = useQuery(
    api.stack.requestedFeedback,
    !isAuthenticated ? 'skip' : {}
  )
  return (
    <>
      {!requestedFeedback && <PageDataLoading />}
      {requestedFeedback && (
        <StackItems items={requestedFeedback} isPublicItems openFeedbacks />
      )}
    </>
  )
}
