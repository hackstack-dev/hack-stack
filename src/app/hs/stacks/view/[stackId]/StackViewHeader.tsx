'use client'

import React from 'react'
import { Doc } from '~/convex/_generated/dataModel'
import Likes from '@/app/hs/stacks/components/Likes'
import { RoughNotation } from 'react-rough-notation'
import { Button } from '@nextui-org/button'
import { LucideGithub, LucideHome } from 'lucide-react'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'
import UserProfileLink from '@/app/hs/components/ui/UserProfileLink'

interface StackViewHeaderProps {
  stack: Doc<'stacks'>
}
export default function StackViewHeader({ stack }: StackViewHeaderProps) {
  const {
    name,
    sourceCodeUrl,
    websiteUrl,
    projectTypes,
    description,

  } = stack

  return (
    <header className="p-4">
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
