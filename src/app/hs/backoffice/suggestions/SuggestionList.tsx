'use client'

import { useAction, useQuery } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Divider, Spinner, Switch } from '@nextui-org/react'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { colorMap } from '@/app/lib/utils'
import { Chip } from '@nextui-org/chip'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import { Button } from '@nextui-org/button'
import { LucideCheck, LucideTrash } from 'lucide-react'
import SuggestionListRow from '@/app/hs/backoffice/suggestions/SuggestionListRow'
import { Image } from '@nextui-org/image'
import { Id } from '~/convex/_generated/dataModel'
import { toast } from 'sonner'

export default function SuggestionList() {
  const [showPending, setShowPending] = React.useState(true)
  const suggestions = useQuery(api.suggestions.getSuggestions, {})
  const categories = useQuery(api.categories.getCategories, {})
  const blocks = useQuery(api.blocks.getAllBlocks, {})
  const [approving, setApproving] = React.useState('')
  const approveSuggestion = useAction(api.suggestions.approveSuggestion)

  const handleApprove = async (suggestionId: Id<'suggestions'>) => {
    setApproving(suggestionId)
    try {
      await approveSuggestion({ suggestionId })
      toast.success('Suggestion approved')
    } catch (error) {
      console.error(error)
      toast.error('Problem approving suggestion')
    } finally {
      setApproving('')
    }
  }
  return (
    <>
      {!suggestions && (
        <div className="mt-24 flex flex-col items-center">
          <Spinner />
        </div>
      )}
      <div className="my-6">
        <Switch
          size="sm"
          isSelected={showPending}
          onValueChange={setShowPending}
        >
          {showPending ? 'Pending approvals' : 'Approved suggestions'}
        </Switch>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions
          ?.filter((s) => s.approved !== showPending)
          .map((suggestion) => {
            const category = categories?.find(
              (c) => c._id === suggestion.category
            )
            const block = blocks?.find((b) => b._id === suggestion.blockId)
            return (
              <Card key={suggestion._id}>
                <CardHeader className="flex items-center justify-between">
                  <Chip variant="bordered" color={colorMap[suggestion.type]}>
                    {suggestion.type}
                  </Chip>
                  <UserAvatar userId={suggestion.userId} withName />
                </CardHeader>
                <Divider />
                <CardBody>
                  <h2 className="text-lg font-semibold">{suggestion.name}</h2>
                  <div className="mt-6">
                    {category?.name && (
                      <SuggestionListRow
                        label="Category"
                        value={category.name}
                      />
                    )}
                    {block?.name && (
                      <SuggestionListRow label="Block" value={block.name} />
                    )}
                    {suggestion?.tags && (
                      <SuggestionListRow
                        label="Tags"
                        value={suggestion.tags.join(', ')}
                      />
                    )}
                    {suggestion?.githubUrl && (
                      <SuggestionListRow
                        label="GitHub"
                        value={suggestion.githubUrl}
                      />
                    )}
                    {suggestion?.websiteUrl && (
                      <SuggestionListRow
                        label="Website"
                        value={suggestion.websiteUrl}
                      />
                    )}
                    {suggestion?.logo && (
                      <SuggestionListRow
                        label="Logo"
                        value={
                          <Image
                            alt="tech logo"
                            src={suggestion.logo}
                            width={40}
                            height={40}
                          />
                        }
                      />
                    )}
                    <p className="text-sm text-default-400">
                      {suggestion.description}
                    </p>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex items-center justify-between">
                  {suggestion.approved ? (
                    <div className="flex items-center gap-1">
                      <LucideCheck stroke="green" />
                      Approved
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      color="success"
                      variant="flat"
                      onClick={() => handleApprove(suggestion._id)}
                      isLoading={approving === suggestion._id}
                    >
                      Approve
                    </Button>
                  )}

                  {!suggestion.approved && (
                    <Button
                      color="danger"
                      variant="light"
                      radius="full"
                      isIconOnly
                    >
                      <LucideTrash size={16} strokeWidth={2} />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
      </div>
    </>
  )
}