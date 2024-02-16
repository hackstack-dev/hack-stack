'use client'

import React from 'react'
import { Doc } from '~/convex/_generated/dataModel'
import Likes from '@/app/hs/stacks/components/Likes'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { RoughNotation } from 'react-rough-notation'
import { Button } from '@nextui-org/button'
import { LucideGithub, LucideHome } from 'lucide-react'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'

interface StackViewHeaderProps {
  stack: Doc<'stacks'>
}
export default function StackViewHeader({ stack }: StackViewHeaderProps) {
  const {
    _id,
    name,
    sourceCodeUrl,
    websiteUrl,
    projectTypes,
    description,
    userId
  } = stack

  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FancyStepTitle>{name}</FancyStepTitle>
          {sourceCodeUrl && (
            <Button
              as={'a'}
              href={sourceCodeUrl}
              target={'_blank'}
              variant="light"
              radius="full"
              size="sm"
              isIconOnly
            >
              <LucideGithub size={20} strokeWidth={1} />
            </Button>
          )}
          {websiteUrl && (
            <Button
              as={'a'}
              href={websiteUrl}
              target={'_blank'}
              variant="light"
              radius="full"
              size="sm"
              isIconOnly
            >
              <LucideHome size={20} strokeWidth={1} />
            </Button>
          )}
        </div>

        <div className="flex items-center flex-row-reverse gap-2">
          <UserAvatar userId={userId} withName />
          <Likes stackId={_id} />
        </div>
      </div>
      {projectTypes.map((type) => (
        <RoughNotation key={type} type="underline" color="#22d3ee" show>
          <span key={type} className="inline-block mr-3 text-sm">
            {type}
          </span>
        </RoughNotation>
      ))}
      {description && (
        <p className="text-default-500 text-xs mt-4">{description}</p>
      )}
    </header>
  )
}
