import { v } from 'convex/values'
import { authMutation, authQuery } from 'convex/utils'
import { getManyFrom } from 'convex-helpers/server/relationships'

export const getTemplates = authQuery({
  handler: async ({ db, user }) => {
    if (!user) return []
    return await db
      .query('templates')
      .filter((q) =>
        q.or(q.eq(q.field('isPublic'), true), q.eq(q.field('userId'), user._id))
      )
      .collect()
  }
})

export const getMyUserTemplates = authQuery({
  handler: async ({ db, user }) => {
    if (!user) return []
    return await getManyFrom(db, 'templates', 'by_userId', user._id)
  }
})

export const getOtherUserTemplates = authQuery({
  args: {
    userId: v.id('users')
  },
  handler: async ({ db }, { userId }) => {
    return await getManyFrom(db, 'templates', 'by_userId', userId)
  }
})

export const getUserTemplateById = authQuery({
  args: {
    templateId: v.id('templates')
  },
  handler: async ({ db, user }, { templateId }) => {
    if (!user) return
    return await db
      .query('templates')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .filter((q) => q.eq(q.field('_id'), templateId))
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
  handler: async ({ db, user }, args) => {
    const { name, description, blocks, isPublic } = args
    return await db.insert('templates', {
      userId: user._id,
      name,
      description,
      blocks,
      isPublic
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
  handler: async ({ db }, args) => {
    const { name, description, blocks, isPublic } = args
    return await db.patch(args.templateId, {
      name,
      description,
      blocks,
      isPublic
    })
  }
})

export const deleteTemplate = authMutation({
  args: {
    templateId: v.id('templates')
  },
  handler: async ({ db }, { templateId }) => {
    return await db.delete(templateId)
  }
})
