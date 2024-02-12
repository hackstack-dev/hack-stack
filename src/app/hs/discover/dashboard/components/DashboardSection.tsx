import { Divider } from '@nextui-org/react'
import React from 'react'

export default function DashboardSection({
  title,
  children
}: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="py-6">
      <h2 className="text-xl">{title}</h2>
      <Divider className="w-full bg-default-300 dark:bg-default-100 mt-2 mb-6" />
      {children}
    </div>
  )
}
