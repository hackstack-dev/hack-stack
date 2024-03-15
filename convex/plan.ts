import { authQuery } from '~/convex/utils'
import { getManyFrom } from 'convex-helpers/server/relationships'

export const getMyUserPlans = authQuery({
  handler: async ({ db, user }) => {
    if (!user) return []
    return await getManyFrom(db, 'plans', 'by_userId', user._id)
  }
})
