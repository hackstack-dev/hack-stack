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
import { MenuItem } from '@/app/hs/components/header/types'

const menuItems: MenuItem[] = [
  {
    name: 'Explore',
    href: '/hs/explore',
    parentPath: 'explore'
  },
  {
    name: 'Stacks',
    href: '/hs/stacks',
    parentPath: 'stacks'
  },
  {
    name: 'Plan',
    href: '/hs/plan',
    parentPath: 'plan'
  }
]

export default function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/hs/explore" className="flex items-center space-x-2">
            <AppLogo />
            <h1 className="text-2xl font-semibold text-center">HackStack</h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <AppNavigation menuItems={menuItems} />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <AppUser />
        </NavbarItem>
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
