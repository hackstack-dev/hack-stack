import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import React from 'react'
import StackItems from '@/app/hs/stacks/list/StackItems'

interface UserProfileStacksProps {
  userId: Id<'users'>
}
export default function UserProfileStacks({ userId }: UserProfileStacksProps) {
  const userStacks = useQuery(
    api.stack.getOtherUserStacks,
    userId ? { userId } : 'skip'
  )
  return (
    <>
      {!userStacks && <PageDataLoading />}
      {userStacks && (
        <StackItems
          items={userStacks}
          size="sm"
          withAvatar={false}
          isPublicItems
        />
      )}
    </>
  )
}
