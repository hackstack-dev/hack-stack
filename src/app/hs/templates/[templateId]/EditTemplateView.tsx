'use client'

import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import EditStack from '@/app/hs/stacks/[stackId]/EditStack'
import { Spinner } from '@nextui-org/react'
import TemplateForm from '@/app/hs/templates/components/TemplateForm'

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
      {!template && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {template && (
        <TemplateForm
          defaultValues={template}
          initialNodes={template.blocks}
          title="Edit Template"
          templateId={template._id}
        />
      )}
    </>
  )
}
