import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import CreateStackWizard from '@/app/hs/stacks/create/CreateStackWizard'

export default function CreatePage() {
  return (
    <div className="w-full p-4">
      <CreateStackWizard />
    </div>
  )
}
