import React from 'react'
import { useOnSelectionChange } from 'reactflow'
import Image from 'next/image'
import { cn, getTechLogo } from '@/app/lib/utils'
import { useAction } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { TechWithRepoData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Link, ScrollShadow } from '@nextui-org/react'
import TechGithubData from '@/app/hs/stacks/view/[stackId]/TechGithubData'
import TechStats from '@/app/hs/stacks/view/[stackId]/TechStats'
import { useTheme } from 'next-themes'

interface StackViewTechDetailsProps {
  name?: string
  embeded?: boolean
}
export default function StackViewTechDetails({
  name,
  embeded
}: StackViewTechDetailsProps) {
  const { theme } = useTheme()
  const [techName, setTechName] = React.useState('')
  const [techData, setTechData] = React.useState<TechWithRepoData>(null)
  const getTechData = useAction(api.tech.getTechData)

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      setTechName(nodes[0]?.data.tech.name)
    }
  })

  React.useEffect(() => {
    if (name) {
      setTechName(name)
    }
  }, [name])

  React.useEffect(() => {
    if (techName) {
      getTechData({ techName }).then((data) => setTechData(data))
    }
  }, [techName, getTechData])

  return (
    <div
      className={cn(
        embeded && 'bg-white dark:bg-default-50/80 rounded-md shadow-sm'
      )}
    >
      {techData && (
        <>
          <header className="flex flex-col gap-1 pb-4 border-b-1 dark:border-default-50 px-4 pt-4">
            <div className="flex items-center gap-2">
              {techData?.icon && (
                <Image
                  src={getTechLogo(techData.icon, theme)}
                  alt={techData?.name ?? 'Not selected'}
                  width={28}
                  height={28}
                  className="h-8"
                />
              )}
              <h1 className="text-xl">{techData?.name}</h1>
            </div>
            {techData?.description && (
              <p className="mt-2 text-small text-default-500">
                {techData.description}
              </p>
            )}
            {techData?.websiteUrl && (
              <Link
                isExternal
                href={techData.websiteUrl}
                className="text-sm text-secondary-400"
                showAnchorIcon
              >
                {techData.websiteUrl}
              </Link>
            )}
          </header>
          <ScrollShadow
            hideScrollBar
            className={cn(
              'h-[calc(100vh-338px)] py-4',
              embeded && 'h-full pb-0'
            )}
          >
            {techData?.repoData && (
              <TechGithubData githubData={techData.repoData} />
            )}
            {techName && <TechStats techName={techName} />}
          </ScrollShadow>
        </>
      )}
    </div>
  )
}
