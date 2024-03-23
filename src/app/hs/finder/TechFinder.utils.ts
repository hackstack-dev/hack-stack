import type { TechTagColors } from '@/app/hs/finder/TechFinder.types'

export const techTagColors: TechTagColors = {
  'Open Source': {
    light: 'from-green-300 to-yellow-300',
    dark: 'from-green-500 to-yellow-600'
  },
  SaaS: {
    light: 'from-pink-300 to-violet-400',
    dark: 'from-pink-500 to-violet-600'
  },
  New: {
    light: 'from-red-300 to-orange-300',
    dark: 'from-red-500 to-orange-500'
  }
}

export const getShortUrl = (url: string) => {
  let shortUrl = url
  if (url.endsWith('/')) {
    shortUrl = url.slice(0, -1)
  }
  return shortUrl.split('/').pop()
}
