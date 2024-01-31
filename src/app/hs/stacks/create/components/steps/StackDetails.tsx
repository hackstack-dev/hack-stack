import { Input, Textarea } from '@nextui-org/input'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { ScrollShadow } from '@nextui-org/react'
import React from 'react'
import { Chip } from '@nextui-org/chip'
import { cn, generateRandomStackName } from '@/app/lib/utils'
import { projectTypes } from '@/app/hs/stacks/create/create.config'
import { Controller, useForm } from 'react-hook-form'
import {
  ProjectType,
  StackForm,
  stackFormSchema,
  StackStateProps
} from '@/app/hs/stacks/create/create.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useWizard } from 'react-use-wizard'
import { FancyStepTitle } from '@/app/hs/stacks/create/components/layout/FancyStepTitle'

export default function StackDetails({
  stackState,
  onStateChange
}: StackStateProps) {
  const { handleStep } = useWizard()
  const form = useForm<StackForm>({
    resolver: zodResolver(stackFormSchema),
    defaultValues: stackState
  })
  const [nameSuggestion, setNameSuggestion] = React.useState('')

  React.useEffect(() => {
    setNameSuggestion(generateRandomStackName())
  }, [])

  handleStep(async () => {
    const isValid = await form.trigger()
    if (isValid) {
      onStateChange(form.getValues())
      // return Promise.resolve()
    } else {
      return Promise.reject('Invalid form')
    }
  })

  const handleNameSuggestionClick = () => {
    form.setValue('name', nameSuggestion)
    setNameSuggestion(generateRandomStackName())
  }

  const projectTypesValue = form.watch('projectTypes')
  const projectTypesInvalid = form.getFieldState('projectTypes').invalid
  const projectTypesErrorMessage =
    form.getFieldState('projectTypes').error?.message

  return (
    <div className="my-12">
      <FancyStepTitle>Let's start with the basics</FancyStepTitle>
      <form>
        <div className="max-w-screen-lg flex flex-col gap-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  variant="bordered"
                  label="Stack name"
                  labelPlacement="outside"
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <p className="text-tiny text-default-500 md:self-center md:mt-6">
              Need inspiration? How about{' '}
              <span
                onClick={handleNameSuggestionClick}
                className="cursor-pointer text-secondary"
              >
                {nameSuggestion}
              </span>
              ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={cn(
                'border px-1 py-2 rounded-large border-default-200',
                projectTypesInvalid && 'border-medium border-danger'
              )}
            >
              <p className="text-small text-default-500 p-2">Project types</p>
              <ScrollShadow className="max-h-[300px]">
                <Controller
                  name="projectTypes"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Listbox
                      aria-label="Project type"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="multiple"
                      selectedKeys={field.value}
                      onSelectionChange={(keys) =>
                        field.onChange(Array.from(keys) as ProjectType[])
                      }
                      classNames={{
                        list: 'max-h-[300px] overflow-scroll'
                      }}
                    >
                      {projectTypes.map((type) => (
                        <ListboxItem key={type}>{type}</ListboxItem>
                      ))}
                    </Listbox>
                  )}
                />
              </ScrollShadow>
              {projectTypesErrorMessage && (
                <p className="text-tiny text-danger">
                  {form.getFieldState('projectTypes').error?.message}
                </p>
              )}
            </div>
            <div className="text-small flex items-center gap-2 flex-wrap self-start">
              {projectTypesValue.map((v) => (
                <Chip key={v} size="sm" color="secondary" variant="bordered">
                  {v}
                </Chip>
              ))}
            </div>
          </div>
          <Controller
            name="sourceCodeUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                label="Source code URL"
                labelPlacement="outside"
                variant="bordered"
              />
            )}
          />

          <Controller
            name="websiteUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                label="Website"
                labelPlacement="outside"
                variant="bordered"
              />
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Textarea
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                value={field.value}
                onChange={field.onChange}
                placeholder="Describe your stack"
                variant="bordered"
              />
            )}
          />
        </div>
      </form>
    </div>
  )
}
