'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import TemplateForm from '@/app/hs/templates/components/TemplateForm'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'

interface EditTemplateViewProps {
  templateId: Id<'templates'>
}
export default function EditTemplateView({
  templateId
}: EditTemplateViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && templateId
  const template = useQuery(
    api.templates.getUserTemplateById,
    shouldFetch ? { templateId } : 'skip'
  )

  return (
    <>
      {!template && <PageDataLoading />}
      {template && (
        <TemplateForm
          defaultValues={template}
          initialNodes={template.blocks}
          initialEdges={[]}
          title="Edit Template"
          templateId={template._id}
        />
      )}
    </>
  )
}
