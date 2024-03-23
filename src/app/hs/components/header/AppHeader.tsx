'use client'

import Link from 'next/link'
import AppNavigation from '@/app/hs/components/header/AppNavigation'
import AppUser from '@/app/hs/components/header/AppUser'
import ThemeSwitch from '@/app/hs/components/header/ThemeSwitch'
import AppLogo from '@/app/hs/components/header/AppLogo'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import React from 'react'
import type { MenuItem } from '@/app/hs/components/header/types'
import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import AppSettings from '@/app/hs/components/header/AppSettings'
import AppNotifications from '@/app/hs/components/header/notifications/AppNotifications'

const menuItems: MenuItem[] = [
  {
    name: 'Discover',
    href: '/hs/discover',
    parentPath: 'discover'
  },
  {
    name: 'Stacks',
    href: '/hs/stacks',
    parentPath: 'stacks'
  },
  {
    name: 'Templates',
    href: '/hs/templates',
    parentPath: 'templates'
  },
  {
    name: 'Tech Finder',
    href: '/hs/finder',
    parentPath: 'finder',
    highlight: true
  }
]
const adminMenuItems: MenuItem[] = [
  {
    name: 'Backoffice',
    href: '/hs/backoffice',
    parentPath: 'backoffice'
  }
]

export default function AppHeader() {
  const myUser = useQuery(api.users.getMyUser, {})
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const menu = React.useMemo(() => {
    if (myUser?.isAdmin) {
      return [...menuItems, ...adminMenuItems]
    }
    return menuItems
  }, [myUser])

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="border-b-1 border-b-default-200 dark:border-b-default-50"
      isBordered
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/hs/discover" className="flex items-center space-x-2">
            <AppLogo />
            <h1 className="text-2xl font-semibold text-center">HackStack</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <AppNavigation menuItems={menu} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <AppNotifications />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <AppUser />
        </NavbarItem>
        {myUser && (
          <NavbarItem>
            <AppSettings user={myUser} />
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem className="mb-4">
          <ThemeSwitch />
        </NavbarMenuItem>
        <AppNavigation menuItems={menuItems} mode="menu" />
      </NavbarMenu>
    </Navbar>
  )
}
