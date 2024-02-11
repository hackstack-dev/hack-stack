import {
  action,
  internalMutation,
  internalQuery,
  query
} from '~/convex/_generated/server'
import { v } from 'convex/values'
import { getManyFrom, getOneFrom } from 'convex-helpers/server/relationships'
import { getOwnerAndRepoFromUrl } from '~/convex/utils'
import { internal } from '~/convex/_generated/api'
import { UnwrapConvex } from '~/convex/types'

export const findTechByBlock = query({
  args: { blockId: v.id('blocks') },
  handler: async ({ db }, { blockId }) => {
    return getManyFrom(db, 'tech', 'by_blockId', blockId)
  }
})

export const getTechByName = internalQuery({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    return await getOneFrom(db, 'tech', 'by_name', name)
  }
})

export const getTechGithubData = internalQuery({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    return await getOneFrom(db, 'techGithubInfo', 'by_techName', name)
  }
})

export const updateTechGithubData = internalMutation({
  args: { id: v.id('techGithubInfo'), techName: v.string(), data: v.any() },
  handler: async ({ db }, { id, techName, data }) => {
    return await db.replace(id, { data, techName, lastUpdated: Date.now() })
  }
})

export const insertTechGithubData = internalMutation({
  args: { techName: v.string(), data: v.any() },
  handler: async ({ db }, { techName, data }) => {
    return await db.insert('techGithubInfo', {
      data,
      techName,
      lastUpdated: Date.now()
    })
  }
})

export const getTechData = action({
  args: { techName: v.string() },
  handler: async ({ runQuery, runMutation }, { techName }) => {
    const tech = (await runQuery(internal.tech.getTechByName, {
      name: techName
    })) as UnwrapConvex<typeof getTechByName>

    if (!tech) {
      return null
    }
    try {
      if (tech.githubUrl) {
        const githubData = (await runQuery(internal.tech.getTechGithubData, {
          name: techName
        })) as UnwrapConvex<typeof getTechGithubData>

        // if we have GitHub data, and it's less than 6 hours old, return it
        if (
          githubData &&
          githubData.lastUpdated > Date.now() - 1000 * 60 * 60 * 6
        ) {
          return {
            ...tech,
            repoData: githubData.data
          }
        }

        const result = getOwnerAndRepoFromUrl(tech.githubUrl)
        if (!result) {
          return null
        }
        const data = await fetch(
          `https://api.github.com/repos/${result.owner}/${result.repo}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
              'User-Agent': 'convex'
            }
          }
        )

        const githubDataJson = await data.json()

        // save the data to the db
        if (githubData) {
          await runMutation(internal.tech.updateTechGithubData, {
            id: githubData._id,
            techName,
            data: githubDataJson
          })
        } else {
          await runMutation(internal.tech.insertTechGithubData, {
            techName,
            data: githubDataJson
          })
        }

        return {
          ...tech,
          repoData: githubDataJson
        }
      }
      return tech
    } catch (err) {
      console.error(err)
      return tech
    }
  }
})

// get tech useage percentage from all stacks
export const getTechUsage = query({
  args: { techName: v.string() },
  handler: async ({ db }, { techName }) => {
    const stacks = await db.query('stacks').collect()
    // filter stacks that use this tech
    const techs = stacks.filter((stack) =>
      stack.stackBlocks.some((block) => block.data.tech.name === techName)
    )
    // find which project types use this tech
    const projectTypes = techs.flatMap((stack) => stack.projectTypes)
    // calculate percentage from overall project types for each type
    const projectTypeCount = Object.entries(
      projectTypes.reduce(
        (acc, type) => {
          acc[type] = (acc[type] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      )
    )
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => [
        type,
        Math.round((count / projectTypes.length) * 100)
      ])

    return {
      count: techs.length,
      p: Math.round((techs.length / stacks.length) * 100),
      projectTypeCount
    }
  }
})
