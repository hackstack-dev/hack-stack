import React from 'react'
import {
  ControlsProps,
  ShareStackBlockSettings
} from '@/app/hs/stacks/components/share/ShareStack.types'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'

export default function BlockControls({ setNodes }: ControlsProps) {
  const [shareBlockSettings, setShareBlockSettings] =
    React.useState<ShareStackBlockSettings>({
      background: '#ffffff',
      color: '#000000',
      fontSize: 12,
      techColor: '#fff',
      techFontSize: 16,
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 4
    })

  React.useEffect(() => {
    setNodes((nds) => {
      return nds.map((n) => {
        if (n.type !== 'stackDetailsNode') {
          return {
            ...n,
            data: {
              ...n.data,
              style: {
                background: shareBlockSettings.background,
                color: shareBlockSettings.color,
                fontSize: shareBlockSettings.fontSize,
                techColor: shareBlockSettings.techColor,
                techFontSize: shareBlockSettings.techFontSize,
                borderColor: shareBlockSettings.borderColor,
                borderWidth: shareBlockSettings.borderWidth,
                borderRadius: shareBlockSettings.borderRadius
              }
            }
          }
        }
        return n
      })
    })
  }, [shareBlockSettings, setNodes])

  return (
    <ControlsSection title="Block">
      <div className="flex flex-col space-y-4 mt-4">
        <ControlsRow label="Background color">
          <input
            type="color"
            value={shareBlockSettings.background}
            onChange={(e) =>
              setShareBlockSettings((prev) => ({
                ...prev,
                background: e.target.value
              }))
            }
          />
        </ControlsRow>
        <ControlsRow label="Font color block">
          <ColorControl
            value={shareBlockSettings.color}
            onChange={(value) => {
              setShareBlockSettings((prev) => ({
                ...prev,
                color: value
              }))
            }}
          />
        </ControlsRow>
        <ControlsRow label="Font size block">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={8}
            onChange={(value) =>
              setShareBlockSettings((prev) => ({
                ...prev,
                fontSize: value as number
              }))
            }
            value={shareBlockSettings.fontSize}
          />
        </ControlsRow>
        <ControlsRow label="Font color tech">
          <ColorControl
            value={shareBlockSettings.techColor}
            onChange={(value) => {
              setShareBlockSettings((prev) => ({
                ...prev,
                techColor: value
              }))
            }}
          />
        </ControlsRow>
        <ControlsRow label="Font size tech">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={8}
            onChange={(value) =>
              setShareBlockSettings((prev) => ({
                ...prev,
                techFontSize: value as number
              }))
            }
            value={shareBlockSettings.techFontSize}
          />
        </ControlsRow>
        <ControlsRow label="Border color">
          <ColorControl
            value={shareBlockSettings.borderColor}
            onChange={(value) => {
              setShareBlockSettings((prev) => ({
                ...prev,
                borderColor: value
              }))
            }}
          />
        </ControlsRow>
        <ControlsRow label="Border width">
          <Slider
            size="sm"
            step={1}
            maxValue={10}
            minValue={1}
            onChange={(value) =>
              setShareBlockSettings((prev) => ({
                ...prev,
                borderWidth: value as number
              }))
            }
            value={shareBlockSettings.borderWidth}
          />
        </ControlsRow>
        <ControlsRow label="Border radius">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={1}
            onChange={(value) =>
              setShareBlockSettings((prev) => ({
                ...prev,
                borderRadius: value as number
              }))
            }
            value={shareBlockSettings.borderRadius}
          />
        </ControlsRow>
      </div>
    </ControlsSection>
  )
}
