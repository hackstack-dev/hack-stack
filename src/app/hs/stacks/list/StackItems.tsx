import React from 'react'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { getCardBackground, getTechLogo } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { Doc } from '~/convex/_generated/dataModel'
import { LucideSprout } from 'lucide-react'
import Likes from '@/app/hs/stacks/components/Likes'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import PublicPrivateIndication from '@/app/hs/components/ui/PublicPrivateIndication'

const cardSize = {
  sm: 'h-40',
  md: 'h-60',
  lg: 'h-80'
}

interface StackItemsProps {
  items: (Doc<'stacks'> | null)[]
  size?: 'sm' | 'md' | 'lg'
  isPublicItems?: boolean
  withAvatar?: boolean
}
export default function StackItems({
  items,
  size = 'md',
  isPublicItems = false,
  withAvatar = true
}: StackItemsProps) {
  const myUser = useQuery(api.users.getMyUser)
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <LucideSprout strokeWidth={1} className="w-8 h-8 text-default-400" />
        <h1 className="font-light text-small text-center text-default-400">
          nothing to see here at the moment
        </h1>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items?.map((stack) => {
        if (!stack) return null
        const stackUrl =
          stack.userId === myUser?._id
            ? `/hs/stacks/${stack._id}`
            : `/hs/stacks/view/${stack._id}`
        const first10Blocks = stack.stackBlocks.slice(0, 10)
        return (
          <Card
            key={stack._id}
            isFooterBlurred
            isPressable
            onPress={() => router.push(stackUrl)}
            className={`${cardSize[size]}`}
          >
            <CardHeader className="absolute z-10 top-1 flex items-center justify-between">
              <h4 className="text-white/90 font-medium text-xl drop-shadow">
                {stack.name}
              </h4>
              {isPublicItems && withAvatar && (
                <UserAvatar userId={stack.userId} withName={false} />
              )}
            </CardHeader>
            <Image
              removeWrapper
              isZoomed
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover grayscale-[70%] dark:grayscale-0"
              src={getCardBackground(stack.coverImage)}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                {first10Blocks.map((block, index) => {
                  const logo = getTechLogo(block.data.tech.icon, 'dark')
                  return (
                    <Image
                      key={`${logo}-${index}`}
                      src={logo}
                      className="h-6 w-6"
                      removeWrapper
                    />
                  )
                })}
              </div>
              {!isPublicItems && (
                <PublicPrivateIndication isPublic={stack.isPublic} />
              )}

              {isPublicItems && <Likes stackId={stack._id} />}
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
