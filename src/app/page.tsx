import { Button } from '@nextui-org/button'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import StarField from '@/app/hs/components/ui/StarField'
import { getRandomHackStackEmailBanner } from '@/app/lib/utils'
import { auth } from '@clerk/nextjs/server'

import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'HackStack',
  description: 'HackStack - Community Driven Tech Stacks',
  applicationName: 'HackStack',
  generator: 'Next.js',
  keywords: 'HackStack, Tech Stacks, Community Driven Tech Stacks',
  openGraph: {
    title: 'HackStack - Community Driven Tech Stacks',
    type: 'website',
    description: 'HackStack - Community Driven Tech Stacks',
    url: 'https://hackstack.hackazen.com'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HackStack - Community Driven Tech Stacks',
    description: 'HackStack - Community Driven Tech Stacks'
  }
}
export default function Home() {
  const {sessionId} = auth()
  if (sessionId) {
    redirect('/hs/discover')
  }
  return (
    <div className="w-full h-screen relative">
      <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-full md:w-1/2 p-6 space-y-6">
        <Image
          src={getRandomHackStackEmailBanner()}
          alt="HackStack"
          width={250}
          height={250}
        />
        <h1 className="text-6xl font-bold text-center text-white">HackStack</h1>
        <p className="text-lg text-[#d946ef] max-w-80">
          Community driven tech stacks
        </p>
        <Button
          href="hs/discover"
          as={Link}
          color="secondary"
          variant="solid"
          className="w-full md:w-1/2"
        >
          Get Started
        </Button>
      </div>
      <div className="w-full h-screen">
        <StarField />
      </div>
    </div>
  )
}
