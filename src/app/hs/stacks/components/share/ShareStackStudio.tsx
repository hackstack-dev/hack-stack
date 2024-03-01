import Flow from '@/app/hs/stacks/components/blocks/Flow'
import {
  BackgroundProps,
  BackgroundVariant,
  type Node,
  useNodesState
} from 'reactflow'
import { Stack } from '~/convex/types'
import React from 'react'
import { ButtonGroup, Divider, ScrollShadow } from '@nextui-org/react'
import { getDetailsNode } from '@/app/hs/stacks/components/share/ShareStack.utils'
import DetailsControls from '@/app/hs/stacks/components/share/controls/DetailsControls'
import BlockControls from '@/app/hs/stacks/components/share/controls/BlockControls'
import CanvasControls from '@/app/hs/stacks/components/share/controls/CanvasControls'
import { Button } from '@nextui-org/button'
import { toPng, toSvg, toJpeg } from 'html-to-image'
import { useTheme } from 'next-themes'
import GroupControls from '@/app/hs/stacks/components/share/controls/GroupControls'

interface ShareStackStudioProps {
  stack: Stack
}

export default function ShareStackStudio({ stack }: ShareStackStudioProps) {
  const { theme } = useTheme()
  const exportRef = React.useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([
    getDetailsNode(stack),
    ...stack.stackBlocks.map((n) => ({
      ...n,
      type:
        n.type === 'resizeableGroupNode' ? 'customGroupNode' : 'customBlockNode'
    }))
  ] as Node[])

  const [canvasSettings, setCanvasSettings] = React.useState<BackgroundProps>({
    style: {
      background: '#000'
    },
    color: theme === 'light' ? '#1f2937' : '#8b5cf6',
    gap: 15,
    size: 1,
    variant: BackgroundVariant.Dots,
    className: 'border-1 rounded-2xl dark:border-default-100'
  })

  const handleExport = React.useCallback(
    (exportType: 'png' | 'svg' | 'jpg') => {
      if (exportRef.current === null) {
        return
      }

      const exortFunction =
        exportType === 'png' ? toPng : exportType === 'svg' ? toSvg : toJpeg
      const fileName = stack.name.replace(/\s/g, '_')
      exortFunction(exportRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `${fileName}.${exportType}`
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.error(err)
        })
    },
    [stack.name]
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 w-full">
      <ScrollShadow className="w-full h-[calc(100vh-118px)] pl-2 pr-4">
        <CanvasControls
          canvasSettings={canvasSettings}
          setCanvasSettings={setCanvasSettings}
        />
        <Divider className="my-4" />
        <DetailsControls />
        <Divider className="my-4" />
        <BlockControls />
        <Divider className="my-4" />
        <GroupControls />
      </ScrollShadow>

      <div className="flex flex-col">
        <ButtonGroup className="mb-4" variant="flat" color="primary">
          <Button onClick={() => handleExport('png')}>PNG</Button>
          <Button onClick={() => handleExport('svg')}>SVG</Button>
          <Button onClick={() => handleExport('jpg')}>JPG</Button>
        </ButtonGroup>
        <div className="grow h-full" ref={exportRef}>
          <Flow
            nodes={nodes}
            setNodes={setNodes}
            onNodesChange={onNodesChange}
            background={canvasSettings}
            viewOnly
          />
        </div>
      </div>
    </div>
  )
}
