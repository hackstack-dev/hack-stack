import { useConvexAuth, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Divider, Spinner, Radio } from '@nextui-org/react'
import { Input } from '@nextui-org/input'
import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import Image from 'next/image'
import { useAppLogo } from '@/app/lib/hooks'
import { cn, getIconAsset } from '@/app/lib/utils'
import { Doc, Id } from '~/convex/_generated/dataModel'
import { RadioGroup } from '@nextui-org/radio'
import { LucideSearch } from 'lucide-react'
import { StackStateProps } from '@/app/hs/stacks/create/create.types'
import { useWizard } from 'react-use-wizard'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'

export default function TemplateListSelection({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()
  const { isAuthenticated } = useConvexAuth()
  const [search, setSearch] = React.useState('')
  const [error, setError] = React.useState('')

  const AppLogo = useAppLogo({ size: 22 })
  const templates = useQuery(
    api.templates.getTemplates,
    !isAuthenticated ? 'skip' : {}
  )

  handleStep(async () => {
    if (!stackState.template?._id) {
      setError('Please choose a template')
      return Promise.reject('templateId is required')
    }
  })
  const handleSelectTemplate = (value: string) => {
    const template = templates?.find((t) => t._id === value)
    onStateChange({ template })
  }

  const filteredTemplates = React.useMemo(
    () =>
      templates?.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, templates]
  )
  return (
    <div className="my-2">
      {!templates ? (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      ) : (
        <RadioGroup
          value={stackState.template?._id}
          onValueChange={handleSelectTemplate}
        >
          <div className="flex items-center justify-between">
            <div className="mt-4">
              <FancyStepTitle>Choose a template</FancyStepTitle>
              {error && <p className="text-tiny text-danger">{error}</p>}
            </div>
            <Input
              size="sm"
              className="mt-12 ml-auto mb-4 max-w-[450px]"
              placeholder={'Search templates'}
              onValueChange={setSearch}
              startContent={<LucideSearch />}
            />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTemplates?.map((t) => (
              <li
                key={t._id}
                onClick={() => handleSelectTemplate(t._id)}
                className="cursor-pointer"
              >
                <Card
                  className={cn(
                    'max-w-[450px] h-[140px]',
                    stackState.template?._id === t._id && 'ring-1 ring-primary'
                  )}
                >
                  <CardHeader className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {t.icon ? (
                        <Image
                          src={getIconAsset(t.icon)}
                          alt={t.name}
                          width={22}
                          height={22}
                          className="invert-0 dark:invert"
                        />
                      ) : (
                        AppLogo
                      )}
                      <h3 className="text-md">{t.name}</h3>
                    </div>

                    <Radio size="sm" value={t._id} />
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="text-xs font-light">{t.description}</p>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </RadioGroup>
      )}
    </div>
  )
}
