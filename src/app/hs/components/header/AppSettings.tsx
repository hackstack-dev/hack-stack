import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import {LucideMoreVertical, LucideSettings, LucideUser} from 'lucide-react'
import React from 'react'
import { Doc } from '~/convex/_generated/dataModel'

interface AppSettingsProps {
  user: Doc<'users'>
}
export default function AppSettings({ user }: AppSettingsProps) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <LucideMoreVertical size={16} strokeWidth={1} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          href={`/hs/profile/${user._id}`}
          startContent={<LucideUser size={16} strokeWidth={1.5} />}
        >
          My Profile
        </DropdownItem>
          <DropdownItem
              key="settings"
              href={`/hs/settings/${user._id}`}
              startContent={<LucideSettings size={16} strokeWidth={1.5} />}
          >
              Settings
          </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
