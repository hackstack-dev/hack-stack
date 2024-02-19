import { Id } from '~/convex/_generated/dataModel'
import React from 'react'
import { Tab, Tabs } from '@nextui-org/react'
import { LucideLayers3, LucideLayoutTemplate } from 'lucide-react'
import UserProfileStacks from '@/app/hs/profile/[userId]/items/UserProfileStacks'
import UserProfileTemplates from '@/app/hs/profile/[userId]/items/UserProfileTemplates'

interface UserProfileItemsProps {
  userId: Id<'users'>
}
export default function UserProfileItems({ userId }: UserProfileItemsProps) {
  return (
    <div className="w-full p-4">
      <Tabs aria-label="Options" variant="bordered" size="sm" className="mb-4">
        <Tab
          key="stacks"
          title={
            <div className="flex items-center space-x-2">
              <LucideLayers3 size={16} strokeWidth={1} />
              <span>Stacks</span>
            </div>
          }
        >
          <UserProfileStacks userId={userId} />
        </Tab>
        <Tab
          key="templates"
          title={
            <div className="flex items-center space-x-2">
              <LucideLayoutTemplate strokeWidth={1} />
              <span>Templates</span>
            </div>
          }
        >
          <UserProfileTemplates userId={userId} />
        </Tab>
      </Tabs>
    </div>
  )
}
