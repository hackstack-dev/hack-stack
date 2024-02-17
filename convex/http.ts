import { httpRouter } from 'convex/server'
import { internal } from './_generated/api'
import { httpAction } from './_generated/server'

const http = httpRouter()

http.route({
  path: '/clerk',
  method: 'POST',
  handler: httpAction(async ({runAction, runMutation}, request) => {
    const payloadString = await request.text()
    const headerPayload = request.headers

    try {
      const result = await runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          'svix-id': headerPayload.get('svix-id'),
          'svix-timestamp': headerPayload.get('svix-timestamp'),
          'svix-signature': headerPayload.get('svix-signature')
        }
      })

      switch (result.type) {
        case 'user.created':
          await runMutation(internal.users.createUser, {
            email: result.data.email_addresses[0]?.email_address,
            userId: result.data.id,
            name: `${result.data.first_name} ${result.data.last_name}`,
            profileImage: result.data.image_url
          })
          break
        case 'user.updated':
          await runMutation(internal.users.updateUser, {
            userId: result.data.id,
            profileImage: result.data.image_url,
            name: `${result.data.first_name} ${result.data.last_name}`
          })
          break
      }

      return new Response(null, {
        status: 200
      })
    } catch (err) {
      console.error(err)
      return new Response('Webhook Error', {
        status: 400
      })
    }
  })
})

export default http
