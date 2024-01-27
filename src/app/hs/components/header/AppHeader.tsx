import logoIcon from '@/app/icon.svg'
import Image from 'next/image'
import Link from 'next/link'
import AppNavigation from '@/app/hs/components/header/AppNavigation'
import AppUser from '@/app/hs/components/header/AppUser'
import ThemeSwitch from '@/app/hs/components/header/ThemeSwitch'

export default function AppHeader() {
  return (
    <header className="border-b dark:border-zinc-900">
      <div className="h-16 flex justify-between items-center px-4">
        <Link href="explore" className="flex items-center space-x-2">
          <Image src={logoIcon} height={24} width={24} alt="HackStack logo" />
          <h1 className="text-2xl font-semibold text-center">HackStack</h1>
        </Link>

        <AppNavigation />
        <div className="flex flex-row-reverse items-center">
          <AppUser />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
