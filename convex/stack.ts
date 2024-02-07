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

export const updateStack = mutation(
  async (ctx, { stackId, stack }: { stackId: Id<'stacks'>; stack: Stack }) => {
    const userId = await getUserId(ctx)

    if (!userId) {
      throw new Error('you must be logged in to update a stack')
    }
    const updatedStack = { ...stack, userId }
    return ctx.db.patch(stackId, updatedStack)
  }
)
