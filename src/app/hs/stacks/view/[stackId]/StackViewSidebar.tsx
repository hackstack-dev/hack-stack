import { Tab, Tabs } from '@nextui-org/react'
import {
  LucideLineChart,
  LucideMessageCircle,
} from 'lucide-react'
import React from 'react'
import StackViewTechDetails from '@/app/hs/stacks/view/[stackId]/StackViewTechDetails'
import { cn } from '@/app/lib/utils'
import StackFeedbacks from '@/app/hs/stacks/components/feedbacks/StackFeedbacks'
import { Id } from '~/convex/_generated/dataModel'

interface StackViewSidebarProps {
  userId?: Id<'users'>
  stackId?: Id<'stacks'>
  isOpenForFeedbacks?: boolean
}
export default function StackViewSidebar({
  userId,
  stackId,
  isOpenForFeedbacks
}: StackViewSidebarProps) {
  const [viewMode, setViewMode] = React.useState<string | number>('data')

  return (
    <aside className="overflow-auto py-4 h-full w-full bg-default-50 dark:bg-black border-l-1 border-r-1 dark:border-default-50">
      <Tabs
        onSelectionChange={setViewMode}
        aria-label="Options"
        variant="underlined"
        className="w-full"
        classNames={{
          tabList:
            'gap-6 w-full relative rounded-none p-0 border-b border-divider',
          cursor: 'w-full',
          tab: 'max-w-fit px-4 h-12'
        }}
      >
        <Tab
          key="data"
          title={
            <div className="flex items-center space-x-2">
              <LucideLineChart size={16} strokeWidth={1} />
              <span>Data</span>
            </div>
          }
        />

        <Tab
          key="feedback"
          title={
            <div className="flex items-center space-x-2">
              <LucideMessageCircle size={16} strokeWidth={1} />
              <span>Feedback</span>
            </div>
          }
        />
      </Tabs>
      <div className="mt-6">
        <div className={cn(viewMode !== 'data' && 'hidden')}>
          <StackViewTechDetails />
        </div>
        <div className={cn(viewMode !== 'feedback' && 'hidden')}>
          <StackFeedbacks
            isOpenForFeedbacks={isOpenForFeedbacks}
            userId={userId}
            stackId={stackId}
          />
        </div>
      </div>
    </aside>
  )
}
