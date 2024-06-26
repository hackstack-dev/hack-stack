import { ConvexError, v } from 'convex/values'
import { internalMutation, internalQuery, query } from './_generated/server'
import {
  adminAuthQuery,
  authQuery,
  pointsPerSuggestionType
} from '~/convex/utils'
import type { SuggestionTypeCount } from '~/convex/types'
import type { Id } from '~/convex/_generated/dataModel'
import { paginationOptsValidator } from 'convex/server'

export const getUserByClerkId = internalQuery({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first()
  }
})

export const getUserById = internalQuery({
  args: { userId: v.id('users') },
  handler: async ({ db }, { userId }) => {
    return await db.get(userId)
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

    return await db.insert('users', {
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

export const getTopContributors = authQuery({
  async handler({ db }) {
    const approvedSuggestions = await db
      .query('suggestions')
      .filter((q) => q.eq(q.field('approved'), true))
      .collect()

    // group by userId
    const groupedSuggestions = approvedSuggestions.reduce(
      (acc, suggestion) => {
        const userId = suggestion.userId
        const type = suggestion.type
        if (!acc[userId]) {
          acc[userId] = {
            category: 0,
            block: 0,
            tech: 0,
            points: 0
          }
        }
        // increment the count for the type
        acc[userId][type]++
        // add points for the type
        acc[userId].points += pointsPerSuggestionType[type]

        return acc
      },
      {} as Record<string, SuggestionTypeCount>
    )

    // take top 5 contributors by points
    return Object.entries(groupedSuggestions)
      .sort(([, a], [, b]) => b.points - a.points)
      .slice(0, 5)
      .map(([userId, suggestionTypeCount]) => ({
        userId: userId as Id<'users'>,
        ...suggestionTypeCount
      }))
  }
})

function countTopUsers<T extends { userId: Id<'users'> }[]>(data: T) {
  const groupedData = data.reduce(
    (acc, curr) => {
      const userId = curr.userId
      if (!acc[userId]) {
        acc[userId] = 0
      }
      acc[userId]++
      return acc
    },
    {} as Record<string, number>
  )

  // take top 5 stack builders
  return Object.entries(groupedData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([userId, count]) => ({
      userId: userId as Id<'users'>,
      count
    }))
}
export const getTopStackBuilders = authQuery({
  async handler({ db }) {
    // get all stacks and group by userId
    const stacks = await db
      .query('stacks')
      .filter((q) => q.eq(q.field('isPublic'), true))
      .collect()
    return countTopUsers<typeof stacks>(stacks)
  }
})

export const getTopTemplateMakers = authQuery({
  async handler({ db }) {
    const templates = await db
      .query('templates')
      .filter((q) => q.eq(q.field('isPublic'), true))
      .collect()
    return countTopUsers<typeof templates>(templates)
  }
})

export const getUsers = adminAuthQuery({
  args: {
    paginationOpts: paginationOptsValidator
  },
  async handler({ db }, { paginationOpts }) {
    return db.query('users').order('desc').paginate(paginationOpts)
  }
})
