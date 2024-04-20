import { httpRouter } from 'convex/server'
import { clerkEventsHandler } from '~/convex/httpHandlers/clerk'

const http = httpRouter()

http.route({
  path: '/clerk',
  method: 'POST',
  handler: clerkEventsHandler
})

export default http
