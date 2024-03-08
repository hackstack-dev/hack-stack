'use client'
import React from 'react'
import TemplateForm from '@/app/hs/templates/components/TemplateForm'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'

const defaultValues = {
  name: '',
  description: '',
  isPublic: false
}
export default function CreateTemplatePage() {
  return (
    <div className="w-full px-4 pt-4 flex flex-col h-[calc(100vh-76px)]">
      <FlowProvider>
        <TemplateForm
          defaultValues={defaultValues}
          initialNodes={[]}
          initialEdges={[]}
          title="Create a new template"
        />
      </FlowProvider>
    </div>
  )
}
