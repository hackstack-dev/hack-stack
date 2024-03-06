import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { useAction, useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'

interface FeedbackInputProps {
  stackId?: Id<'stacks'>
  avatarSize?: 'sm' | 'md' | 'lg'
  placeholder?: string
  onSendReply?: (reply: string) => void
}
export default function FeedbackInput({
  stackId,
  onSendReply,
  placeholder = 'Write a feedback...',
  avatarSize = 'sm'
}: FeedbackInputProps) {
  const { getToken } = useAuth()
  const myUser = useQuery(api.users.getMyUser, {})
  const sendFeedback = useAction(api.feedbacks.createFeedback)
  const [feedback, setFeedback] = React.useState('')

  const handleSendFeedback = async () => {
    try {
      if (onSendReply) {
        onSendReply(feedback)
      } else {
        const token = await getToken()
        if (!stackId || !token) return
        await sendFeedback({ stackId, feedback, token })
        setFeedback('')
        toast.success('Feedback sent')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-[64px_1fr]">
      {myUser?._id && <UserAvatar userId={myUser._id} size={avatarSize} />}
      <div className="flex flex-col gap-2">
        <Textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          variant="bordered"
          placeholder={placeholder}
          maxLength={500}
          endContent={
            <div className="h-full flex flex-col justify-end p-1">
              <Button
                onClick={handleSendFeedback}
                size="sm"
                variant="flat"
                color="primary"
                radius="lg"
              >
                Send
              </Button>
            </div>
          }
        />
      </div>
    </div>
  )
}
