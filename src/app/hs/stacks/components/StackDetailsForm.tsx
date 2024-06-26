import { Controller, UseFormReturn } from 'react-hook-form'
import { Input, Textarea } from '@nextui-org/input'
import { cn, generateRandomStackName } from '@/app/lib/utils'
import { ScrollShadow, Switch } from '@nextui-org/react'
import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { projectTypes } from '@/app/hs/stacks/create/create.config'
import { Chip } from '@nextui-org/chip'
import React from 'react'
import { StackForm } from '@/app/hs/stacks/create/create.types'

interface StackDetailsFormProps {
  form: UseFormReturn<StackForm>
  withNameSuggestion?: boolean
}
export default function StackDetailsForm({
  form,
  withNameSuggestion = true
}: StackDetailsFormProps) {
  const [nameSuggestion, setNameSuggestion] = React.useState('')

  React.useEffect(() => {
    setNameSuggestion(generateRandomStackName())
  }, [])

  const handleNameSuggestionClick = () => {
    form.setValue('name', nameSuggestion)
    setNameSuggestion(generateRandomStackName())
  }

  const projectTypesValue = form.watch('projectTypes')
  const projectTypesInvalid = form.getFieldState('projectTypes').invalid
  const projectTypesErrorMessage =
    form.getFieldState('projectTypes').error?.message

  return (
    <form>
      <div className="max-w-screen-lg flex flex-col gap-8 mt-8">
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8',
            !withNameSuggestion && 'md:grid-cols-1'
          )}
        >
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Input
                isRequired
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
          {withNameSuggestion && (
            <p className="text-tiny text-default-500 md:self-center md:mt-6">
              Need inspiration? How about{' '}
              <span
                onClick={handleNameSuggestionClick}
                className="cursor-pointer text-secondary dark:text-primary"
              >
                {nameSuggestion}
              </span>
              ?
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={cn(
              'border px-1 py-2 rounded-large border-default-200',
              projectTypesInvalid && 'border-medium border-danger'
            )}
          >
            <p className="text-small text-default-500 p-2 after:content-['*'] after:text-danger after:ml-0.5">
              This stack is used in
            </p>
            <ScrollShadow className="max-h-[310px]">
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
                      field.onChange(Array.from(keys) as string[])
                    }
                    classNames={{
                      list: 'max-h-[300px] overflow-y-scroll overflow-x-hidden'
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
                {projectTypesErrorMessage}
              </p>
            )}
          </div>
          <div className="text-small flex items-center gap-2 flex-wrap self-start">
            {projectTypesValue.map((v) => (
              <Chip key={v} size="sm" color="primary" variant="flat">
                {v}
              </Chip>
            ))}
          </div>
        </div>
        <Controller
          name="isPublic"
          control={form.control}
          render={({ field, fieldState }) => (
            <Switch
              isSelected={field.value}
              onValueChange={field.onChange}
              classNames={{
                base: cn(
                  'inline-flex flex-row-reverse w-full max-w-lg bg-content1 hover:bg-content2 items-center',
                  'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent'
                ),
                wrapper: 'p-0 h-4 overflow-visible',
                thumb: cn(
                  'w-6 h-6 border-2 shadow-lg',
                  'group-data-[hover=true]:border-primary',
                  //selected
                  'group-data-[selected=true]:ml-6',
                  // pressed
                  'group-data-[pressed=true]:w-7',
                  'group-data-[selected]:group-data-[pressed]:ml-4'
                )
              }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Public stack</p>
                <p className="text-tiny text-default-400">
                  Your stack will be visible to everyone
                </p>
                <p className="text-tiny text-default-400">
                  You can change this later in the settings
                </p>
              </div>
            </Switch>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                description="Link to the source control repository"
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
                description="Link to the project's website or demo"
              />
            )}
          />
        </div>
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
              maxLength={500}
              description="A brief description of the stack"
            />
          )}
        />
      </div>
    </form>
  )
}
