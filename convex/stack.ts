import { mutation, query } from '~/convex/_generated/server'
import { getUserId } from '~/convex/utils'
import { Stack } from '~/convex/types'

export const getStacks = query({
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)
    if (!userId) {
      throw new Error('you must be logged in to get stacks')
    }

    return await ctx.db
      .query('stacks')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  }
})

export const saveStack = mutation(async (ctx, { stack }: { stack: Stack }) => {
  const userId = await getUserId(ctx)

  if (!userId) {
    throw new Error('you must be logged in to save a stack')
  }
  const newStack = { ...stack, userId }
  return ctx.db.insert('stacks', newStack)
})

const getUsedCount = (data: { countBy: string; icon?: string }[]) => {
  const allCount = data.reduce(
    (acc, item) => {
      acc[item.countBy] = {
        count: acc[item.countBy] ? acc[item.countBy].count + 1 : 1,
        icon: item.icon ?? ''
      }
      return acc
    },
    {} as Record<string, { count: number; icon: string }>
  )

  // sort by count and take top 5
  return Object.entries(allCount)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
}

export const getMostUsedTech = query({
  handler: async (ctx, args) => {
    const stacks = await ctx.db.query('stacks').collect()
    const techs = stacks.flatMap((stack) =>
      stack.stackBlocks.flatMap((block) => ({
        countBy: block.data.tech.name,
        icon: block.data.tech.icon
      }))
    )
    return getUsedCount(techs)
  }
})

export const getMostUsedBlocks = query({
  handler: async (ctx, args) => {
    const stacks = await ctx.db.query('stacks').collect()
    const blocks = stacks.flatMap((stack) =>
      stack.stackBlocks.flatMap((block) => ({
        countBy: block.data.blockName,
        icon: ''
      }))
    )
    return getUsedCount(blocks)
  }
})
