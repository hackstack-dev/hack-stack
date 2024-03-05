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
    await testEmailToUser({
      token,
      from: 'app@hackstack.hackazen.com',
      to: 'ofer.webdev@gmail.com',
      subject: 'test suggestionApprovedEmail Email',
      type: 'suggestionApprovedEmail',
      data: {
        username: 'batman',
        suggestion: 'RocksDB',
        suggestionType: 'tech',
        points: 10
      }
    })
  }

  const handleDirectSendApprove = async () => {
    const token = await getToken()
    if (!token) return console.error('No token')
    const res = await fetch('/api/sendEmail', {
      cache: 'no-store',
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
          username: 'batman',
          suggestion: 'RocksDB',
          suggestionType: 'tech',
          points: 10
        }
      })
    })
  }

  const handleDirectSendReject = async () => {
    const token = await getToken()
    if (!token) return console.error('No token')
    const res = await fetch('/api/sendEmail', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        from: 'app@hackstack.hackazen.com',
        to: 'ofer.webdev@gmail.com',
        subject: 'test suggestionRejectedEmail Email',
        type: 'suggestionRejectedEmail',
        data: {
          username: 'batman',
          suggestion: 'RocksDB',
          suggestionType: 'tech',
          reason: "It's not good enough!"
        }
      })
    })
  }

  return (
    <div className="h-full">
      <div className="p-4 flex items-center gap-2">
        <Button onPress={handleSend}>Test Suggestion Approval Email</Button>

        <Button color="success" onPress={handleDirectSendApprove}>
          Test Direct Suggestion Approval Email
        </Button>

        <Button color="danger" onPress={handleDirectSendReject}>
          Test Direct Suggestion Reject Email
        </Button>
      </div>
    </div>
  )
}
