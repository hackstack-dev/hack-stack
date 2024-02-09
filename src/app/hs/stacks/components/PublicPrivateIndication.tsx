import { Chip } from '@nextui-org/chip'
import React from 'react'

export default function PublicPrivateIndication({
  isPublic
}: { isPublic: boolean }) {
  const publicOrPrivate = isPublic ? 'Public' : 'Private'
  const publicOrPrivateColor = isPublic ? 'success' : 'danger'

  return (
    <Chip variant="dot" size="sm" color={publicOrPrivateColor}>
      <span className="text-default-400 dark:text-white">{publicOrPrivate}</span>
    </Chip>
  )
}
