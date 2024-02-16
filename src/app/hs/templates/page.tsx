import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { LucideLayoutTemplate } from 'lucide-react'
import React from 'react'
import TemplateList from '@/app/hs/templates/list/TemplateList'

export default function TemplatesPage() {
  return (
    <ContentContainer>
      <ActionableHeader
        title="Your Templates"
        action={
          <Button
            color="secondary"
            as={Link}
            href="templates/create"
            className="text-white"
          >
            <LucideLayoutTemplate strokeWidth={1.5} /> Create new Template
          </Button>
        }
      />
      <div className="my-8">
        <TemplateList />
      </div>
    </ContentContainer>
  )
}
