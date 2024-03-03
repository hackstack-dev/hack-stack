import { getTechLogo } from '@/app/lib/utils'
import { Image } from '@nextui-org/react'
import {
  SuggestionApprovedData,
  SuggestionRejectedData
} from '@/app/hs/components/header/notifications/messages/NotificationMessage.types'

interface SuggestionRejectedProps {
  data: SuggestionRejectedData
}
export default function SuggestionRejected({ data }: SuggestionRejectedProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[24px_1fr] gap-4">
      <Image width={24} height={24} src={getTechLogo('icon.svg', 'light')} />
      <div className="flex flex-col gap-1">
        <h5 className="font-semibold">Suggestion rejected 😔</h5>
        <p className="text-xs text-foreground-600">
          Your suggestion to add new {data.type}{' '}
          <span className="font-semibold">{data.suggestion}</span> has been
          rejected... due to <strong>{data.rejectReason}</strong>.
        </p>
        <p className="text-xs text-foreground-600">
          Don't worry, you can always improve your suggestion and try again!
        </p>
      </div>
    </div>
  )
}
