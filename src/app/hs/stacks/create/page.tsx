import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import CreateStackWizard from '@/app/hs/stacks/create/CreateStackWizard'

export default function CreatePage() {
  return (
    <div className="w-full px-4 pt-4">
      <CreateStackWizard />
    </div>
  )
}