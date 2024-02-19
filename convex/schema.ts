import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export const stacksValidator = v.object({
  name: v.string(),
  userId: v.id('users'),
  isPublic: v.boolean(),
  projectTypes: v.array(v.string()),
  templateId: v.string(),
  coverImage: v.string(),
  sourceCodeUrl: v.optional(v.string()),
  websiteUrl: v.optional(v.string()),
  description: v.optional(v.string()),
  stackBlocks: v.array(
    v.object({
      id: v.string(),
      type: v.optional(v.string()),
      data: v.object({
        id: v.string(),
        blockName: v.string(),
        tech: v.object({
          blockId: v.id('blocks'),
          name: v.string(),
          icon: v.string(),
          githubUrl: v.optional(v.string()),
          websiteUrl: v.optional(v.string()),
          description: v.optional(v.string())
        })
      }),
      position: v.object({
        x: v.number(),
        y: v.number()
      }),
      positionAbsolute: v.optional(
        v.object({
          x: v.optional(v.number()),
          y: v.optional(v.number())
        })
      ),
      width: v.optional(v.union(v.number(), v.null())),
      height: v.optional(v.union(v.number(), v.null())),
      selected: v.optional(v.boolean()),
      dragging: v.optional(v.boolean())
    })
  )
})

export const suggestionsValidator = v.object({
  userId: v.id('users'),
  approved: v.boolean(),
  type: v.union(v.literal('category'), v.literal('block'), v.literal('tech')),
  name: v.string(),
  description: v.optional(v.string()),
  category: v.optional(v.id('categories')),
  tags: v.optional(v.array(v.string())),
  logo: v.optional(v.string()),
  darkLogo: v.optional(v.string()),
  logoIds: v.optional(v.array(v.string())),
  githubUrl: v.optional(v.string()),
  websiteUrl: v.optional(v.string()),
  blockId: v.optional(v.id('blocks'))
})
export default defineSchema({
  plans: defineTable({ name: v.string(), userId: v.id('users') }),

  stacks: defineTable(stacksValidator).index('by_userId', ['userId']),

  tech: defineTable({
    name: v.string(),
    icon: v.string(),
    githubUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    description: v.optional(v.string()),
    blockId: v.id('blocks')
  })
    .index('by_name', ['name'])
    .index('by_blockId', ['blockId']),

  techGithubInfo: defineTable({
    techName: v.string(),
    lastUpdated: v.number(),
    data: v.any()
  }).index('by_techName', ['techName']),

  categories: defineTable({
    name: v.string(),
    icon: v.optional(v.string())
  }),

  blocks: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.id('categories'),
    tags: v.array(v.string()),
    icon: v.optional(v.string())
  }).index('by_category', ['category']),

  templates: defineTable({
    userId: v.id('users'),
    name: v.string(),
    description: v.string(),
    blocks: v.array(v.any()),
    isPublic: v.boolean()
  }).index('by_userId', ['userId']),

  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    isAdmin: v.optional(v.boolean()),
    profileImage: v.optional(v.string())
  }).index('by_userId', ['userId']),

  stackLikes: defineTable({
    stackId: v.id('stacks'),
    userId: v.id('users')
  })
    .index('by_userId_stackId', ['userId', 'stackId'])
    .index('by_stackId', ['stackId'])
    .index('by_userId', ['userId']),

  suggestions: defineTable(suggestionsValidator).index('by_userId', ['userId']),
  notifications: defineTable({
    userId: v.id('users'),
    type: v.union(v.literal('suggestion'), v.literal('achivement')),
    title: v.string(),
    details: v.string(),
    isRead: v.boolean()
  }).index('by_userId', ['userId'])
})
