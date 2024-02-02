export type BlockNodeData = {
  id: string
  label: string
}

export interface AddBlockProps {
  onAddBlock: (nodeData:BlockNodeData) => void
}
