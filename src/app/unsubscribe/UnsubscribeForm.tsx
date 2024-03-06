'use client'

import { useAction } from 'convex/react'
import { api } from '~/convex/_generated/api'
import React from 'react'
import { toast } from 'sonner'
import { unsubscribe } from '~/convex/email'
import Image from 'next/image'
import { getHackStackFigure } from '@/app/lib/utils'
import Link from 'next/link'
import { Button } from '@nextui-org/button'

interface UnsubscribeFormProps {
  email: string
  token: string
  type:
    | 'feedbackReceivedEmail'
    | 'feedbackReplyEmail'
    | 'suggestionApprovedEmail'
    | 'suggestionRejectedEmail'
    | 'promotionEmail'
}
export default function UnsubscribeForm({
  email,
  token,
  type
}: UnsubscribeFormProps) {
  const unsubscribe = useAction(api.email.unsubscribe)

  const handleUnsubscribe = async () => {
    await unsubscribe({ email, token, type })
    toast.success('You have been unsubscribed', {
      duration: 10000,
      position: 'top-center',
      description:
        'You will no longer receive emails from us. But you can always subscribe again in your app settings.'
    })
    setTimeout(() => {
      window.location.href = '/'
    }, 10000)
  }
  return (
    <div className="mx-auto my-10 w-fit text-center">
      <Image
        src={getHackStackFigure('lin')}
        alt={'amy'}
        width={450}
        height={450}
        className="mx-auto w-fit text-center"
      />
      <h1 className="text-3xl mb-6">I need a break from these emails</h1>
      <Button onPress={handleUnsubscribe}>Unsubscribe me</Button>
    </div>
  )
}
