import React from 'react'

export default function PageTitle({ children }: React.PropsWithChildren) {
  return <h1 className="text-2xl font-semibold">{children}</h1>
}
