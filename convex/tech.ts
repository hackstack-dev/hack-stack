import { query } from '~/convex/_generated/server'
import { v } from 'convex/values'

export const findTechByBlock = query({
  args: { blockId: v.id('blocks') },
  handler: async (ctx, { blockId }) => {
    return await ctx.db
      .query('tech')
      .withIndex('by_blockId', (q) => q.eq('blockId', blockId))
      .collect()
  }
})
