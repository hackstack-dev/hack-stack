'use client'

import { Button } from '@nextui-org/button'
import { usePathname } from 'next/navigation'
import {
  NavbarItem,
  NavbarMenuItem,
  Link as NextUiLink
} from '@nextui-org/react'
import Link from 'next/link'
import { MenuItem } from '@/app/hs/components/header/types'
import React from 'react'
import { cn } from '@/app/lib/utils'

const DEFAULT_COLOR = 'default'
const PRIMARY_COLOR = 'primary'
const FOREGROUND_COLOR = 'foreground'

interface AppNavigationProps {
  menuItems: MenuItem[]
  mode?: 'nav' | 'menu'
}
export default function AppNavigation({
  menuItems,
  mode = 'nav'
}: AppNavigationProps) {
  const pathname = usePathname()

  return (
    <>
      {menuItems.map((item) => {
        const isActive = pathname.includes(`/${item.href}`)
        const color = isActive ? PRIMARY_COLOR : DEFAULT_COLOR
        const menuItemColor = isActive ? PRIMARY_COLOR : FOREGROUND_COLOR

        return mode === 'nav' ? (
          <NavbarItem key={item.href} isActive={isActive}>
            <Button
              href={item.href}
              as={Link}
              size="md"
              variant="light"
              color={color}
              radius="full"
            >
              <span
                className={cn(
                  isActive &&
                    'bg-gradient-to-b from-orange-400 to-red-500 dark:from-amber-200 dark:to-amber-400 bg-clip-text text-transparent'
                )}
              >
                {item.name}
              </span>
            </Button>
          </NavbarItem>
        ) : (
          <NavbarMenuItem key={item.href} isActive={isActive}>
            <NextUiLink href={item.href} color={menuItemColor}>
              {item.name}
            </NextUiLink>
          </NavbarMenuItem>
        )
      })}
    </>
  )
}
