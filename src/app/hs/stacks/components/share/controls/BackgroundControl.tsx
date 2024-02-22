import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs
} from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import React from 'react'
import { BackgroundVariant } from 'reactflow'
import {
  COLORS,
  GRADIENTS
} from '@/app/hs/stacks/components/share/ShareStack.utils'
import SwatchList from '@/app/hs/stacks/components/share/controls/SwatchList'
import ColorControl from "@/app/hs/stacks/components/share/controls/ColorControl";

interface BackgroundControlProps {
  value?: React.CSSProperties
  onChange: (value: string) => void
}

export default function BackgroundControl({
  value,
  onChange
}: BackgroundControlProps) {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <div
          className="p-4 border border-default-100 rounded-full w-[180px] cursor-pointer"
          style={value}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[268px] p-4">
        <Tabs size="sm" radius="full">
          <Tab key="gradient" title="Gradient">
            <SwatchList list={GRADIENTS} onClick={onChange} />
          </Tab>
          <Tab key="color" title="Color">
            <SwatchList list={COLORS} onClick={onChange} withColorControl />

          </Tab>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
