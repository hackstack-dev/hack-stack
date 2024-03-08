import { useSnapshot } from 'valtio'
import {
  LucideExpand,
  LucideMagnet,
  LucideMoveHorizontal,
  LucideMoveVertical,
  LucideShrink,
  LucideSparkles,
  LucideWorkflow
} from 'lucide-react'
import { Button } from '@nextui-org/button'
import { Tab, Tabs, Tooltip } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import {
  compactMode,
  connectionsLineType,
  connectionsOrientation,
  enableConnectionAnimation,
  enableConnections,
  snapToGridEnabled
} from '@/app/hs/stacks/components/blocks/Blocks.state'
import { ConnectionLineType } from 'reactflow'

interface BlocksToolbarProps {
  publishConnectionsConfigChange?: () => void
  onLineTypeChange?: (lineType: ConnectionLineType) => void
  onAnimatedChange?: (animated: boolean) => void
  viewOnly?: boolean
}
export default function BlocksToolbar({
  publishConnectionsConfigChange,
  onLineTypeChange,
  onAnimatedChange,
  viewOnly
}: BlocksToolbarProps) {
  const { theme } = useTheme()
  const isCompactMode = useSnapshot(compactMode)
  const snapToGrid = useSnapshot(snapToGridEnabled)
  const withConnections = useSnapshot(enableConnections)
  const connOrientation = useSnapshot(connectionsOrientation)
  const lineType = useSnapshot(connectionsLineType)
  const connectionAnimation = useSnapshot(enableConnectionAnimation)

  const activeColor = theme === 'dark' ? 'primary' : 'secondary'
  return (
    <div className="absolute right-4 top-4 z-10 bg-white dark:bg-black flex items-center flex-row-reverse gap-2 p-1 border-1 border-default-100 rounded-large">
      <Tooltip size="sm" content={'Compact mode'}>
        <Button
          onClick={() => {
            compactMode.value = !isCompactMode.value
          }}
          size="sm"
          radius="md"
          color={isCompactMode.value ? activeColor : 'default'}
          variant={isCompactMode.value ? 'flat' : 'light'}
          isIconOnly
        >
          {isCompactMode.value ? (
            <LucideExpand size={18} />
          ) : (
            <LucideShrink size={18} />
          )}
        </Button>
      </Tooltip>
      <Tooltip size="sm" content={'Snap to grid'}>
        <Button
          onClick={() => {
            snapToGridEnabled.value = !snapToGrid.value
          }}
          size="sm"
          radius="md"
          color={snapToGrid.value ? activeColor : 'default'}
          variant={snapToGrid.value ? 'flat' : 'light'}
          isIconOnly
        >
          <LucideMagnet size={18} strokeWidth={1.5} />
        </Button>
      </Tooltip>
      {!viewOnly && (
        <>
          <Tooltip size="sm" content={'Enable connections'}>
            <Button
              onClick={() => {
                enableConnections.value = !withConnections.value
                publishConnectionsConfigChange?.()
              }}
              size="sm"
              radius="md"
              color={withConnections.value ? activeColor : 'default'}
              variant={withConnections.value ? 'flat' : 'light'}
              isIconOnly
            >
              <LucideWorkflow size={18} strokeWidth={1.5} />
            </Button>
          </Tooltip>
          {withConnections.value && (
            <div className="flex items-center flex-row-reverse gap-1">
              <div className="bg-white dark:bg-black flex items-center gap-2">
                <Tabs
                  size="sm"
                  variant="light"
                  radius="lg"
                  selectedKey={lineType.value}
                  onSelectionChange={(key) => {
                    const lineType = key as ConnectionLineType
                    connectionsLineType.value = lineType
                    onLineTypeChange?.(lineType)
                  }}
                >
                  <Tab key={ConnectionLineType.Step} title="Step" />
                  <Tab key={ConnectionLineType.SmoothStep} title="Smooth" />
                  <Tab key={ConnectionLineType.Straight} title="Straight" />
                  <Tab key={ConnectionLineType.Bezier} title="Simple" />
                </Tabs>
                <Tooltip size="sm" content={'Animated'}>
                  <Button
                    onClick={() => {
                      const animated = !connectionAnimation.value
                      enableConnectionAnimation.value = animated
                      onAnimatedChange?.(animated)
                    }}
                    size="sm"
                    radius="md"
                    color={connectionAnimation.value ? activeColor : 'default'}
                    variant={connectionAnimation.value ? 'flat' : 'light'}
                    isIconOnly
                  >
                    <LucideSparkles size={18} strokeWidth={1.5} />
                  </Button>
                </Tooltip>
                <Tooltip size="sm" content={'Orientation'}>
                  <Button
                    onClick={() => {
                      connectionsOrientation.value =
                        connOrientation.value === 'vertical'
                          ? 'horizontal'
                          : 'vertical'
                      publishConnectionsConfigChange?.()
                    }}
                    size="sm"
                    radius="md"
                    color={activeColor}
                    variant="flat"
                    isIconOnly
                  >
                    {connOrientation.value === 'vertical' ? (
                      <LucideMoveVertical size={18} />
                    ) : (
                      <LucideMoveHorizontal size={18} />
                    )}
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
