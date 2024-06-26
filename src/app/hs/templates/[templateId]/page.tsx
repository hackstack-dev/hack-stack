'use client'
import React from 'react'
import { Id } from '~/convex/_generated/dataModel'
import FlowProvider from '@/app/hs/components/ui/FlowProvider'
import EditTemplateView from '@/app/hs/templates/[templateId]/EditTemplateView'

export default function EditTemplatePage({
  params
}: { params: { templateId: Id<'templates'> } }) {
  const templateId = params.templateId
  return (
    <div className="w-full flex flex-col h-[calc(100vh-76px)]">
      <FlowProvider>
        <EditTemplateView templateId={templateId} />
      </FlowProvider>
    </div>
  )
}
