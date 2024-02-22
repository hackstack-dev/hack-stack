import { Select, SelectItem } from '@nextui-org/react'
import { SHADOWS } from '@/app/hs/stacks/components/share/ShareStack.utils'

interface ShadowControlProps {
  value?: string
  onChange: (value: string) => void
}
export default function ShadowControl({ value, onChange }: ShadowControlProps) {
  return (
    <Select
      size="sm"
      radius="lg"
      variant="bordered"
      labelPlacement="outside"
      value={value}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0]
        onChange(selected as string)
      }}
    >
      {SHADOWS.map((s) => (
        <SelectItem key={s.value} value={s.value}>
          {s.label}
        </SelectItem>
      ))}
    </Select>
  )
}
