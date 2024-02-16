'use client'

import { Spinner } from '@nextui-org/react'
import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import TemplateItems from '@/app/hs/templates/list/TemplateItems'

export default function TemplateList() {
  const { isAuthenticated } = useConvexAuth()
  const stacks = useQuery(
    api.templates.getUserTemplates,
    !isAuthenticated ? 'skip' : {}
  )

  return (
    <>
      {!stacks && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {stacks && <TemplateItems items={stacks} />}
    </>
  )
}
