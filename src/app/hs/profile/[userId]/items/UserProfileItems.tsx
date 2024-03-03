import { Id } from '~/convex/_generated/dataModel'
import React from 'react'
import { Tab, Tabs } from '@nextui-org/react'
import { LucideLayers3, LucideLayoutTemplate, LucideStar } from 'lucide-react'
import UserProfileStacks from '@/app/hs/profile/[userId]/items/UserProfileStacks'
import UserProfileTemplates from '@/app/hs/profile/[userId]/items/UserProfileTemplates'
import UserProfileContributions from '@/app/hs/profile/[userId]/items/UserProfileContributions'

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
              <LucideLayers3 size={16} strokeWidth={1.5} />
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
              <LucideLayoutTemplate size={16} strokeWidth={1.5} />
              <span>Templates</span>
            </div>
          }
        >
          <UserProfileTemplates userId={userId} />
        </Tab>
        <Tab
          key="contributions"
          title={
            <div className="flex items-center space-x-2">
              <LucideStar size={16} strokeWidth={1.5} />
              <span>Contributions</span>
            </div>
          }
        >
          <UserProfileContributions userId={userId} />
        </Tab>
      </Tabs>
    </div>
  )
}
