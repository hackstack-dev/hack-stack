import React from 'react'
import { cn } from '@/app/lib/utils'

interface ContentContainerProps {
  fullScreen?: boolean
}
export default function ContentContainer({
  children,
  fullScreen = false
}: React.PropsWithChildren<ContentContainerProps>) {
  return (
    <div
      className={cn('px-6 py-4', fullScreen ? 'w-full' : 'mx-auto max-w-7xl')}
    >
      {children}
    </div>
  )
}
