import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Progress, Spinner, Tab, Tabs } from '@nextui-org/react'
import { MostUsedStatsData } from '~/convex/types'
import Image from 'next/image'
import { getTechLogo } from '@/app/lib/utils'
import React from 'react'
import { LucidePercent, LucideSigma } from 'lucide-react'
interface MostPopularCountProps {
  title: string
  data?: MostUsedStatsData
}
export default function MostUsedStats({ title, data }: MostPopularCountProps) {
  const [view, setView] = React.useState<string | number>('percent')
  const subTitle = view === 'percent' ? '% from overall' : 'Total count'
  return (
    <Card className="p-2">
      <CardHeader className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-default-500 text-xs">{subTitle}</p>
        </div>

        <Tabs
          aria-label="Options"
          variant="bordered"
          size="sm"
          onSelectionChange={setView}
        >
          <Tab
            key="percent"
            title={
              <div className="flex items-center space-x-2">
                <LucidePercent size={16} />
              </div>
            }
          />
          <Tab
            key="count"
            title={
              <div className="flex items-center space-x-2">
                <LucideSigma size={16} />
              </div>
            }
          />
        </Tabs>
      </CardHeader>

      <CardBody>
        {!data && <Spinner />}
        <div className="w-full space-y-3">
          {data?.map(([item, entry]) => {
            return (
              <div key={item} className="flex items-end h-[36px]">
                <div className="flex items-center gap-2 min-w-[160px] max-w-[230px]">
                  {entry?.icon && (
                    <div>
                      <Image
                        src={getTechLogo(entry.icon)}
                        alt={item}
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                  <div className="font-light text-default-500 text-small">
                    {item}
                  </div>
                </div>

                {view === 'percent' && (
                  <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                      base: 'max-w-md pb-1',
                      indicator: 'bg-gradient-to-r from-secondary to-primary',
                      value: 'text-sm text-foreground/60 ml-auto'
                    }}
                    value={entry.percent}
                    showValueLabel={true}
                  />
                )}
                {view === 'count' && (
                  <div className="ml-auto flex flex-col justify-center pb-2">
                    {entry.count}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
