import {
  action,
  ActionCtx,
  mutation,
  MutationCtx,
  query,
  QueryCtx
} from './_generated/server'
import {
  customCtx,
  customMutation,
  customQuery
} from 'convex-helpers/server/customFunctions'
import { ConvexError, v } from 'convex/values'

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
export const getRepositoryData = action({
  args: { githubUrl: v.string() },
  handler: async (_, { githubUrl }) => {
    try {
      const result = getOwnerAndRepoFromUrl(githubUrl)
      if (!result) {
        return null
      }
      const repoData = await fetch(
        `https://api.github.com/repos/${result.owner}/${result.repo}`
      )
      return await repoData.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }
})
