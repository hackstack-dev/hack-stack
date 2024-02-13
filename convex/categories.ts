import { authQuery } from '~/convex/utils'

export const getCategories = authQuery({
  handler: async ({ db, user }, args) => {
    if (!user) return []
    return await db.query('categories').collect()
  }
})
