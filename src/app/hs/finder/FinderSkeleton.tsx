import { Skeleton } from '@nextui-org/react'
import { cn } from '@/app/lib/utils'

interface FinderSkeletonProps {
  length: number
  cols: '2' | '3'
}
export default function FinderSkeleton({ length, cols }: FinderSkeletonProps) {
  return (
    <div
      className={cn(
        'grid gap-4 grid-cols-1',
        cols === '3' ? 'md:grid-cols-3' : 'md:grid-cols-2'
      )}
    >
      {Array.from({ length }, (_, i) => (
        <Skeleton key={i} className="rounded-lg">
          <div className="h-8 rounded-lg bg-default-300" />
        </Skeleton>
      ))}
    </div>
  )
}
