import React from 'react'
import CreateStackWizard from '@/app/hs/stacks/create/CreateStackWizard'

export default function CreatePage() {
  return (
    <div className="w-full px-4 pt-4 flex flex-col h-[calc(100vh-76px)]">
      <CreateStackWizard />
    </div>
  )
}
