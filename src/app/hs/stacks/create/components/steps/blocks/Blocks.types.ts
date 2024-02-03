import {Doc} from "~/convex/_generated/dataModel";

export type BlockNodeData = {
  id: string
  blockName: string
  tech?: Doc<'tech'>
}

export interface AddBlockProps {
  onAddBlock: (nodeData:BlockNodeData) => void
}
