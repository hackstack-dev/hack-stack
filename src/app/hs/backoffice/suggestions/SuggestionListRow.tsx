import React from 'react'

interface SuggestionListRowProps {
  label: string
  value: React.ReactNode
}
export default function SuggestionListRow({
  label,
  value
}: SuggestionListRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="text-sm text-default-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  )
}
