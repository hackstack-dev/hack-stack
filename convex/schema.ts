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
          icon: v.string()
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

export default defineSchema({
  plans: defineTable({ name: v.string(), userId: v.id('users') }),

  stacks: defineTable(stacksValidator).index('by_userId', ['userId']),

  tech: defineTable({
    name: v.string(),
    icon: v.string(),
    blockId: v.id('blocks')
  }).index('by_blockId', ['blockId']),

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
    name: v.string(),
    description: v.string(),
    blocks: v.array(v.object({})),
    icon: v.optional(v.string())
  }),

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
    .index('by_userId', ['userId'])
})
