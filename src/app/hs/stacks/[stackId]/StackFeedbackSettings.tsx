import { LucideLightbulb } from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  Select,
  SelectedItems,
  Selection,
  SelectItem,
  SelectSection,
  Switch
} from '@nextui-org/react'
import { cn } from '@/app/lib/utils'
import { useMutation, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { toast } from 'sonner'
import { EditStackSectionProps } from '@/app/hs/stacks/[stackId]/EditStack.types'
import { Chip } from '@nextui-org/chip'
import { Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import React from 'react'

const generalFeedbackItems = [
  { key: 'advice', value: 'General tips or advice' },
  { key: 'possible_issues', value: 'Identified issues or concerns' },
  { key: 'cost', value: 'Cost-effectiveness' },
  { key: 'performance', value: 'Performance insights' },
  { key: 'dx', value: 'Developer experience (DX)' },
  { key: 'praise', value: 'Positive feedback or praise' },
  { key: 'security', value: 'Security considerations' },
  { key: 'stability', value: 'Stability vs. Trendiness' },
  { key: 'usability', value: 'Usability and user-friendliness' },
  { key: 'scalability', value: 'Scalability recommendations' },
  { key: 'compatibility', value: 'Compatibility with other systems' },
  { key: 'documentation', value: 'Documentation quality' },
  { key: 'user_feedback', value: 'User feedback and suggestions' },
  { key: 'innovation', value: 'Innovative ideas or features' },
  { key: 'bug_report', value: 'Bug reports' }
]
export default function StackFeedbackSettings({
  stack,
  stackId
}: EditStackSectionProps) {
  const { theme } = useTheme()
  const [focusAreas, setFocusAreas] = React.useState<Selection>(new Set([]))
  const [additionalInfo, setAdditionalInfo] = React.useState('')

  const updateStack = useMutation(api.stack.updateStack)
  const feedbackSettings = useQuery(
    api.feedbacks.getFeedbackSettingsByStackId,
    { stackId }
  )
  const saveFeedbackSettings = useMutation(api.feedbacks.saveFeedbackSettings)

  React.useEffect(() => {
    if (feedbackSettings) {
      setFocusAreas(new Set(feedbackSettings.focusAreas))
      setAdditionalInfo(feedbackSettings.additionalInfo ?? '')
    }
  }, [feedbackSettings])

  const handleFeedbackStatusChange = async (status: boolean) => {
    try {
      const updatedStack = {
        ...stack,
        isOpenForFeedbacks: status
      }
      await updateStack({ stackId, stack: updatedStack })
      toast.success('Feedbacks status changed')
    } catch (error) {
      toast.error('Error changing feedbacks status')
      console.error('Error changing feedbacks status', error)
    }
  }

  const handleSavefeedbackSettings = async () => {
    try {
      await saveFeedbackSettings({
        feedbackId: feedbackSettings?._id,
        stackId,
        focusAreas: Array.from(focusAreas) as string[],
        additionalInfo
      })

      toast.success('Feedback settings saved')
    } catch (error) {
      toast.error('Error changing feedbacks status')
      console.error('Error changing feedbacks status', error)
    }
  }
  return (
    <div className="mt-8 max-w-lg">
      <Switch
        onValueChange={handleFeedbackStatusChange}
        isSelected={stack.isOpenForFeedbacks}
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
          <p className="text-medium">Enable feedbacks</p>
          <p className="text-tiny text-default-400">
            Allow users to leave feedbacks on the stack
          </p>
        </div>
      </Switch>

      <div className="my-4 bg-secondary/10 rounded-large p-4 flex items-start gap-3">
        <LucideLightbulb
          size={24}
          stroke={theme === 'dark' ? '#facc15' : '#f59e0b'}
        />
        <div className="space-y-2 text-xs">
          <p>
            This can be a useful tool, especially if you're planning to use this
            stack in a new project or thinking about migrating in an existing
            project.
          </p>
        </div>
      </div>

      {stack.isOpenForFeedbacks && (
        <div className="mt-8">
          <h3 className="font-semibold border-b border-divider py-2">
            Feedback Guidelines
            <span className="ml-2 text-tiny text-default-400">(Optional)</span>
          </h3>
          <div className="mt-6 flex flex-col space-y-10">
            <Select
              selectedKeys={focusAreas}
              onSelectionChange={setFocusAreas}
              label="Feedback focus areas"
              labelPlacement="outside"
              variant="bordered"
              isMultiline={true}
              selectionMode="multiple"
              classNames={{
                trigger: 'min-h-unit-12 py-2'
              }}
              renderValue={(items: SelectedItems) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip
                        size="sm"
                        variant="flat"
                        color="primary"
                        key={item.key}
                      >
                        {item.textValue}
                      </Chip>
                    ))}
                  </div>
                )
              }}
            >
              <SelectSection showDivider title="General">
                {generalFeedbackItems.map((item) => (
                  <SelectItem
                    key={item.value}
                    textValue={item.value}
                    value={item.value}
                    variant="flat"
                  >
                    {item.value}
                  </SelectItem>
                ))}
              </SelectSection>
              <SelectSection showDivider title="Blocks">
                {stack.stackBlocks.map((block) => {
                  return (
                    <SelectItem
                      key={block.data.blockName}
                      textValue={block.data.blockName}
                      value={block.data.blockName}
                      variant="flat"
                    >
                      {block.data.blockName}
                    </SelectItem>
                  )
                })}
              </SelectSection>
            </Select>
            <Textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              label="Additional guidelines"
              labelPlacement="outside"
              placeholder="Add any additional guidelines"
              variant="bordered"
              maxLength={500}
            />
            <Button
              onClick={handleSavefeedbackSettings}
              color="primary"
              className="self-end"
            >
              Save Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
