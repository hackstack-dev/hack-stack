import React from 'react'
import { Button } from '@nextui-org/button'
import { useAction } from 'convex/react'
import { useAuth } from '@clerk/nextjs'
import { api } from '~/convex/_generated/api'
import { v } from 'convex/values'

export default function SandBox() {
  const { getToken } = useAuth()
  const testEmailToUser = useAction(api.backoffice.testSendEmail)

  const handleSend = async () => {
    const token = await getToken()
    if (!token) return console.error('No token')
    await testEmailToUser({ token })
  }

  const handleDirectSend = async () => {
    const token = await getToken()
    if (!token) return console.error('No token')
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        from: 'app@hackstack.hackazen.com',
        to: 'ofer.webdev@gmail.com',
        subject: 'test suggestionApprovedEmail Email',
        type: 'suggestionApprovedEmail',
        data: {
          email: 'ofer.webdev@gmail.com',
          name: 'Ofer'
        }
      })
    })
  }

  return (
    <div className="h-full">
      <div className="h-full p-4">
        <Button onPress={handleSend}>Test Suggestion Approval Email</Button>

        <Button color="success" onPress={handleDirectSend}>
          Test Direct Suggestion Approval Email
        </Button>
      </div>
    </div>
  )
}
