'use client'

import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { usePathname } from 'next/navigation'

export default function AppNavigation() {
  const pathname = usePathname()
  const exploreColor = pathname.includes('/explore') ? 'primary' : 'default'
  const createColor = pathname.includes('/create') ? 'primary' : 'default'
  const planColor = pathname.includes('/plan') ? 'primary' : 'default'

  return (
    <nav className="flex items-center gap-4">
      <Button
        href="explore"
        as={Link}
        size="md"
        variant="light"
        color={exploreColor}
        radius="full"
      >
        Explore
      </Button>
      <Button
        href="create"
        as={Link}
        size="md"
        variant="light"
        color={createColor}
        radius="full"
      >
        Create
      </Button>
      <Button
        href="plan"
        as={Link}
        size="md"
        variant="light"
        color={planColor}
        radius="full"
      >
        Plan
      </Button>
    </nav>
  )
}
