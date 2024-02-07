'use client'

import Link from 'next/link'
import { Divider, Radio, Spinner } from '@nextui-org/react'
import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { getCardBackground, getTechLogo } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'

export default function StackList() {
  const router = useRouter()
  const { isAuthenticated } = useConvexAuth()
  const stacks = useQuery(api.stack.getStacks, !isAuthenticated ? 'skip' : {})

  return (
    <>
      {!stacks && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      {stacks && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stacks?.map((stack) => {
            const stackUrl = `/hs/stacks/${stack._id}`
            return (
              <Card
                key={stack._id}
                isFooterBlurred
                isPressable
                onPress={() => router.push(stackUrl)}
                className="h-[300px]"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <h4 className="text-white/90 font-medium text-xl">
                    {stack.name}
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  isZoomed
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src={getCardBackground(stack.coverImage)}
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    {stack.stackBlocks.map((block) => {
                      const logo = getTechLogo(block.data.tech.icon)
                      return (
                        <Image
                          key={logo}
                          src={logo}
                          className="h-6 w-6"
                          removeWrapper
                        />
                      )
                    })}
                  </div>
                  <Button as={Link} href={stackUrl} radius="full" size="sm">
                    View
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
}
