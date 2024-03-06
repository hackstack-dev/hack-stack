import { internalMutation, internalQuery } from '~/convex/_generated/server'
import { authAction, authMutation, authQuery, getUserId } from '~/convex/utils'
import { Stack } from '~/convex/types'
import { Doc, Id } from '~/convex/_generated/dataModel'
import { ConvexError, v } from 'convex/values'
import { getManyFrom } from 'convex-helpers/server/relationships'
import { internal } from '~/convex/_generated/api'

export const internalGetStack = internalQuery({
  args: {
    stackId: v.id('stacks')
  },
  handler: async ({ db }, { stackId }) => {
    return await db.get(stackId)
  }
})

export const getMyUserStacks = authQuery({
  handler: async ({ db, user }) => {
    if (!user) return []
    return await getManyFrom(db, 'stacks', 'by_userId', user._id)
  }
})

export const getOtherUserStacks = authQuery({
  args: {
    userId: v.id('users')
  },
  handler: async ({ db }, { userId }) => {
    return await getManyFrom(db, 'stacks', 'by_userId', userId)
  }
})

export const getPublicStack = authQuery({
  handler: async ({ db }, { stackId }: { stackId: Id<'stacks'> }) => {
    const stack = await db.get(stackId)
    if (!stack?.isPublic) {
      throw new ConvexError('Stack is not public')
    }
    return stack
  }
})
// get stack by id
export const getUserStack = authQuery({
  handler: async ({ db, user }, { stackId }: { stackId: Id<'stacks'> }) => {
    if (!user) return {} as Doc<'stacks'>
    // get stack by id and userId
    return await db
      .query('stacks')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .filter((q) => q.eq(q.field('_id'), stackId))
      .first()
  }
})

export const saveStack = authMutation(
  async ({ db, user }, { stack }: { stack: Stack }) => {
    const newStack = { ...stack, userId: user._id }
    return db.insert('stacks', newStack)
  }
)

export const deleteStack = authMutation(
  async ({ db }, { stackId }: { stackId: Id<'stacks'> }) => {
    const stackLikesIds = await getManyFrom(
      db,
      'stackLikes',
      'by_stackId',
      stackId
    )
    await Promise.all(stackLikesIds.map(({ _id }) => db.delete(_id)))
    return await db.delete(stackId)
  }
)

export const updateStack = authMutation(
  async (
    { db, user },
    { stackId, stack }: { stackId: Id<'stacks'>; stack: Stack }
  ) => {
    const updatedStack = { ...stack, userId: user._id }
    return await db.patch(stackId, updatedStack)
  }
)

export const recentlyAddedStacks = authQuery(async (ctx) => {
  if (!ctx.user) {
    return []
  }
  return ctx.db
    .query('stacks')
    .filter((q) => q.eq(q.field('isPublic'), true))
    .order('desc')
    .take(6)
})

export const risingStacks = authQuery(async (ctx) => {
  if (!ctx.user) {
    return []
  }

  const sevenDaysAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000

  // Get all stackIds that have been liked in the last 7 days
  const stacks = await ctx.db
    .query('stackLikes')
    .withIndex('by_creation_time', (q) => q.gt('_creationTime', sevenDaysAgo))
    .collect()

  // Count the number of likes for each stack
  const stacksLikes = stacks.reduce(
    (acc, { stackId }) => {
      acc[stackId] = (acc[stackId] || 0) + 1
      return acc
    },
    {} as Record<Id<'stacks'>, number>
  )
  // Sort the stacks by the number of likes
  const sortedStacks = Object.entries(stacksLikes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  // Fetch stack details for the top liked stacks
  return await Promise.all(
    sortedStacks.map(([stackId]) => ctx.db.get(stackId as Id<'stacks'>))
  )
})

export const internalUpdateCoverImage = internalMutation({
  args: {
    stackId: v.id('stacks'),
    coverImage: v.string()
  },
  handler: async ({ db }, { stackId, coverImage }) => {
    return await db.patch(stackId, { coverImage })
  }
})

export const updateStackCoverImage = authAction({
  args: {
    stackId: v.id('stacks'),
    coverImage: v.string()
  },
  handler: async ({ runAction, runMutation }, { stackId, coverImage }) => {
    const coverImageUrl = await runAction(internal.imageKit.uploadCoverImage, {
      coverImage,
      name: stackId
    })
    await runMutation(internal.stack.internalUpdateCoverImage, {
      stackId,
      coverImage: coverImageUrl
    })
  }
})
