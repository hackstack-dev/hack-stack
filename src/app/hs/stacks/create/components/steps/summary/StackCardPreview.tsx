import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import {
  getCardBackground,
  getRandomBackground,
  getTechLogo
} from '@/app/lib/utils'
import React from 'react'
import {
  StackState,
  StackStateProps
} from '@/app/hs/stacks/create/create.types'
import { BlockNodeData } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { Node } from 'reactflow'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'

interface StackCardPreviewProps {
  name: StackState['name']
  stackBlocks: StackState['stackBlocks']
  coverImage: StackState['coverImage']
  onStateChange: StackStateProps['onStateChange']
}

export default function StackCardPreview({
  name,
  stackBlocks,
  coverImage,
  onStateChange
}: StackCardPreviewProps) {
  const myUser = useQuery(api.users.getMyUser, {})

  const getRandBackground = () => {
    onStateChange({ coverImage: getRandomBackground() })
  }

  return (
    <div className="mt-10">
      <FancyStepTitle>
        This is how your stack card will look like
      </FancyStepTitle>
      <Card isFooterBlurred className="mt-4 h-60 w-[470px]">
        <CardHeader className="absolute z-10 top-1 flex items-center justify-between">
          <h4 className="text-white/90 font-medium text-lg py-1 px-3 bg-black/10 rounded-lg">
            {name}
          </h4>
          {myUser && <UserAvatar userId={myUser?._id} withName={false} />}
        </CardHeader>

        <Image
          removeWrapper
          isZoomed
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={getCardBackground(coverImage)}
        />

        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            {stackBlocks.slice(0, 10).map((block, index) => {
              const logo = (block as Node<BlockNodeData>).data.tech?.icon
                ? getTechLogo(
                    (block as Node<BlockNodeData>).data.tech.icon,
                    'dark'
                  )
                : ''
              return logo ? (
                <Image
                  key={`${logo}-${index}`}
                  src={logo}
                  className="h-6 w-6"
                  removeWrapper
                />
              ) : null
            })}
          </div>
        </CardFooter>
      </Card>
      <p className="mt-4 text-sm">
        <span
          onClick={getRandBackground}
          className="cursor-pointer text-primary underline"
        >
          Get random background
        </span>
      </p>
      <p className="mt-2 text-sm text-default-400">
        * You can bring your own background image in the settings later
      </p>
    </div>
  )
}
