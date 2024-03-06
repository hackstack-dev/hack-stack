import Image from 'next/image'
import { getHackStackFigure } from '@/app/lib/utils'
import Link from 'next/link'

export default function UnknownLand() {
  return (
    <div className="mx-auto my-10 w-fit text-center">
      <Image
        src={getHackStackFigure('jack')}
        alt={'Jack'}
        width={450}
        height={450}
        className="mx-auto w-fit text-center"
      />
      <h1 className="text-3xl mb-6">You have reached unknown land</h1>
      <Link className="text-lg underline text-primary" href={'/'}>
        Return Home
      </Link>
    </div>
  )
}
