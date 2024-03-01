import React from 'react'
import ControlsSection from '@/app/hs/stacks/components/share/components/ControlsSection'
import ControlsRow from '@/app/hs/stacks/components/share/components/ControlRow'
import { Slider } from '@nextui-org/react'
import ColorControl from '@/app/hs/stacks/components/share/controls/ColorControl'
import BackgroundControl from '@/app/hs/stacks/components/share/controls/BackgroundControl'
import ShadowControl from '@/app/hs/stacks/components/share/controls/ShadowControl'
import { shareStackGroupSettings } from '@/app/hs/stacks/components/share/Share.state'
import { useSnapshot } from 'valtio'

export default function GroupControls() {
  const shareGroupSettings = useSnapshot(shareStackGroupSettings)
  return (
    <ControlsSection title="Group">
      <div className="flex flex-col space-y-4 mt-4">
        <ControlsRow label="Background">
          <BackgroundControl
            onChange={(background) => {
              shareStackGroupSettings.background = background
            }}
            value={{ background: shareGroupSettings.background }}
          />
        </ControlsRow>
        <ControlsRow label="Name color">
          <ColorControl
            value={shareGroupSettings.color}
            onChange={(value) => {
              shareStackGroupSettings.color = value
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
              shareStackGroupSettings.fontSize = value as number
            }}
            value={shareGroupSettings.fontSize}
          />
        </ControlsRow>
        <ControlsRow label="Border color">
          <ColorControl
            value={shareGroupSettings.borderColor}
            onChange={(value) => {
              shareStackGroupSettings.borderColor = value
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
              shareStackGroupSettings.borderWidth = value as number
            }}
            value={shareGroupSettings.borderWidth}
          />
        </ControlsRow>
        <ControlsRow label="Border radius">
          <Slider
            size="sm"
            step={1}
            maxValue={30}
            minValue={1}
            onChange={(value) => {
              shareStackGroupSettings.borderRadius = value as number
            }}
            value={shareGroupSettings.borderRadius}
          />
        </ControlsRow>
        <ControlsRow label="Shadow">
          <ShadowControl
            value={shareGroupSettings.boxShadow}
            onChange={(value) => {
              shareStackGroupSettings.boxShadow = value
            }}
          />
        </ControlsRow>
      </div>
    </ControlsSection>
  )
}
