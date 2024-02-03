import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  plans: defineTable({ name: v.string(), userId: v.string() }),

  stacks: defineTable({
    name: v.string(),
    userId: v.string(),
    projectTypes: v.union(
      v.literal('In an academic research'),
      v.literal('In a freelance project'),
      v.literal('At my company'),
      v.literal('In a bootcamp project'),
      v.literal('In a commercial project'),
      v.literal('At a early stage startup'),
      v.literal('In a hackathon project'),
      v.literal('In a learning project'),
      v.literal('In a nonprofit project'),
      v.literal('In an open source project'),
      v.literal('In my side project'),
      v.literal('In my student final project'),
      v.literal('Other')
    ),
    templateId: v.string(),
    sourceCodeUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    description: v.optional(v.string())
  }),

  tech: defineTable({
    name: v.string(),
    icon: v.string(),
    blockId: v.id('blocks')
  }).index('by_block', ['blockId']),

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
  })
})
