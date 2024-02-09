import Image from 'next/image'
import {cn, getUniqueHueStyle} from '@/app/lib/utils'

export function useAppLogo({ size }: { size: number }) {
  return (
    <Image
      src="/assets/icons/logo.svg"
      height={size}
      width={size}
      alt="HackStack logo"
    />
  )
}

export function useColorAppLogo({ size }: { size: number }) {
  const colorLogoByString = (str:string) => {
    return (
      <Image
        src="/assets/icons/logo.svg"
        height={size}
        width={size}
        alt="HackStack logo"
        style={getUniqueHueStyle(str)}
      />
    )
  }

  return { colorLogoByString }
}
