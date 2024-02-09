import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const IMAGEKIT_URL = 'https://ik.imagekit.io/odzx7thry/hack_stack'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconAsset(icon: string) {
  return `/assets/icons/${icon}.svg`
}

export function getTechLogo(tech: string) {
  return `${IMAGEKIT_URL}/logos/${tech}`
}

export function getRandomBackground() {
  return `${Math.floor(Math.random() * 25) + 1}.jpeg`
}
export function getCardBackground(bg: string) {
  return `${IMAGEKIT_URL}/backgrounds/${bg}`
}

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
