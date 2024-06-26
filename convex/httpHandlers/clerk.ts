import { httpAction } from '~/convex/_generated/server'
import { internal } from '~/convex/_generated/api'
import { resolverUsername } from '~/convex/utils'

export const clerkEventsHandler = httpAction(
  async ({ runAction, runMutation }, request) => {
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
        case 'user.created': {
          const name = resolverUsername(
            result.data.first_name,
            result.data.last_name
          )
          const email = result.data.email_addresses[0]?.email_address
          const newUserId = await runMutation(internal.users.createUser, {
            email,
            userId: result.data.id,
            name,
            profileImage: result.data.image_url
          })

          if (newUserId) {
            await runMutation(
              internal.userSettings.internalCreateUserSettings,
              {
                userId: newUserId
              }
            )
          }

          await runAction(internal.email.sendEmail, {
            subject: 'A new user has signed up',
            html: `<p>A new user with the name <b>${name}</b> and email <b>${email}</b> has signed up.</p>`
          })
          break
        }
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
  }
)
