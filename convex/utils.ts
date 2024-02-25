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
import { generateUsername } from 'friendly-username-generator'
import { internalAction } from '~/convex/_generated/server'

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

export const resolverUsername = (firstName: string, lastName: string) => {
  if (firstName === 'null' && lastName === 'null') {
    return generateUsername()
  }
  return `${firstName === 'null' ? '' : firstName} ${
    lastName === 'null' ? '' : lastName
  }`
}

const githubUrlRegex =
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)(?:\/([^\/]+))?\/?$/

export const getOwnerAndRepoFromUrl = (url: string) => {
  const match = url.match(githubUrlRegex)
  if (match) {
    const owner = match[1]
    const repo = match[2] || null
    return { owner, repo }
  }
  return null
}

export const getGithubData = async (githubUrl: string) => {
  const result = getOwnerAndRepoFromUrl(githubUrl)
  if (!result) {
    return null
  }
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'hackstack'
  }

  // if only owner than fetcg info about organization
  if (result.owner && !result.repo) {
    const data = await fetch(`https://api.github.com/orgs/${result.owner}`, {
      headers
    })
    return data.json()
  }
  const data = await fetch(
    `https://api.github.com/repos/${result.owner}/${result.repo}`,
    {
      headers
    }
  )
  return data.json()
}

export const pointsPerSuggestionType = {
  category: 2,
  template: 5,
  block: 5,
  tech: 10
}
