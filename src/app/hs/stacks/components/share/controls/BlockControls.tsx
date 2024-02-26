import React from 'react'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider, Tab, Tabs } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'
import BackgroundControl from '@/app/hs/stacks/components/share/controls/BackgroundControl'
import ShadowControl from '@/app/hs/stacks/components/share/controls/ShadowControl'
import { useSnapshot } from 'valtio'
import { shareStackBlockSettings } from '@/app/hs/stacks/components/share/Share.state'

export default function BlockControls() {
  const shareBlockSettings = useSnapshot(shareStackBlockSettings)

  return (
    <ControlsSection title="Block">
      <div className="flex flex-col space-y-4 mt-4">
        <ControlsRow label="Block size">
          <Tabs
            size="sm"
            radius="full"
            selectedKey={shareBlockSettings.blockSize}
            onSelectionChange={(key) => {
              shareStackBlockSettings.blockSize = key as string
            }}
          >
            <Tab key="default" title="Default" />
            <Tab key="compact" title="Compact" />
          </Tabs>
        </ControlsRow>
        <ControlsRow label="Background">
          <BackgroundControl
            value={{ background: shareBlockSettings.background }}
            onChange={(background) => {
              shareStackBlockSettings.background = background
            }}
          />
        </ControlsRow>
        <ControlsRow label="Font color block">
          <ColorControl
            value={shareBlockSettings.color}
            onChange={(value) => {
              shareStackBlockSettings.color = value
            }}
          />
        </ControlsRow>
        <ControlsRow label="Font size block">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={8}
            onChange={(value) => {
              shareStackBlockSettings.fontSize = value as number
            }}
            value={shareBlockSettings.fontSize}
          />
        </ControlsRow>
        <ControlsRow label="Font color tech">
          <ColorControl
            value={shareBlockSettings.techColor}
            onChange={(value) => {
              shareStackBlockSettings.techColor = value
            }}
          />
        </ControlsRow>
        <ControlsRow label="Font size tech">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={8}
            onChange={(value) => {
              shareStackBlockSettings.techFontSize = value as number
            }}
            value={shareBlockSettings.techFontSize}
          />
        </ControlsRow>
        <ControlsRow label="Border color">
          <ColorControl
            value={shareBlockSettings.borderColor}
            onChange={(value) => {
              shareStackBlockSettings.borderColor = value
            }}
          />
        </ControlsRow>
        <ControlsRow label="Border width">
          <Slider
            size="sm"
            step={1}
            maxValue={10}
            minValue={0}
            onChange={(value) => {
              shareStackBlockSettings.borderWidth = value as number
            }}
            value={shareBlockSettings.borderWidth}
          />
        </ControlsRow>
        <ControlsRow label="Border radius">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={1}
            onChange={(value) => {
              shareStackBlockSettings.borderRadius = value as number
            }}
            value={shareBlockSettings.borderRadius}
          />
        </ControlsRow>
        <ControlsRow label="Shadow">
          <ShadowControl
            value={shareBlockSettings.boxShadow}
            onChange={(value) => {
              shareStackBlockSettings.boxShadow = value
            }}
          />
        </ControlsRow>
      </div>
    </ControlsSection>
  )
}
