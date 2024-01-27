'use client'

import React from 'react'
import { VisuallyHidden, useSwitch } from '@nextui-org/react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch(props: React.PropsWithChildren) {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props)

  const { setTheme } = useTheme()

  React.useEffect(() => {
    setTheme(!isSelected ? 'dark' : 'light')
  }, [isSelected, setTheme])

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: ['w-7 h-7', 'flex items-center justify-center']
          })}
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  )
}
