import PlanProvider from '@/app/hs/plan/components/PlanProvider'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suggestion } from '@/app/hs/stacks/components/suggestions/Suggestion'

export default function BackofficeNavigation() {
  const pathname = usePathname()
  return (
    <aside className="relative hidden w-0 max-w-[180px] flex-1 flex-col border-r-1 border-default-100 p-6 transition-[transform,opacity,margin] duration-250 ease-in-out lg:flex lg:w-72">
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
            <Suggestion item="tech" />
          </li>
        </ul>
      </nav>
    </aside>
  )
}
