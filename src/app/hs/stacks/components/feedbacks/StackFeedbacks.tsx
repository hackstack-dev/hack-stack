import { Id } from '~/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Chip } from '@nextui-org/chip'
import { Divider, ScrollShadow } from '@nextui-org/react'
import { LucideMessageCircleOff } from 'lucide-react'
import FeedbackInput from '@/app/hs/stacks/components/feedbacks/FeedbackInput'
import FeedbackList from '@/app/hs/stacks/components/feedbacks/FeedbackList'

interface StackFeedbacksProps {
  isOpenForFeedbacks?: boolean
  userId?: Id<'users'>
  stackId?: Id<'stacks'>
}
export default function StackFeedbacks({
  isOpenForFeedbacks,
  userId,
  stackId
}: StackFeedbacksProps) {
  const user = useQuery(api.users.getProfile, userId ? { userId } : 'skip')
  const feedbackSettings = useQuery(
    api.feedbacks.getFeedbackSettingsByStackId,
    isOpenForFeedbacks && stackId ? { stackId } : 'skip'
  )

  return (
    <>
      {!isOpenForFeedbacks && (
        <div className="mx-auto max-w-md p-6 flex flex-col items-center gap-8 text-center bg-secondary/10 rounded-large">
          <div>
            <LucideMessageCircleOff
              size={44}
              stroke="#989899"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-sm text-default-500 dark:text-default-400">
            <span className="text-secondary mr-1">{user?.name}</span>
            is not looking for feedback at the moment
          </p>
        </div>
      )}

      {feedbackSettings && (
        <>
          <div className="px-4 pb-4">
            {feedbackSettings.focusAreas && (
              <p>
                <span className="text-secondary mr-1">{user?.name}</span> has
                requested feedback on the following areas:
                {feedbackSettings.focusAreas.map((focusArea) => (
                  <Chip
                    size="sm"
                    variant="flat"
                    color="primary"
                    key={focusArea}
                    className="mr-2 my-2"
                  >
                    {focusArea}
                  </Chip>
                ))}
              </p>
            )}
            {feedbackSettings.additionalInfo && (
              <p className="text-sm text-foreground-500 bg-secondary/10 p-4 rounded-large">
                {feedbackSettings.additionalInfo}
              </p>
            )}
          </div>
          <Divider />
        </>
      )}
      {isOpenForFeedbacks && (
        <ScrollShadow className="h-[calc(100vh-420px)]">
          <FeedbackInput stackId={stackId} />
          <FeedbackList stackId={stackId} />
        </ScrollShadow>
      )}
    </>
  )
}
