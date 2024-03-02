import { query } from '~/convex/_generated/server'
import { v } from 'convex/values'

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
  handler: async ({ db }) => {
    const stacks = await db.query('stacks').collect()
    const techs = stacks.flatMap((stack) =>
      stack.stackBlocks.filter(sb => sb.type === 'blockNode').flatMap((block) => ({
        countBy: block.data.tech?.name || '',
        icon: block.data.tech?.icon || ''
      }))
    )
    return getUsedStats(techs)
  }
})

export const getMostUsedBlocks = query({
  handler: async ({ db }) => {
    const stacks = await db.query('stacks').collect()
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
  handler: async ({ db }) => {
    const stacks = await db.query('stacks').collect()
    const projectTypes = stacks.flatMap((stack) =>
      stack.projectTypes.flatMap((type) => ({
        countBy: type,
        icon: ''
      }))
    )
    return getUsedStats(projectTypes)
  }
})

export const getMostUsedTechByBlockName = query({
  args: { blockIds: v.array(v.string()) },
  handler: async ({ db }, { blockIds }) => {
    const stacks = await db.query('stacks').collect()
    const techs = stacks.flatMap((stack) =>
      stack.stackBlocks
        .filter((sb) => blockIds.includes(sb.data.id))
        .flatMap((block) => ({
          countBy: block.data.tech?.name || '',
          icon: block.data.tech?.icon || ''
        }))
    )
    return getUsedStats(techs)
  }
})
