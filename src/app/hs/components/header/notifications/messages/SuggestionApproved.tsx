import { getTechLogo } from '@/app/lib/utils'
import { Image } from '@nextui-org/react'
import {SuggestionApprovedData} from "@/app/hs/components/header/notifications/messages/NotificationMessage.types";

interface SuggestionApprovedProps {
    data:SuggestionApprovedData
}
export default function SuggestionApproved({data}:SuggestionApprovedProps) {
  return (
      <div className="grid grid-cols-1 md:grid-cols-[24px_1fr] gap-4">
        <Image width={24} height={24} src={getTechLogo('icon.svg', 'light')} />
    <div className="flex flex-col gap-1">
      <h5 className="font-semibold">Suggestion approved</h5>
      <p className="text-xs text-foreground-600">
        Your suggestion to add new {data.type} <span className="font-semibold">{data.suggestion}</span> has been approved!
      </p>
      <p className="text-xs text-foreground-600">Youv'e also earned <b>{data.points}</b> contribution points 🎉</p>
    </div>
      </div>
  )
}
