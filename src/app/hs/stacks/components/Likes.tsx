import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { LucideHeart } from 'lucide-react'
import React, { MouseEventHandler } from 'react'
import { Id } from '~/convex/_generated/dataModel'
import { Button } from '@nextui-org/button'
import { formatNumber } from '@/app/lib/utils'
import { useTheme } from 'next-themes'

export default function Likes({ stackId }: { stackId: Id<'stacks'> }) {
  const isAlreadyLikes = useQuery(api.likes.getUserLikeStatus, { stackId })
  const addLike = useMutation(api.likes.likeStack)
  const removeLike = useMutation(api.likes.removeLike)
  const likesCount = useQuery(api.likes.getStackLikesCount, { stackId })
  const color = isAlreadyLikes ? 'hsl(292 84% 61%)' : 'hsl(240 5% 65%)'

  const handleLike = async () => {
    if (isAlreadyLikes) {
      await removeLike({ stackId })
    } else {
      await addLike({ stackId })
    }
  }
  return (
    <div className="flex items-center">
      <span className="text-xs text-default-400 dark:text-default-500">
        {formatNumber(likesCount ?? 0)}
      </span>
      <Button variant="light" radius="full" onClick={handleLike} className="ml-1" isIconOnly>
        <LucideHeart size={20} color={color} />
      </Button>
    </div>
  )
}
