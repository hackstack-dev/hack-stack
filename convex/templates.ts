import { mutation, query } from 'convex/_generated/server'
import { v } from 'convex/values'
import { getUserId } from 'convex/utils'

export const getTemplates = query({
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)
    if (!userId) {
      throw new Error('you must be logged in to get templates')
    }
    return await ctx.db.query('templates').collect()
  }
})
export const createTemplate = mutation({
  args: {
    name: v.string(),
    description: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new Error('you must be logged in to create a template')
    }
    return await ctx.db.insert('templates', {
      name: args.name,
      description: args.description,
      blocks: []
    })
  }
})

export const deleteTemplate = mutation({
  args: {
    id: v.id('templates')
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new Error('you must be logged in to delete a template')
    }
    return await ctx.db.delete(args.id)
  }
})
