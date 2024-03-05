import React from 'react'
import { Button } from '@nextui-org/button'
import { useAction } from 'convex/react'
import { useAuth } from '@clerk/nextjs'
import { api } from '~/convex/_generated/api'

export default function SandBox() {
  const { getToken } = useAuth()

  const handleDirectSend = async () => {
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

  return (
    <div className="h-full">
      <div className="p-4 flex items-center gap-2">
        {/*<Button onPress={handleSend}>Test Suggestion Approval Email</Button>*/}

        <Button color="success" onPress={handleDirectSend}>
          Test Direct Suggestion Approval Email
        </Button>
      </div>
    </div>
  )
}
