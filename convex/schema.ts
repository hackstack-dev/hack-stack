import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  plans: defineTable({ name: v.string(), userId: v.string() }),

  stacks: defineTable({
    name: v.string(),
    userId: v.string(),
    projectTypes: v.union(
      v.literal('Academic research'),
      v.literal('As freelance'),
      v.literal('As part of my job'),
      v.literal('Bootcamp project'),
      v.literal('Commercial project'),
      v.literal('Early stage startup'),
      v.literal('Hackathon project'),
      v.literal('Learning project'),
      v.literal('Nonprofit project'),
      v.literal('Open source project'),
      v.literal('Pet project'),
      v.literal('Side project'),
      v.literal('Student final project'),
      v.literal('Other')
    ),
    templateId: v.string(),
    sourceCodeUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    description: v.optional(v.string()),
  }),
  tech: defineTable({ name: v.string() }),
  templates: defineTable({
    name: v.string(),
    description: v.string(),
    blocks: v.array(v.string()),
    icon: v.optional(v.string())
  })
})
