import React from 'react'

export default function PageTitle({ children }: React.PropsWithChildren) {
  return <h1 className="text-3xl font-semibold">{children}</h1>
}
