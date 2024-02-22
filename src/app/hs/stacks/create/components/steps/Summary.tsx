import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import BlockNodeDataDisplay from '@/app/hs/stacks/components/blocks/node-types/BlockNodeDataDisplay'
import { RoughNotation, RoughNotationGroup } from 'react-rough-notation'
import PageTitle from '@/app/hs/components/ui/PageTitle'

interface SummaryProps {
  stackState: StackStateProps['stackState']
}
export default function Summary({ stackState }: SummaryProps) {
  const {
    name,
    projectTypes,
    sourceCodeUrl,
    websiteUrl,
    description,
    template,
    stackBlocks
  } = stackState

  return (
    <div className="my-12">
      <PageTitle>This is your stack</PageTitle>
      <div className="my-8">
        <RoughNotationGroup show={true}>
          <p>
            Your stack name is{' '}
            <RoughNotation type="highlight" color="#d946ef">
              <span className="text-black">{name}</span>
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
          <p>
            And it is based on{' '}
            <RoughNotation type="underline" color="#22d3ee">
              {template?.name}
            </RoughNotation>
          </p>
          {sourceCodeUrl && (
            <p className="my-2">
              You can see the source code{' '}
              <a href={sourceCodeUrl} target="_blank">
                <RoughNotation type="underline" color="#22d3ee">
                  Here
                </RoughNotation>
              </a>
            </p>
          )}
          {websiteUrl && (
            <p className="my-2">
              You can see it in action{' '}
              <RoughNotation type="underline" color="#22d3ee">
                <a href={websiteUrl} target="_blank">
                  Here
                </a>
              </RoughNotation>
            </p>
          )}
          {description && (
            <p className="my-8 p-4 text-small">
              <RoughNotation
                type="bracket"
                color="#22d3ee"
                brackets={['left', 'right']}
              >
                {description}
              </RoughNotation>
            </p>
          )}
        </RoughNotationGroup>

        <h2 className="text-2xl font-bold mt-12 mb-4">Blocks</h2>
        <div className="my-8 flex flex-wrap items-center gap-4">
          {stackBlocks.map((block) => (
            <BlockNodeDataDisplay
              key={block.id}
              selected={false}
              {...block.data}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
