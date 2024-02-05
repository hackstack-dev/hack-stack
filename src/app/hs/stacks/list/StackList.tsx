'use client'

import Link from 'next/link'
import { Divider, Radio, Spinner } from '@nextui-org/react'
import React from 'react'
import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { cn, getIconAsset } from '@/app/lib/utils'
import Image from 'next/image'

export default function StackList() {
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
          {stacks?.map((stack) => (
            <Card key={stack._id}>
              <CardHeader>
                <h3 className="text-md">{stack.name}</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-xs font-light text-default-500">
                  {stack.projectTypes}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
