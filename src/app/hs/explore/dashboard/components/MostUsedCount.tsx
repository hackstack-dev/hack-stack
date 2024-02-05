import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Spinner } from '@nextui-org/react'
import { MostUsedCountData } from '~/convex/types'
import Image from 'next/image'
import { getTechLogo } from '@/app/lib/utils'
import React from 'react'
interface MostPopularCountProps {
  title: string
  data?: MostUsedCountData
}
export default function MostUsedCount({ title, data }: MostPopularCountProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
      </CardHeader>

      <CardBody>
        {!data && <Spinner />}
        <div className="space-y-4">
          {data?.map(([item, entry]) => (
            <div key={item} className="flex items-center">
              {entry?.icon && (
                <Image
                  src={getTechLogo(entry.icon)}
                  alt={item}
                  width={24}
                  height={24}
                />
              )}
              <span className="font-light text-default-500 ml-2">{item}</span>
              <span className="ml-auto font-medium">{entry.count}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
