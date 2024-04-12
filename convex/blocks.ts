import { internalMutation } from './_generated/server'
import { authQuery } from '~/convex/utils'
import { v } from 'convex/values'

export const getAllBlocks = authQuery({
  handler: async ({ db, user }, args) => {
    if (!user) return []
    return await db.query('blocks').collect()
  }
})

export const blocksByCategories = authQuery({
  handler: async ({ db }) => {
    // get all categories
    const categories = await db.query('categories').collect()
    // get all blocks and group them by category
    return Promise.all(
      categories.map((category) => {
        return db
          .query('blocks')
          .withIndex('by_category', (q) => q.eq('category', category._id))
          .collect()
          .then((blocks) => ({ category, blocks }))
      })
    )
  }
})

export const internalInsertBlock = internalMutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.id('categories'),
    tags: v.array(v.string())
  },
  handler: async ({ db }, args) => {
    return await db.insert('blocks', {
      name: args.name,
      description: args.description,
      category: args.category,
      tags: args.tags
    })
  }
})
