import {
  action,
  ActionCtx,
  mutation,
  MutationCtx,
  query,
  QueryCtx
} from './_generated/server'
import {
  customAction,
  customCtx,
  customMutation,
  customQuery
} from 'convex-helpers/server/customFunctions'
import { ConvexError, v } from 'convex/values'
import { internal } from '~/convex/_generated/api'
import { UnwrapConvex } from '~/convex/types'
import { getUserById } from '~/convex/users'
import { Id } from '~/convex/_generated/dataModel'

export const authAction = customAction(
  action,
  customCtx(async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject

    if (!userId) {
      throw new ConvexError('must be logged in')
    }

    const user = (await ctx.runQuery(internal.users.getUserById, {
      userId
    })) as UnwrapConvex<typeof getUserById>

    if (!user) {
      throw new ConvexError('user not found')
    }

    const _id: Id<'users'> = user._id

    return {
      user: {
        _id,
        userId
      }
    }
  })
)
export const authQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    try {
      return { user: await getUserOrThrow(ctx) }
    } catch (err) {
      return { user: null }
    }
  })
)

export const authMutation = customMutation(
  mutation,
  customCtx(async (ctx) => ({ user: await getUserOrThrow(ctx) }))
)

async function getUserOrThrow(ctx: QueryCtx | MutationCtx) {
  const userId = await getUserId(ctx)

  if (!userId) {
    throw new ConvexError('must be logged in')
  }

  const user = await ctx.db
    .query('users')
    .withIndex('by_userId', (q) => q.eq('userId', userId))
    .first()

  if (!user) {
    throw new ConvexError('user not found')
  }

  return user
}

export const adminAuthAction = customAction(
  action,
  customCtx(async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.subject

    if (!userId) {
      throw new ConvexError('must be logged in')
    }

    const user = (await ctx.runQuery(internal.users.getUserById, {
      userId
    })) as UnwrapConvex<typeof getUserById>

    if (!user) {
      throw new ConvexError('user not found')
    }

    if (!user.isAdmin) {
      throw new ConvexError('must be admin to run this action')
    }

    const _id: Id<'users'> = user._id

    return {
      user: {
        _id,
        userId
      }
    }
  })
)

export const adminAuthQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await getUserOrThrow(ctx)

    if (!user.isAdmin) {
      throw new ConvexError('must be admin to run this query')
    }

    return { user }
  })
)

export const adminAuthMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await getUserOrThrow(ctx)

    if (!user.isAdmin) {
      throw new ConvexError('must be admin to run this mutation')
    }

    return { user }
  })
)

export const getUserId = async (ctx: QueryCtx | MutationCtx | ActionCtx) => {
  return (await ctx.auth.getUserIdentity())?.subject
}

export const getOwnerAndRepoFromUrl = (url: string) => {
  const regex = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/
  const match = url.match(regex)

  if (match && match.length === 4) {
    const owner = match[1]
    const repo = match[2]
    return { owner, repo }
  }

  return null
}

export const pointsPerSuggestionType = {
  category: 2,
  template: 5,
  block: 5,
  tech: 10
}
