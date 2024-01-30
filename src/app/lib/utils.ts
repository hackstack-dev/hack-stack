import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIconAsset(icon: string) {
  return `/assets/icons/${icon}.svg`
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

// E
