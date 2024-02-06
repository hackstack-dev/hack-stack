import { mutation, query } from '~/convex/_generated/server'
import { getUserId } from '~/convex/utils'
import { Stack } from '~/convex/types'
import { Id } from '~/convex/_generated/dataModel'

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

// get stack by id
export const getStack = query({
  handler: async (ctx, { id }: { id: Id<'stacks'> }) => {
    const userId = await getUserId(ctx)
    if (!userId) {
      throw new Error('you must be logged in to get a stack')
    }

    return await ctx.db.get(id)
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

const getUsedStats = (data: { countBy: string; icon?: string }[]) => {
  const allCount = data.reduce(
    (acc, item) => {
      const countBy = item.countBy
      const currentCount = acc[countBy]?.count || 0

      acc[countBy] = {
        count: currentCount + 1,
        percent: ((currentCount + 1) / data.length) * 100,
        icon: item.icon || ''
      }

      return acc
    },
    {} as Record<string, { count: number; percent: number; icon: string }>
  )

  // sort by count and take top 5
  const sortedEntries = Object.entries(allCount).sort(
    (a, b) => b[1].count - a[1].count
  )
  return sortedEntries.slice(0, 5)
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
    return getUsedStats(techs)
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
    return getUsedStats(blocks)
  }
})

export const getMostUsedProjectTypes = query({
  handler: async (ctx, args) => {
    const stacks = await ctx.db.query('stacks').collect()
    const projectTypes = stacks.flatMap((stack) =>
      stack.projectTypes.flatMap((type) => ({
        countBy: type,
        icon: ''
      }))
    )
    return getUsedStats(projectTypes)
  }
})
