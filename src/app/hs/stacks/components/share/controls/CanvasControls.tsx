import React from 'react'
import { CanvasControlsProps } from '@/app/hs/stacks/components/share/ShareStack.types'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider, Tab, Tabs } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'
import { BackgroundVariant } from 'reactflow'

export default function CanvasControls({
  canvasSettings,
  setCanvasSettings
}: CanvasControlsProps) {
  return (
    <ControlsSection title="Canvas">
      <div className="flex flex-col space-y-4 mt-4">
        <ControlsRow label="Pattern">
          <Tabs
            size="sm"
            radius="full"
            selectedKey={canvasSettings.variant}
            onSelectionChange={(key) =>
              setCanvasSettings((prev) => ({
                ...prev,
                variant: key as BackgroundVariant
              }))
            }
          >
            <Tab key={BackgroundVariant.Dots} title="Dots" />
            <Tab key={BackgroundVariant.Lines} title="Lines" />
            <Tab key={BackgroundVariant.Cross} title="Cross" />
          </Tabs>
        </ControlsRow>
        <ControlsRow label="Pattern color">
          <ColorControl
            value={canvasSettings.color}
            onChange={(value) => {
              setCanvasSettings((prev) => ({
                ...prev,
                color: value
              }))
            }}
          />
        </ControlsRow>
        <ControlsRow label="Pattern size">
          <Slider
            size="sm"
            step={0.5}
            maxValue={20}
            minValue={1}
            onChange={(value) =>
              setCanvasSettings((prev) => ({
                ...prev,
                size: value as number
              }))
            }
            value={canvasSettings.size}
          />
        </ControlsRow>
        <ControlsRow label="Pattern Gap">
          <Slider
            size="sm"
            step={0.5}
            maxValue={50}
            minValue={5}
            onChange={(value) =>
              setCanvasSettings((prev) => ({
                ...prev,
                gap: value as number
              }))
            }
            value={canvasSettings.gap}
          />
        </ControlsRow>
      </div>
    </ControlsSection>
  )
}
