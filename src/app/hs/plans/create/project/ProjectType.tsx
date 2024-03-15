import {
  LucideBrainCircuit,
  LucideGamepad2,
  LucideLaptop,
  LucideMonitor,
  LucideMonitorSmartphone,
  LucideSmartphone
} from 'lucide-react'
import { Card, CardBody, CardFooter } from '@nextui-org/card'
import FancyPlanTitle from '@/app/hs/plans/create/project/FancyPlanTitle'

const projectTypes = [
  {
    name: 'Web Development',
    value: 'web',
    icon: <LucideLaptop />
  },
  {
    name: 'Mobile Development',
    value: 'mobile',
    icon: <LucideSmartphone />
  },
  {
    name: 'Cross Platform Development',
    value: 'cross_platform',
    icon: <LucideMonitorSmartphone />
  },
  {
    name: 'Desktop Development',
    value: 'desktop',
    icon: <LucideMonitor />
  },
  {
    name: 'Game Development',
    value: 'game',
    icon: <LucideGamepad2 />
  },
  {
    name: 'AI/ML Development',
    value: 'ai_ml',
    icon: <LucideBrainCircuit />
  }
]
export default function ProjectType() {
  return (
    <div className="mt-12">
      <FancyPlanTitle>What type of project are you creating?</FancyPlanTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {projectTypes.map((type) => (
          <Card
            shadow="sm"
            key={type.value}
            isPressable
            onPress={() => console.log('item pressed')}
            className="transition-all hover:bg-gradient-to-r from-fuchsia-300 to-cyan-400 hover:text-black"
          >
            <CardBody>
              <div className="flex items-center gap-3 text-sm">
                <div>{type.icon}</div>
                <div>{type.name}</div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
