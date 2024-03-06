import UnknownLand from '@/app/hs/components/ui/UnknownLand'
import UnsubscribeForm from '@/app/unsubscribe/UnsubscribeForm'

interface UnsubscribePageProps {
  params: object
  searchParams: {
    email: string
    token: string
    type:
      | 'feedbackReceivedEmail'
      | 'feedbackReplyEmail'
      | 'suggestionApprovedEmail'
      | 'suggestionRejectedEmail'
      | 'promotionEmail'
  }
}
export default function UnsubscribePage({
  searchParams
}: UnsubscribePageProps) {
  const { email, token, type } = searchParams
  if (!email || !token || !type) {
    return <UnknownLand />
  }
  return <UnsubscribeForm email={email} token={token} type={type} />
}
