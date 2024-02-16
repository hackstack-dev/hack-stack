'use client'

import { ReactFlowProvider } from 'reactflow'
import React from 'react'

export default function FlowProvider({
  children
}: React.PropsWithChildren) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>
}
