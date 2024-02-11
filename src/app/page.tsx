import { Button } from '@nextui-org/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 space-y-6">
        <h1 className="text-6xl font-bold text-center">HackStack</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-80">
          Uncover, Share, Plan and unlock the Collective Genius: HackStack is
          Your Tech Stack Hub
        </p>
        <Button href="hs/discover" as={Link} color="primary" variant="solid" className="w-full md:w-1/2">
          Get Started
        </Button>
      </div>
      <div className="w-full md:w-1/2">
        <Image
          alt="Welcome Image"
          className="h-full w-full object-cover rotate-45 border rounded-md"
          height="2000"
          src="/assets/images/bg.jpg"
          width="3000"
        />
      </div>
    </div>
  )
}
