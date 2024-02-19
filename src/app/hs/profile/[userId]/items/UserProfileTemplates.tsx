import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import React from 'react'
import TemplateItems from '@/app/hs/templates/list/TemplateItems'

interface UserProfileTemplatesProps {
  userId: Id<'users'>
}
export default function UserProfileTemplates({
  userId
}: UserProfileTemplatesProps) {
  const userTemplates = useQuery(
    api.templates.getOtherUserTemplates,
    userId ? { userId } : 'skip'
  )
  return (
    <>
      {!userTemplates && <PageDataLoading />}
      {userTemplates && (
        <TemplateItems items={userTemplates} isPressable={false} />
      )}
    </>
  )
}
