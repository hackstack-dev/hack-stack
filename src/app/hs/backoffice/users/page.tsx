'use client'
import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Spinner
} from '@nextui-org/react'
import { usePaginatedQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { timeAgo } from '@/app/lib/utils'
import { Button } from '@nextui-org/button'

const columns = [
  { name: 'NAME', uid: 'name' },
  { name: 'CREATED', uid: '_creationTime' }
]

export default function Users() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.users.getUsers,
    {},
    { initialNumItems: 20 }
  )

  type User = (typeof results)[0]

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User]

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'md', src: user.profileImage }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        )
      case '_creationTime':
        return <span>{timeAgo(cellValue as number)}</span>
      default:
        return cellValue
    }
  }, [])

  return (
    <Table
      radius="none"
      isHeaderSticky
      bottomContent={
        status !== 'Exhausted' ? (
          <div className="flex w-full justify-center">
            <Button variant="flat" onPress={() => loadMore(20)}>
              {status === 'LoadingMore' && <Spinner color="white" size="sm" />}
              Load More
            </Button>
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={results}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
