import React from 'react'
import {
  ControlsProps,
  ShareStackBlockSettings
} from '@/app/hs/stacks/components/share/ShareStack.types'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'
import { useTheme } from 'next-themes'
import BackgroundControl from '@/app/hs/stacks/components/share/controls/BackgroundControl'
import ShadowControl from '@/app/hs/stacks/components/share/controls/ShadowControl'

export default function BlockControls({ setNodes }: ControlsProps) {
  const { theme } = useTheme()
  const [shareBlockSettings, setShareBlockSettings] =
    React.useState<ShareStackBlockSettings>({
      background: theme === 'dark' ? '#111' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000',
      fontSize: 12,
      techColor: theme === 'dark' ? '#aaa' : '#ccc',
      techFontSize: 16,
      borderColor: '#8b5cf6',
      borderWidth: 2,
      borderRadius: 5,
      boxShadow: 'unset'
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
                borderRadius: shareBlockSettings.borderRadius,
                boxShadow: shareBlockSettings.boxShadow
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
        <ControlsRow label="Background">
          <BackgroundControl
            value={{ background: shareBlockSettings.background }}
            onChange={(background) => {
              setShareBlockSettings((prev) => ({
                ...prev,
                background
              }))
            }}
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
        <ControlsRow label="Shadow">
          <ShadowControl
            value={shareBlockSettings.boxShadow}
            onChange={(value) => {
              setShareBlockSettings((prev) => ({
                ...prev,
                boxShadow: value
              }))
            }}
          />
        </ControlsRow>
      </div>
    </ControlsSection>
  )
}
