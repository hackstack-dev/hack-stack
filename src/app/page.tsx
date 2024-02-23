import { Button } from '@nextui-org/button'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
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
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 space-y-6">
        <h1 className="text-6xl font-bold text-center">HackStack</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-80">
          Community driven tech stacks
        </p>
        <Button
          href="hs/discover"
          as={Link}
          color="primary"
          variant="solid"
          className="w-full md:w-1/2"
        >
          Get Started
        </Button>
      </div>
      <div className="w-full md:w-1/2">
        <Image
          alt="Welcome Image"
          className="h-full w-full object-cover"
          height="2000"
          src="/assets/images/bg.jpg"
          width="3000"
        />
      </div>
    </div>
  )
}
