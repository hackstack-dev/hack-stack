import { Resend } from 'resend'
import jwt from 'jsonwebtoken'
import { SuggestionApprovedEmail } from '~/emails/SuggestionApprovedEmail'
import React from 'react'
import { NextResponse } from 'next/server'
import SuggestionRejectedEmail from '~/emails/SuggestionRejectedEmail'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function getEmailComponent(type: string, data: any) {
  const emailComponents: Record<string, React.ReactElement> = {
    suggestionApprovedEmail: <SuggestionApprovedEmail {...data} />,
    suggestionRejectedEmail: <SuggestionRejectedEmail {...data} />,
    feedbackReceivedEmail: <SuggestionApprovedEmail {...data} />,
    feedbackReplyEmail: <SuggestionApprovedEmail {...data} />,
    promotionEmail: <SuggestionApprovedEmail {...data} />
  }
  const Component = emailComponents[type]
  return Component
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export async function POST(req: Request) {
  const publicKey = process.env.CLERK_JWT_PK as string
  const resend = new Resend(process.env.RESEND_API_KEY)
  const bearerToken = req.headers.get('Authorization')
  if (bearerToken === undefined) {
    return NextResponse.json(
      {
        error: 'Not signed in'
      },
      {
        status: 401
      }
    )
  }
  try {
    if (bearerToken) {
      const token = bearerToken.split(' ')[1]
      jwt.verify(token, publicKey)
      const body = await req.json()
      const { from, to, subject, type, data } = body
      const Component = getEmailComponent(type, data)
      const emailResponse = await resend.emails.send({
        from,
        to,
        subject,
        react: Component
      })
      return NextResponse.json(
        {
          ...emailResponse
        },
        {
          status: 200
        }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Not signed in'
      },
      {
        status: 400
      }
    )
  }
}
