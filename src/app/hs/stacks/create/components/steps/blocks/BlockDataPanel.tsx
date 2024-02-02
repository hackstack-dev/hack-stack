import React from 'react'
import { useOnSelectionChange } from 'reactflow'

export default function BlockDataPanel() {
  const [selectedNode, setSelectedNode] = React.useState('')
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      const selectedNodes = nodes.map((node) => node.id)
      setSelectedNode(selectedNodes[0])
    }
  })
  return (
    <div className="p-4 h-full w-full bg-default-50 border-l-1 dark:border-default-100">
      Block Data Panel
      <div className="mt-4">
        <h1 className="text-8xl">{selectedNode}</h1>
      </div>
    </div>
  )
}
