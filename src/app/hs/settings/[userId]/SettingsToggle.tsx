import { Switch } from '@nextui-org/react'

interface UserSettingsToggleProps {
  value: boolean
  onChange: (value: boolean) => void
  label: string
  description: string
}
export default function SettingsToggle({
  value,
  onChange,
  label,
  description
}: UserSettingsToggleProps) {
  return (
    <div className="p-4 bg-default-100 rounded-large flex justify-between">
      <div className="flex flex-col">
        <h3 className="text-medium">{label}</h3>
        <p className="text-xs text-default-500">{description}</p>
      </div>
      <Switch size="sm" onValueChange={onChange} isSelected={value} />
    </div>
  )
}
