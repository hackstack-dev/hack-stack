import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import BlocksSummary from '@/app/hs/stacks/create/components/steps/summary/BlocksSummary'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'
import { getRandomBackground } from '@/app/lib/utils'
import React from 'react'
import StackCardPreview from '@/app/hs/stacks/create/components/steps/summary/StackCardPreview'

export default function Summary({
  stackState,
  onStateChange
}: StackStateProps) {
  const {
    name,
    projectTypes,
    sourceCodeUrl,
    websiteUrl,
    description,
    isPublic,
    template,
    stackBlocks,
    coverImage
  } = stackState
  const bg = getRandomBackground()
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2">
      <div className="my-12">
        <FancyStepTitle>This is your stack</FancyStepTitle>
        <div className="my-8">
          <RoughNotationGroup show={true}>
            <ul className="space-y-5">
              <li>
                <p>
                  Your stack name is{' '}
                  <RoughNotation type="underline" color="#d946ef">
                    <strong>{name}</strong>
                  </RoughNotation>
                  , it is used{' '}
                  {projectTypes.map((type) => (
                    <span key={type} className="inline-block mr-2">
                      <RoughNotation type="underline" color="#22d3ee">
                        {' ,'}
                        {type}
                      </RoughNotation>
                    </span>
                  ))}
                </p>
              </li>
              <li>
                <p className="my-2">
                  Your stack is{' '}
                  <RoughNotation
                    type="underline"
                    color={isPublic ? '#34d399' : '#e11d48'}
                  >
                    {isPublic ? 'Public' : 'Private'}
                  </RoughNotation>
                </p>
              </li>
              <li>
                <p>
                  And it is based on{' '}
                  <RoughNotation type="underline" color="#22d3ee">
                    {template?.name} template
                  </RoughNotation>
                </p>
              </li>
              {sourceCodeUrl && (
                <li>
                  <p className="my-2">
                    You can see the source code{' '}
                    <a href={sourceCodeUrl} target="_blank">
                      <RoughNotation type="underline" color="#22d3ee">
                        Here
                      </RoughNotation>
                    </a>
                  </p>
                </li>
              )}
              {websiteUrl && (
                <li>
                  <p className="my-2">
                    You can see it in action{' '}
                    <RoughNotation type="underline" color="#22d3ee">
                      <a href={websiteUrl} target="_blank">
                        Here
                      </a>
                    </RoughNotation>
                  </p>
                </li>
              )}
              {description && (
                <li>
                  <p className="my-8 p-4 text-small">
                    <RoughNotation
                      type="bracket"
                      color="#22d3ee"
                      brackets={['left', 'right']}
                    >
                      {description}
                    </RoughNotation>
                  </p>
                </li>
              )}
            </ul>
          </RoughNotationGroup>
          <BlocksSummary stackBlocks={stackBlocks} />
        </div>
      </div>
      <StackCardPreview
        name={name}
        stackBlocks={stackBlocks}
        coverImage={coverImage}
        onStateChange={onStateChange}
      />
    </div>
  )
}
