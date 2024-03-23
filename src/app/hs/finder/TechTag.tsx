import { Chip } from '@nextui-org/chip'
import { cn } from '@/app/lib/utils'
import React from 'react'
import { useTheme } from 'next-themes'
import { techTagColors } from '@/app/hs/finder/TechFinder.utils'
import { Button } from '@nextui-org/button'

interface TechTagProps {
  tag: string
  active: boolean
  onClick?: (tag: string) => void
}
export default function TechTag({ tag, active, onClick }: TechTagProps) {
  const { theme } = useTheme()

  const handleClick = () => {
    onClick?.(tag)
  }
  return (
    <Chip
      key={tag}
      as={Button}
      size="sm"
      variant="flat"
      onClick={handleClick}
      classNames={{
        base: cn(
          active && 'bg-gradient-to-r',
          theme === 'dark' ? techTagColors[tag].dark : techTagColors[tag].light
        )
      }}
    >
      {tag}
    </Chip>
  )
}
