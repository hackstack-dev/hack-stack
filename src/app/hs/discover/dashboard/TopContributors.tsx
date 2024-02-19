import { useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import UserProfileLink from '@/app/hs/components/ui/UserProfileLink'
import {LucideFlower, LucideStar, LucideTrophy} from 'lucide-react'
import React from 'react'
import ContribDataItem from '@/app/hs/discover/dashboard/components/ContribDataItem'

export const getIconByIndex = (index: number) => {
  switch (index) {
    case 0:
      return <LucideTrophy stroke="#f59e0b" />
    case 1:
      return <LucideTrophy stroke="#94a3b8" />
    case 2:
      return <LucideTrophy stroke="#b45309" />
    default:
      return <LucideFlower stroke="#c084fc" />
  }
}
export function TopContributors() {
  const topContributors = useQuery(api.users.getTopContributors, {})
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">
        <LucideStar size={20} stroke="#fcd34d" />
        <h2 className="text-lg">Top Contributors</h2>
      </div>
      <Table hideHeader>
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>User</TableColumn>
          <TableColumn>Points</TableColumn>
          <TableColumn>Tech</TableColumn>
          <TableColumn>Blocks</TableColumn>
          <TableColumn>Categories</TableColumn>
        </TableHeader>
        <TableBody>
          {(topContributors ?? []).map((user, index) => (
            <TableRow key={user.userId}>
              <TableCell>{getIconByIndex(index)}</TableCell>
              <TableCell>
                <UserProfileLink userId={user.userId} withName />
              </TableCell>
              <TableCell>
                <ContribDataItem
                  data={user.points}
                  text="Contribution points"
                />
              </TableCell>
              <TableCell>
                <ContribDataItem data={user.tech} text="Technologies" />
              </TableCell>
              <TableCell>
                <ContribDataItem data={user.block} text="Blocks" />
              </TableCell>
              <TableCell>
                <ContribDataItem data={user.category} text="Categories" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
