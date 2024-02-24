import { Id } from '~/convex/_generated/dataModel'

export type FeedbackUser = {
  name?: string
  profileImage?: string
}

export type FeedbackReply = {
  reply: string
  user: FeedbackUser
  _creationTime: number
  _id: Id<'feedbackReplies'>
}
export type Feedback = {
  feedback: string
  feedbackReplies: FeedbackReply[]
  fromUserId: Id<'users'>
  stackId: Id<'stacks'>
  user: FeedbackUser
  _creationTime: number
  _id: Id<'feedbacks'>
}
