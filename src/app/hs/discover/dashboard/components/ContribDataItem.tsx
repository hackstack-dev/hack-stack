import React from 'react'

interface ContribDataItemProps {
  data: number
  text: string
}
export default function ContribDataItem({
  data,
  text
}: ContribDataItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div>
        <span className="text-xl font-semibold mr-1">{data}</span>
        <span className="text-xs text-foreground-500">{text}</span>
      </div>
    </div>
  )
}
