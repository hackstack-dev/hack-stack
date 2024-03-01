import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import {
  convertFileToBase64,
  getCardBackground,
  getTechLogo
} from '@/app/lib/utils'
import React from 'react'
import { Stack } from '~/convex/types'
import Upload from 'rc-upload'
import { Button } from '@nextui-org/button'
import { LucideArrowUpFromLine, LucidePencil, LucideX } from 'lucide-react'
import { useAction } from 'convex/react'
import { api } from '~/convex/_generated/api'
import { Id } from '~/convex/_generated/dataModel'
import { toast } from 'sonner'
import { Skeleton } from '@nextui-org/react'
import { EditStackSectionProps } from '@/app/hs/stacks/[stackId]/EditStack.types'

export default function EditStackCoverImage({
  stack,
  stackId
}: EditStackSectionProps) {
  const [file, setFile] = React.useState<File>()
  const [uploading, setUploading] = React.useState(false)
  const updateCoverImage = useAction(api.stack.updateStackCoverImage)

  const imgSrc = React.useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return getCardBackground(stack.coverImage)
  }, [file, stack.coverImage])

  const handleUpdateCoverImage = async () => {
    if (file) {
      try {
        setUploading(true)
        const coverImageBase64 = await convertFileToBase64(file)
        await updateCoverImage({ stackId, coverImage: coverImageBase64 })
      } catch (error) {
        toast.error('Error updating cover image')
        console.error(error)
      } finally {
        setUploading(false)
        setFile(undefined)
      }
    }
  }

  return (
    <div className="mt-8">
      <h3>Background image</h3>
      {uploading ? (
        <Card className="mt-4 h-60 w-[470px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-secondary" />
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-300" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-full rounded-lg bg-secondary-200" />
            </Skeleton>
          </div>
        </Card>
      ) : (
        <Card isFooterBlurred className="mt-4 h-60 w-[470px]">
          <CardHeader className="absolute z-10 top-1 flex items-center justify-between">
            <h4 className="text-white/90 font-medium text-lg py-1 px-3 bg-black/10 rounded-lg">
              {stack.name}
            </h4>
            <div className="flex items-center gap-3">
              {file && (
                <Button
                  onClick={handleUpdateCoverImage}
                  isLoading={uploading}
                  size="sm"
                  color="success"
                  variant="solid"
                  radius="full"
                  isIconOnly
                >
                  <LucideArrowUpFromLine size={16} />
                </Button>
              )}
              {!file && (
                <Button
                  color="primary"
                  variant="solid"
                  radius="full"
                  isIconOnly
                >
                  <Upload
                    accept=".png, .jpg, .jpeg, .webp, .avif"
                    beforeUpload={(file) => {
                      setFile(file)
                      return false
                    }}
                  >
                    <LucidePencil size={20} />
                  </Upload>
                </Button>
              )}
              {file && (
                <Button
                  onClick={() => setFile(undefined)}
                  size="sm"
                  color="danger"
                  variant="solid"
                  radius="full"
                  disabled={uploading}
                  isIconOnly
                >
                  <LucideX size={16} />
                </Button>
              )}
            </div>
          </CardHeader>

          <Image
            removeWrapper
            isZoomed
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={imgSrc}
          />

          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              {stack.stackBlocks.slice(0, 10).map((block, index) => {
                const logo = block.data.tech?.icon
                  ? getTechLogo(block.data.tech.icon, 'dark')
                  : ''
                return logo ? (
                  <Image
                    key={`${logo}-${index}`}
                    src={logo}
                    className="h-6 w-6"
                    removeWrapper
                  />
                ) : null
              })}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
