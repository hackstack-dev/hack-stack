import React from 'react'
import { Button } from '@nextui-org/button'
import { useAction } from 'convex/react'
import { useAuth } from '@clerk/nextjs'
import { api } from '~/convex/_generated/api'

export default function SandBox() {
  const { getToken } = useAuth()
  const testEmailToUser = useAction(api.backoffice.testSendEmail)

  const handleSend = async () => {
    const token = await getToken()
    if (!token) return console.error('No token')
    await testEmailToUser({ token })
  }

  return (
    <div className="h-full">
      <div className="h-full p-4">
        <Button onPress={handleSend}>Test Suggestion Approval Email</Button>
      </div>
    </div>
  )
}
