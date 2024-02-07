'use client'

import { ReactFlowProvider } from 'reactflow'
import React from 'react'

export default function StackViewProvider({
  children
}: React.PropsWithChildren) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>
}
