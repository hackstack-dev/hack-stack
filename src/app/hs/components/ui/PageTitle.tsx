import type React from 'react'

export default function PageTitle({ children }: React.PropsWithChildren) {
  return <h1 className="text-2xl">{children}</h1>
}
