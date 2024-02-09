'use client'

import { Spinner } from '@nextui-org/react'
import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import StackItems from '@/app/hs/stacks/list/StackItems'

export default function StackList() {
  const { isAuthenticated } = useConvexAuth()
  const stacks = useQuery(api.stack.getUserStacks, !isAuthenticated ? 'skip' : {})

  return (
    <>
      {!stacks && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {stacks && <StackItems items={stacks} />}
    </>
  )
}
