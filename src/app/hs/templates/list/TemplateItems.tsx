import React from 'react'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { useRouter } from 'next/navigation'
import { Doc } from '~/convex/_generated/dataModel'
import UserAvatar from '@/app/hs/components/ui/UserAvatar'
import EmptyData from '@/app/hs/components/ui/EmptyData'
import { Divider } from '@nextui-org/react'
import { Chip } from '@nextui-org/chip'
import PublicPrivateIndication from '@/app/hs/components/ui/PublicPrivateIndication'

interface TemplateItemsProps {
  items: (Doc<'templates'> | null)[]
}
export default function TemplateItems({ items }: TemplateItemsProps) {
  const router = useRouter()

  if (items.length === 0) {
    return <EmptyData />
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items?.map((template) => {
        if (!template) return null
        const templateUrl = `/hs/templates/${template._id}`
        return (
          <Card
            key={template._id}
            isPressable
            onPress={() => router.push(templateUrl)}
          >
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserAvatar userId={template.userId} />
                <h3 className="text-md">{template.name}</h3>
              </div>
              <PublicPrivateIndication isPublic={template.isPublic} />
            </CardHeader>
            <Divider />
            <CardBody>
              <p className="text-xs font-light text-default-500">
                {template.description}
              </p>
              {template.blocks.length > 0 && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  {template.blocks.map((block) => (
                    <Chip
                      key={block._id}
                      size="sm"
                      color="secondary"
                      variant="bordered"
                    >
                      {block.data.blockName}
                    </Chip>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}
