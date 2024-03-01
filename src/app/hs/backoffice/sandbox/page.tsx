'use client'

import SandBox from '@/app/hs/backoffice/sandbox/Sandbox'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'

export default function Page() {
  return (
    <div className="h-full">
      <FlowProvider>
        <SandBox />
      </FlowProvider>
    </div>
  )
}
