'use client'

import { Button } from '@nextui-org/button'
import { usePathname } from 'next/navigation'
import { NavbarMenuItem, Link as NextUiLink, Badge } from '@nextui-org/react'
import Link from 'next/link'
import type { MenuItem } from '@/app/hs/components/header/types'
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
        const isActive = pathname.includes(item.parentPath)
        const color = isActive ? PRIMARY_COLOR : DEFAULT_COLOR
        const menuItemColor = isActive ? PRIMARY_COLOR : FOREGROUND_COLOR

        const Component =
          mode === 'nav' ? (
            <Button
              href={item.href}
              as={Link}
              size="md"
              variant={item.highlight ? 'flat' : 'light'}
              color={color}
              radius="full"
            >
              <span className={cn(isActive && 'text-secondary-400')}>
                {item.name}
              </span>
            </Button>
          ) : (
            <NavbarMenuItem key={item.href} isActive={isActive}>
              <NextUiLink href={item.href} color={menuItemColor}>
                {item.name}
              </NextUiLink>
            </NavbarMenuItem>
          )

        return item.highlight ? (
          <Badge content="new" color="danger" size="sm">
            {Component}
          </Badge>
        ) : (
          Component
        )
      })}
    </>
  )
}
