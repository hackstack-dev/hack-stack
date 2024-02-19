import { Card, CardBody, CardHeader } from '@nextui-org/card'
import UserProfileLink from '@/app/hs/components/ui/UserProfileLink'
import { Id } from '~/convex/_generated/dataModel'
import React from 'react'
import { BuilderUser } from '~/convex/types'

interface TopBuildersCardProps {
  users: BuilderUser[]
  title: string
  icon: React.ReactNode
}
export default function TopBuildersCard({
  users,
  title,
  icon
}: TopBuildersCardProps) {
  return (
    <div className="w-full">
      <Card className="p-4">
        <CardHeader className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg">{title}</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center space-x-8">
            {users.map((user) => (
              <div key={user.userId}>
                <div className="flex flex-col items-center gap-2">
                  <UserProfileLink
                    userId={user.userId as Id<'users'>}
                    withName
                  />
                  <span className="text-lg font-semibold mr-1">
                    {user.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
