import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import PageDataLoading from '@/app/hs/components/ui/PageDataLoading'
import React from 'react'
import { Image } from '@nextui-org/image'
import { cn, getTechLogo } from '@/app/lib/utils'
import { useTheme } from 'next-themes'
import { Card } from '@nextui-org/card'

interface UserProfileContributionsProps {
  userId: Id<'users'>
}
export default function UserProfileContributions({
  userId
}: UserProfileContributionsProps) {
  const { theme } = useTheme()
  const userContributions = useQuery(
    api.suggestions.getUserSuggestions,
    userId ? { userId } : 'skip'
  )
  return (
    <>
      {!userContributions && <PageDataLoading />}
      <h1 className="text-9xl font-bold">{userContributions?.totalPoints}</h1>
      <p className="text-lg text-default-500 dark:text-default-400">
        Contribution points
      </p>
      <div className="mt-8 grid cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-stretch">
        {userContributions?.suggestions.map((suggestion) => {
          return (
            <Card
              key={suggestion._id}
              className="p-2 flex flex-col items-center justify-center space-y-2"
            >
              {suggestion.type !== 'tech' && (
                <div className="text-sm text-default-500 dark:text-default-400">
                  <span
                    className={cn(
                      'capitalize',
                      suggestion.type === 'block'
                        ? 'text-warning'
                        : 'text-secondary'
                    )}
                  >
                    {suggestion.type}
                  </span>
                </div>
              )}
              <h2 className="text-lg font-semibold">{suggestion.name}</h2>
              {suggestion.logo && (
                <Image src={getTechLogo(suggestion.logo, theme)} width={32} />
              )}
              <div className="flex flex-col items-center my-4">
                <h3 className="text-2xl text-primary font-semibold">
                  {suggestion.points}
                </h3>
                <p className="text-sm text-default-500 dark:text-default-400">
                  points
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </>
  )
}
