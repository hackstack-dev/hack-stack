import {
  BaseEdge,
  ConnectionLineType,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath
} from 'reactflow'
import { BlocksConfig } from '@/app/hs/stacks/components/blocks/Blocks.types'
import { useSnapshot } from 'valtio'
import { shareStackEdgeSettings } from '@/app/hs/stacks/components/share/Share.state'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const pathFunctions: Record<ConnectionLineType, Function> = {
  straight: getStraightPath,
  default: getBezierPath,
  smoothstep: getSmoothStepPath,
  step: getSmoothStepPath,
  simplebezier: getBezierPath
}
export default function CustomEdge(props: EdgeProps<BlocksConfig>) {
  const shareEdgeSettings = useSnapshot(shareStackEdgeSettings)

  const { data } = props
  const pathFunction = pathFunctions[data?.connectionsLineType ?? 'default']
  const [edgePath] = pathFunction(props)

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{ stroke: shareEdgeSettings.color }}
      />
    </>
  )
}
