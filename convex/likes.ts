import { authMutation, authQuery } from '~/convex/utils'
import { ConvexError, v } from 'convex/values'
import { getManyFrom } from 'convex-helpers/server/relationships'

export const likeStack = authMutation({
  args: { stackId: v.id('stacks') },
  handler: async ({ db, user }, { stackId }) => {
    const targetStack = await db
      .query('stackLikes')
      .withIndex('by_userId_stackId', (q) =>
        q.eq('userId', user._id).eq('stackId', stackId)
      )
      .first()

    if (targetStack) {
      throw new ConvexError('you already like this stack')
    }

    await db.insert('stackLikes', {
      stackId,
      userId: user._id
    })
  }
})
export const removeLike = authMutation({
  args: { stackId: v.id('stacks') },
  handler: async ({ db, user }, { stackId }) => {
    const targetStack = await db
      .query('stackLikes')
      .withIndex('by_userId_stackId', (q) =>
        q.eq('userId', user._id).eq('stackId', stackId)
      )
      .first()

    if (!targetStack) {
      throw new ConvexError('you already removed like from this stack')
    }

    await db.delete(targetStack._id)
  }
})

// get stack likes count
export const getStackLikesCount = authQuery({
  args: { stackId: v.id('stacks') },
  handler: async ({ db }, { stackId }) => {
    const items = await getManyFrom(db, 'stackLikes', 'by_stackId', stackId)
    return items.length
  }
})

// get user like status for a stack
export const getUserLikeStatus = authQuery({
  args: { stackId: v.id('stacks') },
  handler: async ({ db, user }, { stackId }) => {
    if (!user) return false
    const targetStack = await db
      .query('stackLikes')
      .withIndex('by_userId_stackId', (q) =>
        q.eq('userId', user._id).eq('stackId', stackId)
      )
      .first()

    return !!targetStack
  }
})
