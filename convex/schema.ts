import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  plans: defineTable({ name: v.string(), userId: v.string() }),
  stacks: defineTable({ name: v.string(), userId: v.string() }),
  tech: defineTable({ name: v.string() }),
  templates: defineTable({
    name: v.string(),
    description: v.string(),
    icon: v.optional(v.string())
  })
})
