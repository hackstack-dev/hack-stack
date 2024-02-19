import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const IMAGEKIT_URL = 'https://ik.imagekit.io/odzx7thry/hack_stack'

export type ColorVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'default'
  | 'primary'
  | 'secondary'
  | undefined

export const colorMap: Record<string, ColorVariant> = {
  category: 'secondary',
  block: 'warning',
  tech: 'danger'
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconAsset(icon: string) {
  return `/assets/icons/${icon}.svg`
}

export function convertFileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

export function getTechLogo(tech: string, theme: string | undefined) {
  const techExtension = tech.split('.').pop() ?? 'svg'
  const logoName =
    theme === 'dark'
      ? `${tech.replace(techExtension, `dark.${techExtension}`)}`
      : tech
  return `${IMAGEKIT_URL}/logos/${logoName}`
}

export function getRandomBackground() {
  return `${Math.floor(Math.random() * 25) + 1}.jpeg`
}
export function getCardBackground(bg: string) {
  return `${IMAGEKIT_URL}/backgrounds/${bg}`
}

// export function getSuggestionLogo(bg: string) {
//   return `${IMAGEKIT_URL}/backgrounds/${bg}`
// }

export function getUniqueHueStyle(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
  }
  const hueRotateValue = Math.abs(hash) % 360

  return {
    filter: `hue-rotate(-${hueRotateValue}deg)`
  }
}

export function generateRandomStackName() {
  const adjectives = [
    'Agile',
    'Dynamic',
    'Robust',
    'Innovative',
    'Modern',
    'Scalable',
    'Elastic',
    'Cloud-native',
    'Microservices',
    'Responsive',
    'Automated',
    'Decentralized',
    'Smart',
    'Adaptive',
    'Efficient',
    'Versatile',
    'Harmonious',
    'Optimized',
    'Intelligent',
    'Proactive',
    'Secure',
    'Collaborative',
    'Distributed',
    'Synergistic',
    'Resilient',
    'Efficient',
    'Interactive',
    'Seamless',
    'Streamlined'
  ]
  const nouns = [
    'Phoenix',
    'Quantum',
    'Fusion',
    'Matrix',
    'Pulse',
    'Nova',
    'Zenith',
    'Orbit',
    'Velocity',
    'Cyber',
    'Sprint',
    'Harmony',
    'Cosmic',
    'Inferno',
    'Ignition',
    'Gravity',
    'Nebula',
    'Galaxy',
    'Aurora',
    'Horizon',
    'Vortex',
    'Pinnacle',
    'Expanse',
    'Catalyst',
    'Cortex',
    'Pinnacle',
    'Venture',
    'Apex',
    'Horizon',
    'Catalyst'
  ]

  const getRandomItem = (words: string[]) =>
    words[Math.floor(Math.random() * words.length)]

  const randomAdjective = getRandomItem(adjectives)
  const randomNoun = getRandomItem(nouns)

  return `${randomAdjective} ${randomNoun} Stack`
}

export const formatNumber = (num: number) => {
  if (num < 1000) {
    return num.toString()
  }
  if (num < 1000000) {
    return `${(num / 1000).toFixed(0)}k`
  }
  return `${(num / 1000000).toFixed(0)}M`
}

export const timeAgo = (date: string | number, includeTime = false) => {
  const currentDate = new Date()
  const inputDate = new Date(date)

  const timeDifference = currentDate.getTime() - inputDate.getTime()

  const secondsInMs = 1000
  const minutesInMs = secondsInMs * 60
  const hoursInMs = minutesInMs * 60
  const daysInMs = hoursInMs * 24
  const monthsInMs = daysInMs * 30 // Assuming a month is 30 days for simplicity
  const yearsInMs = daysInMs * 365 // Assuming a year is 365 days for simplicity

  const yearsAgo = Math.floor(timeDifference / yearsInMs)
  const monthsAgo = Math.floor((timeDifference % yearsInMs) / monthsInMs)
  const daysAgo = Math.floor((timeDifference % monthsInMs) / daysInMs)
  const hoursAgo = Math.floor((timeDifference % daysInMs) / hoursInMs)
  const minutesAgo = Math.floor((timeDifference % hoursInMs) / minutesInMs)

  let result = ''

  if (yearsAgo > 0) {
    result += yearsAgo + (yearsAgo === 1 ? ' year' : ' years')
  }

  if (monthsAgo > 0) {
    result +=
      (result ? ', ' : '') +
      monthsAgo +
      (monthsAgo === 1 ? ' month' : ' months')
  }

  if (daysAgo > 0) {
    result +=
      (result ? ', ' : '') + daysAgo + (daysAgo === 1 ? ' day' : ' days')
  }

  if (includeTime) {
    if (hoursAgo > 0) {
      result +=
        (result ? ', ' : '') + hoursAgo + (hoursAgo === 1 ? ' hour' : ' hours')
    }

    if (minutesAgo > 0) {
      result +=
        (result ? ', ' : '') +
        minutesAgo +
        (minutesAgo === 1 ? ' minute' : ' minutes')
    }
  }

  return result || 'Just now'
}
