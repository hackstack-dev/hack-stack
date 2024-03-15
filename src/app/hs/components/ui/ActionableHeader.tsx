import PageTitle from '@/app/hs/components/ui/PageTitle'
import type React from 'react'

export interface ActionableHeaderProps {
  title: React.ReactNode
  action: React.ReactNode
}
export default function ActionableHeader({
  title,
  action
}: ActionableHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <PageTitle>{title}</PageTitle>
      <div>{action}</div>
    </div>
  )
}
