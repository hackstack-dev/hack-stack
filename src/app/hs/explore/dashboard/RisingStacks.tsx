import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import StackItems from '@/app/hs/stacks/list/StackItems'
import { Spinner } from '@nextui-org/react'
import React from 'react'

export default function RisingStacks() {
  const { isAuthenticated } = useConvexAuth()
  const risingStacks = useQuery(
    api.stack.risingStacks,
    !isAuthenticated ? 'skip' : {}
  )
  return (
    <>
      {!risingStacks && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {risingStacks && <StackItems items={risingStacks} isPublicItems />}
    </>
  )
}
