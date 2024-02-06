'use client'

import ContentContainer from '@/app/hs/components/ui/ContentContainer'
import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Spinner } from '@nextui-org/react'
import { Id } from '~/convex/_generated/dataModel'
import ActionableHeader from '@/app/hs/components/ui/ActionableHeader'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { LucideListPlus } from 'lucide-react'

interface StackViewProps {
  id: Id<'stacks'>
}
export default function StackView({ id }: StackViewProps) {
  const { isAuthenticated } = useConvexAuth()
  const shouldFetch = isAuthenticated && id
  const stack = useQuery(api.stack.getStack, shouldFetch ? { id } : 'skip')
  return (
    <ContentContainer>
      {!stack && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {stack && (
        <div>
          <ActionableHeader
            title={stack.name}
            action={
              <Button color="primary" as={Link} href="/hs/stacks/create">
                <LucideListPlus /> Create new Stack
              </Button>
            }
          />
          <p>{stack.description}</p>
        </div>
      )}
    </ContentContainer>
  )
}
