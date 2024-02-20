import React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

export default function ThemeSwitch(props: React.PropsWithChildren) {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button
      onClick={handleThemeChange}
      size="sm"
      variant="light"
      radius="full"
      isIconOnly
    >
      {theme === 'dark' ? (
        <SunIcon size={20} stroke="#fde047" />
      ) : (
        <MoonIcon size={20} />
      )}
    </Button>
  )
}
