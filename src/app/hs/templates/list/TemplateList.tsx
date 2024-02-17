'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import TemplateItems from '@/app/hs/templates/list/TemplateItems'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'

export default function TemplateList() {
  const { isAuthenticated } = useConvexAuth()
  const templates = useQuery(
    api.templates.getMyUserTemplates,
    !isAuthenticated ? 'skip' : {}
  )

  return (
    <>
      {!templates && <PageDataLoading />}
      {templates && (
        <TemplateItems
          items={templates}
          isPressable
          withAvatar
          withPublicPrivateIndication
        />
      )}
    </>
  )
}
