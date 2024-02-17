import { ConvexError, v } from 'convex/values'
import { internalMutation, internalQuery, query } from './_generated/server'
import { authQuery } from '~/convex/utils'

export const getUserById = internalQuery({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first()
  }
})

export const getProfile = query({
  args: { userId: v.id('users') },
  handler: async ({ db }, { userId }) => {
    const user = await db.get(userId)
    return {
      name: user?.name,
      profileImage: user?.profileImage
    }
  }
})

export const createUser = internalMutation({
  args: {
    email: v.string(),
    userId: v.string(),
    name: v.string(),
    profileImage: v.string()
  },
  handler: async ({ db }, args) => {
    const { email, userId, profileImage, name } = args
    const user = await db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first()

    if (user) return

    await db.insert('users', {
      email,
      userId,
      profileImage,
      name
    })
  }
})

export const updateUser = internalMutation({
  args: { userId: v.string(), name: v.string(), profileImage: v.string() },
  handler: async ({ db }, args) => {
    const { userId, profileImage, name } = args

    const user = await db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first()

    if (!user) {
      throw new ConvexError('user not found')
    }

    await db.patch(user._id, {
      name,
      profileImage
    })
  }
})

export const getMyUser = authQuery({
  async handler({ user }) {
    return user
  }
})
