import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        grad: {
          '0%': {
            backgroundPosition: '0% 50%',
            backgroundSize: '400% 400%'
          },
          '50%': {
            backgroundPosition: '100% 50%',
            backgroundSize: '400% 400%'
          },
          '100%': { backgroundPosition: '0% 50%', backgroundSize: '400% 400%' }
        }
      },
      animation: {
        grad: 'grad 30s ease infinite'
      }
    }
  },
  plugins: [
    nextui({
      layout: {
        disabledOpacity: '0.3', // opacity-[0.3]
        borderWidth: {
          small: '0.5rem', // border
          medium: '1px', // border-2
          large: '4px' // border-4
        }, // border
        radius: {
          small: '2px', // rounded-small
          medium: '4px', // rounded-medium
          large: '6px' // rounded-large
        }
      },
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: '#d946ef',
              foreground: '#000'
            },
            secondary: {
              DEFAULT: '#8b5cf6',
              400: '#22d3ee'
            },
            success: {
              DEFAULT: '#34d399'
            },
            warning: {
              DEFAULT: '#facc15'
            },
            danger: {
              DEFAULT: '#e11d48'
            }
          }
        },
        light: {
          colors: {
            primary: {
              DEFAULT: '#000',
              foreground: '#fff'
            },
            success: {
              DEFAULT: '#4ade80'
            },
            warning: {
              DEFAULT: '#facc15'
            },
            danger: {
              DEFAULT: '#e11d48'
            }
          }
        }
      }
    })
  ],
  darkMode: ['class']
}
export default config
