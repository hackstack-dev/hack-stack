'use client'

import React from 'react'
import { Doc } from '~/convex/_generated/dataModel'
import Likes from '@/app/hs/stacks/components/Likes'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { RoughNotation } from 'react-rough-notation'
import { Button } from '@nextui-org/button'
import { LucideGithub, LucideHome } from 'lucide-react'

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
    <header className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RoughNotation type="highlight" color="#d946ef" show>
            <h1 className="text-2xl px-2 py-1">{name}</h1>
          </RoughNotation>
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
              <LucideGithub size={20} />
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
              <LucideHome size={20} />
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
