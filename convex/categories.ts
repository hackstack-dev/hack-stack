import { authMutation, authQuery } from '~/convex/utils'
import { v } from 'convex/values'
import { internalMutation } from '~/convex/_generated/server'

export const getCategories = authQuery({
  handler: async ({ db }) => {
    return await db.query('categories').collect()
  }
})

export const internalInsertCategory = internalMutation({
  args: {
    name: v.string()
  },
  handler: async ({ db }, { name }) => {
    return await db.insert('categories', { name })
  }
})
