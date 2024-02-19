'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import StackItems from '@/app/hs/stacks/list/StackItems'
import PageDataLoading from "@/app/hs/components/ui/PageDataLoading";

export default function StackList() {
  const { isAuthenticated } = useConvexAuth()
  const stacks = useQuery(api.stack.getMyUserStacks, !isAuthenticated ? 'skip' : {})

  return (
    <>
      {!stacks && (
          <PageDataLoading />
      )}
      {stacks && <StackItems items={stacks} />}
    </>
  )
}
