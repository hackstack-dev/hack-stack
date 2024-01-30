import Image from 'next/image'

export function useAppLogo({ size }: { size: number }) {
  return (
    <Image
      src="/assets/icons/logo.svg"
      height={size}
      width={size}
      alt="HackStack logo"
      // className="invert-0 dark:invert"
    />
  )
}
