'use client'

import Flow from '@/app/hs/stacks/components/blocks/Flow'
import { Node, useNodesState } from 'reactflow'
import FlowProvider from "@/app/hs/components/ui/FlowProvider";

const initialNodes: Node[] = [
    {
        id: 'A',
        type: 'group',
        data: { label: null },
        position: { x: 0, y: 0 },
        style: {
            width: 170,
            height: 140
        }
    },
    {
        id: 'B',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
        parentNode: 'A',
        extent: 'parent'
    },
    // {
    //     id: 'C',
    //     data: { label: 'child node 2' },
    //     position: { x: 10, y: 90 },
    //     parentNode: 'A',
    //     extent: 'parent'
    // },
    {
        id: 'D',
        type: 'output',
        position: { x: 100, y: 200 },
        data: { label: 'Node C' },
    },
]
export default function SandBox() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    return (
        <FlowProvider>
        <div className="h-full">
            <Flow nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange} />
        </div>
        </FlowProvider>
    )
}
