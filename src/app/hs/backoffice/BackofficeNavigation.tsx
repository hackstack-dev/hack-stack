import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BackofficeNavigation() {
  const pathname = usePathname()
  return (
    <aside className="w-[220px] flex-1 flex-col border-r-1 border-default-100 p-4">
      <nav className="text-center">
        <ul>
          <li>
            <Button
              color={
                pathname.includes('/hs/backoffice/suggestions')
                  ? 'primary'
                  : 'default'
              }
              variant="light"
              radius="full"
              as={Link}
              href="/hs/backoffice/suggestions"
            >
              Suggestions
            </Button>
          </li>
          <li>
            <Button
              color={
                pathname.includes('/hs/backoffice/users')
                  ? 'primary'
                  : 'default'
              }
              variant="light"
              radius="full"
              as={Link}
              href="/hs/backoffice/users"
            >
              Users
            </Button>
          </li>
          <li>
            <Button
              color={
                pathname.includes('/hs/backoffice/sandbox')
                  ? 'primary'
                  : 'default'
              }
              variant="light"
              radius="full"
              as={Link}
              href="/hs/backoffice/sandbox"
            >
              Sandbox
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
