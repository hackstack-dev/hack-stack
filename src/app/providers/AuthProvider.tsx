import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import NextUiProvider from '@/app/providers/NextUiProvider'

export default function AuthProvider({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          button: {
            primary: {
              background: 'hsl(189,87%,65%)',
              color: '#000',
              hover: {
                background: 'hsl(190,48%,49%)',
                color: '#000'
              }
            }
          }
        }
      }}
    >
      <NextUiProvider>{children}</NextUiProvider>
    </ClerkProvider>
  )
}
