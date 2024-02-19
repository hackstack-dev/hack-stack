import { LucideLayers3 } from 'lucide-react'

export default function BackOfficePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <LucideLayers3 size={90} strokeWidth={1} />
        <h1 className="text-lg">HackStack Back Office</h1>
      </div>
    </div>
  )
}
