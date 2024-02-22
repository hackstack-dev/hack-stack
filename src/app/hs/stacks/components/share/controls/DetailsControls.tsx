import React from 'react'
import {
  ControlsProps,
  ShareStackDetailsSettings
} from '@/app/hs/stacks/components/share/ShareStack.types'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider, Tab, Tabs } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'
import BackgroundControl from '@/app/hs/stacks/components/share/controls/BackgroundControl'
import ShadowControl from '@/app/hs/stacks/components/share/controls/ShadowControl'

export default function DetailsControls({ setNodes }: ControlsProps) {
  const [shareDetailsSettings, setShareDetailsSettings] =
    React.useState<ShareStackDetailsSettings>({
      showDetails: true,
      background: '#ffffff',
      color: '#000000',
      fontSize: 16,
      descriptionColor: '#000000',
      descriptionFontSize: 12,
      borderColor: '#000000',
      borderWidth: 1,
      borderRadius: 4,
      boxShadow: 'unset'
    })

  React.useEffect(() => {
    setNodes((nds) => {
      return nds.map((n) => {
        if (n.type === 'stackDetailsNode') {
          return {
            ...n,
            data: {
              ...n.data,
              show: shareDetailsSettings.showDetails,
              style: {
                background: shareDetailsSettings.background,
                color: shareDetailsSettings.color,
                fontSize: shareDetailsSettings.fontSize,
                descriptionColor: shareDetailsSettings.descriptionColor,
                descriptionFontSize: shareDetailsSettings.descriptionFontSize,
                borderColor: shareDetailsSettings.borderColor,
                borderWidth: shareDetailsSettings.borderWidth,
                borderRadius: shareDetailsSettings.borderRadius,
                boxShadow: shareDetailsSettings.boxShadow
              }
            }
          }
        }
        return n
      })
    })
  }, [shareDetailsSettings, setNodes])

  return (
    <ControlsSection title="Details">
      <ControlsRow label="Stack details">
        <Tabs
          size="sm"
          radius="full"
          selectedKey={shareDetailsSettings.showDetails ? 'show' : 'hide'}
          onSelectionChange={(key) =>
            setShareDetailsSettings((prev) => ({
              ...prev,
              showDetails: key === 'show'
            }))
          }
        >
          <Tab key="show" title="Show" />
          <Tab key="hide" title="Hide" />
        </Tabs>
      </ControlsRow>
      {shareDetailsSettings.showDetails && (
        <div className="flex flex-col space-y-4 mt-4">
          <ControlsRow label="Background">
            <BackgroundControl
              onChange={(background) => {
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  background
                }))
              }}
              value={{ background: shareDetailsSettings.background }}
            />
          </ControlsRow>
          <ControlsRow label="Name color">
            <ColorControl
              value={shareDetailsSettings.color}
              onChange={(value) => {
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  color: value
                }))
              }}
            />
          </ControlsRow>
          <ControlsRow label="Name size">
            <Slider
              size="sm"
              step={1}
              maxValue={30}
              minValue={8}
              onChange={(value) =>
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  fontSize: value as number
                }))
              }
              value={shareDetailsSettings.fontSize}
            />
          </ControlsRow>
          <ControlsRow label="Description color">
            <ColorControl
              value={shareDetailsSettings.descriptionColor}
              onChange={(value) => {
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  descriptionColor: value
                }))
              }}
            />
          </ControlsRow>
          <ControlsRow label="Description size">
            <Slider
              size="sm"
              step={1}
              maxValue={30}
              minValue={8}
              onChange={(value) =>
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  descriptionFontSize: value as number
                }))
              }
              value={shareDetailsSettings.descriptionFontSize}
            />
          </ControlsRow>
          <ControlsRow label="Border color">
            <ColorControl
              value={shareDetailsSettings.borderColor}
              onChange={(value) => {
                setShareDetailsSettings((prev) => ({
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
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  borderWidth: value as number
                }))
              }
              value={shareDetailsSettings.borderWidth}
            />
          </ControlsRow>
          <ControlsRow label="Border radius">
            <Slider
              size="sm"
              step={1}
              maxValue={30}
              minValue={1}
              onChange={(value) =>
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  borderRadius: value as number
                }))
              }
              value={shareDetailsSettings.borderRadius}
            />
          </ControlsRow>
          <ControlsRow label="Shadow">
            <ShadowControl
              value={shareDetailsSettings.boxShadow}
              onChange={(value) => {
                setShareDetailsSettings((prev) => ({
                  ...prev,
                  boxShadow: value
                }))
              }}
            />
          </ControlsRow>
        </div>
      )}
    </ControlsSection>
  )
}
