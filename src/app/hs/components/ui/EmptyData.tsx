import { LucideSprout } from 'lucide-react'
import React from 'react'

export default function EmptyData({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <LucideSprout strokeWidth={1} className="w-7 h-7 text-default-400" />
      <h1 className="font-light text-sm text-center text-default-400 mb-4">
        nothing to see here at the moment
      </h1>
      {children}
    </div>
  )
}
