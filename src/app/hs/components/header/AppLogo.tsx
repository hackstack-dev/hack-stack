'use client'

import logoWhite from '@/app/assets/logo-white.svg'
import logoBlack from '@/app/assets/logo-black.svg'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function AppLogo() {
  const { theme } = useTheme()
  const logoSvg = theme === 'dark' ? logoWhite : logoBlack
  return <Image src={logoSvg} height={22} width={22} alt="HackStack logo" />
}
