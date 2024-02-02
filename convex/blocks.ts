import { query } from './_generated/server'
import { v } from 'convex/values'

export const blocksByCategories = query({
  args: {},
  handler: async (ctx, args) => {
    // get all categories
    const categories = await ctx.db.query('categories').collect()
    // get all blocks and group them by category
    return Promise.all(
      categories.map((category) => {
        return ctx.db
          .query('blocks')
          .withIndex('by_category', (q) => q.eq('category', category._id))
          .collect()
          .then((blocks) => ({ category, blocks }))
      })
    )
  }
})
