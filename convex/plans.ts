import { mutation, query } from 'convex/_generated/server'
import { v } from 'convex/values'
import { getUserId } from 'convex/utils'

export const getPlans = query({
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)
    if (!userId) {
      throw new Error('you must be logged in to get plans')
    }
    return await ctx.db.query('plans').collect()
  }
})
export const createPlan = mutation({
  args: {
    name: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new Error('you must be logged in to create a plan')
    }
    return await ctx.db.insert('plans', {
      name: args.name,
      userId
    })
  }
})

export const deletePlan = mutation({
  args: {
    id: v.id('plans')
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new Error('you must be logged in to delete a plan')
    }
    return await ctx.db.delete(args.id)
  }
})
