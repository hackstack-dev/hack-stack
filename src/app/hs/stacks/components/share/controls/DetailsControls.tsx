import React from 'react'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider, Tab, Tabs } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'
import BackgroundControl from '@/app/hs/stacks/components/share/controls/BackgroundControl'
import ShadowControl from '@/app/hs/stacks/components/share/controls/ShadowControl'
import { shareStackDetailsSettings } from '@/app/hs/stacks/components/share/Share.state'
import { useSnapshot } from 'valtio'

export default function DetailsControls() {
  const shareDetailsSettings = useSnapshot(shareStackDetailsSettings)
  return (
    <ControlsSection title="Details">
      <ControlsRow label="Stack details">
        <Tabs
          size="sm"
          radius="full"
          selectedKey={shareDetailsSettings.showDetails ? 'show' : 'hide'}
          onSelectionChange={(key) => {
            shareStackDetailsSettings.showDetails = key === 'show'
          }}
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
                shareStackDetailsSettings.background = background
              }}
              value={{ background: shareDetailsSettings.background }}
            />
          </ControlsRow>
          <ControlsRow label="Name color">
            <ColorControl
              value={shareDetailsSettings.color}
              onChange={(value) => {
                shareStackDetailsSettings.color = value
              }}
            />
          </ControlsRow>
          <ControlsRow label="Name size">
            <Slider
              size="sm"
              step={1}
              maxValue={30}
              minValue={8}
              onChange={(value) => {
                shareStackDetailsSettings.fontSize = value as number
              }}
              value={shareDetailsSettings.fontSize}
            />
          </ControlsRow>
          <ControlsRow label="Description color">
            <ColorControl
              value={shareDetailsSettings.descriptionColor}
              onChange={(value) => {
                shareStackDetailsSettings.descriptionColor = value
              }}
            />
          </ControlsRow>
          <ControlsRow label="Description size">
            <Slider
              size="sm"
              step={1}
              maxValue={30}
              minValue={8}
              onChange={(value) => {
                shareStackDetailsSettings.descriptionFontSize = value as number
              }}
              value={shareDetailsSettings.descriptionFontSize}
            />
          </ControlsRow>
          <ControlsRow label="Border color">
            <ColorControl
              value={shareDetailsSettings.borderColor}
              onChange={(value) => {
                shareStackDetailsSettings.borderColor = value
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
                shareStackDetailsSettings.borderWidth = value as number
              }}
              value={shareDetailsSettings.borderWidth}
            />
          </ControlsRow>
          <ControlsRow label="Border radius">
            <Slider
              size="sm"
              step={1}
              maxValue={30}
              minValue={1}
              onChange={(value) => {
                shareStackDetailsSettings.borderRadius = value as number
              }}
              value={shareDetailsSettings.borderRadius}
            />
          </ControlsRow>
          <ControlsRow label="Shadow">
            <ShadowControl
              value={shareDetailsSettings.boxShadow}
              onChange={(value) => {
                shareStackDetailsSettings.boxShadow = value
              }}
            />
          </ControlsRow>
        </div>
      )}
    </ControlsSection>
  )
}
