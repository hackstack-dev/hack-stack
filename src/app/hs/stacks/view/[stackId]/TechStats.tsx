import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Chip } from '@nextui-org/chip'

export default function TechStats({ techName }: { techName: string }) {
  const techUsage = useQuery(
    api.tech.getTechUsage,
    techName ? { techName } : 'skip'
  )
  return (
    <div className="px-4 grid grid-cols-2 gap-4">
      {techUsage?.p ? (
        <div className="rounded-xl border dark:border-default-100">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-primary">
              All time
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{techUsage?.p}%</div>
            <p className="text-xs text-default-400">
              {techUsage?.count} stacks
            </p>
          </div>
        </div>
      ) : null}
      {techUsage?.p ? (
        <div className="rounded-xl border dark:border-default-100">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-primary">
              Last month
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{techUsage?.p}%</div>
            <p className="text-xs text-default-400">
              {techUsage?.count} stacks
            </p>
          </div>
        </div>
      ) : null}
      {techUsage?.projectTypeCount?.length ? (
        <div className="rounded-xl border dark:border-default-100 col-span-2">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-primary">
              Most used in
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 p-6 pt-0">
            {techUsage?.projectTypeCount.map(([key, value]) => (
              <Chip
                key={key}
                endContent={
                  <span className="text-md font-bold dark:text-white px-3">
                    {value}%
                  </span>
                }
                size="sm"
                variant="bordered"
                className="text-default-500"
              >
                {key}
              </Chip>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
