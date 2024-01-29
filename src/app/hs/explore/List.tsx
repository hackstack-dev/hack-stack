'use client'
import { useConvexAuth, useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Divider, Spinner } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import Link from 'next/link'
import Image from 'next/image'
import { useAppLogo } from '@/app/lib/hooks'
import { getIconAsset } from '@/app/lib/utils'

export default function ListPage() {
  const { isAuthenticated } = useConvexAuth()
  const AppLogo = useAppLogo({ size: 22 })
  const templates = useQuery(
    api.templates.getTemplates,
    !isAuthenticated ? 'skip' : {}
  )

  return (
    <div className="my-4">
      {!templates && <Spinner size="sm" />}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {templates?.map((t) => (
          <li key={t._id}>
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                {t.icon ? (

                    <Image
                      src={getIconAsset(t.icon)}
                      alt={t.name}
                      width={22}
                      height={22}
                      className="invert-0 dark:invert"
                    />

                ) : (
                  AppLogo
                )}
                <h3 className="text-md">{t.name}</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-sm font-light">{t.description}</p>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
