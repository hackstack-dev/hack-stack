import { v } from 'convex/values'
import { authMutation, authQuery } from 'convex/utils'
import { getManyFrom } from 'convex-helpers/server/relationships'

export const getTemplates = authQuery({
  handler: async (ctx, args) => {
    if (!ctx.user) return []
    return await ctx.db
      .query('templates')
      .filter((q) =>
        q.or(
          q.eq(q.field('isPublic'), true),
          q.eq(q.field('userId'), ctx.user._id)
        )
      )
      .collect()
  }
})

export const getUserTemplates = authQuery({
  handler: async (ctx, args) => {
    if (!ctx.user) return []
    return await getManyFrom(ctx.db, 'templates', 'by_userId', ctx.user._id)
  }
})

export const getUserTemplateById = authQuery({
  args: {
    templateId: v.id('templates')
  },
  handler: async (ctx, args) => {
    if (!ctx.user) return
    return await ctx.db
      .query('templates')
      .withIndex('by_userId', (q) => q.eq('userId', ctx.user._id))
      .filter((q) => q.eq(q.field('_id'), args.templateId))
      .first()
  }
})

export const createTemplate = authMutation({
  args: {
    name: v.string(),
    description: v.string(),
    isPublic: v.boolean(),
    blocks: v.array(v.any())
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('templates', {
      userId: ctx.user._id,
      name: args.name,
      description: args.description,
      blocks: args.blocks,
      isPublic: args.isPublic
    })
  }
})

export const updateTemplate = authMutation({
  args: {
    templateId: v.id('templates'),
    name: v.string(),
    description: v.string(),
    isPublic: v.boolean(),
    blocks: v.array(v.any())
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.templateId, {
      name: args.name,
      description: args.description,
      blocks: args.blocks,
      isPublic: args.isPublic
    })
  }
})

export const deleteTemplate = authMutation({
  args: {
    templateId: v.id('templates')
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.templateId)
  }
})
