import { Stack } from '~/convex/types'
import type { Node } from 'reactflow'
import { StackDetailsNodeData } from '@/app/hs/stacks/components/share/ShareStack.types'

export const getDetailsNode = (stack: Stack) => {
  const detailsNode: Node<StackDetailsNodeData> = {
    id: 'stackDetails',
    type: 'stackDetailsNode',
    position: { x: 0, y: 0 },
    data: {
      show: true,
      name: stack.name,
      description: stack?.description ?? '',
      style: {
        background: '#ffffff',
        color: '#000000',
        fontSize: 16,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 4,
        descriptionColor: '',
        descriptionFontSize: 0
      }
    }
  }
  return detailsNode
}

export const COLORS = [
  '#000000',
  '#1a1a1a',
  '#1e222f',
  '#213043',
  '#383c4a',
  '#999999',
  '#A2B1D2',
  '#FFFFFF',
  '#da4d4d',
  '#e97171',
  '#FF88AA',
  '#fdad5d',
  '#e3db2a',
  '#FFEE66',
  '#ffcc99',
  '#7e3bdf',
  '#8663ed',
  '#BD93F9',
  '#d4b8ff',
  '#79a1ff',
  '#4455BB',
  '#1e88df',
  '#1b55d9',
  '#1a3f95',
  '#1c933f',
  '#64e7a3',
  '#21d5b8',
  '#06535d'
]

export const GRADIENTS = [
  // Purple
  'linear-gradient(-45deg, #402662 0%, #8000FF 100%)',
  'linear-gradient(135deg, #6a3cc0 0%, #240573 100%)',
  'linear-gradient(to right top, #8155c6, #9e56cb, #ba55ce, #d654cf, #f053ce)',
  'linear-gradient(to right top, #7f469d, #8242aa, #833db7, #8338c4, #8233d2, #8a35da, #9336e2, #9b38ea, #af41ee, #c24af2, #d554f7, #e65ffb)',
  'linear-gradient(135deg,  rgba(171,73,222,1) 0%,rgba(73,84,222,1) 100%)',
  // Blue
  'linear-gradient(140deg, rgb(9, 171, 241), rgb(5, 105, 148), rgb(4, 84, 118), rgb(6, 119, 167))',
  'linear-gradient(to right bottom, #1cb1f2, #00a9f2, #00a0f2, #0097f1, #008def, #0086f1, #007ff2, #0078f2, #0071f6, #006afa, #0062fd, #0059ff)',
  'linear-gradient(-45deg, rgba(73,84,222,1) 0%,rgba(73,221,216,1) 100%)',
  'linear-gradient(135deg, #54D2EF 0%, #2AA6DA 100%)',
  'linear-gradient(135deg, #2AA6DA 0%, #1B7B77 100%)',
  // Green
  'linear-gradient(to right bottom, #1e737e, #186b76, #13636d, #0d5b65, #06535d)',
  'linear-gradient(140deg, rgb(165, 142, 251), rgb(65, 206, 189))',
  'linear-gradient(to right bottom, #00ffc7, #00c6a5, #148f7e, #205b55, #1e2c2b)',
  'linear-gradient(to right bottom, #2be7b5, #1edea2, #16d58f, #13cb7c, #16c268, #0db866, #04ae64, #00a462, #00976c, #008971, #007b72, #006d6d)',
  'linear-gradient(135deg, #33CC99 0%, #FFCC33 100%)',
  'linear-gradient(135deg,  rgba(73,221,216,1) 0%,rgba(25,226,115,1) 100%)',
  // Red
  'linear-gradient(135deg, #FFE174 0%, #FFBF40 100%)',
  'linear-gradient(to right bottom, #ffcc99, #f6bd83, #edad6e, #e49e59, #da8f44)',
  'linear-gradient(to right bottom, #f66283, #e45475, #d34768, #c2395b, #b12a4e, #a92246, #a1183e, #990d36, #970931, #95052b, #930226, #900020)',
  'linear-gradient(140deg, rgb(241 160 61), rgb(192 74 65),  rgb(115, 52, 52))',
  'linear-gradient(135deg, #E233FF 0%, #FF6B00 100%)',
  // Mix
  'linear-gradient(135deg, #FF0076 0%, #590FB7 100%)',
  'linear-gradient(to right bottom, #d44be1, #c945d7, #be3fcd, #b43ac3, #a934b9, #b330af, #bb2ca6, #c12a9c, #d6308f, #e73c83, #f34d77, #fb5f6d)',
  'linear-gradient(-45deg, #402662 0%, #F59ABE 100%)',
  // Light
  'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))',
  'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
  'linear-gradient(to right bottom, #82aaff, #6c88cb, #566899, #3f4969, #292d3e)',
  'linear-gradient(to right bottom, #e5e5e5, #d0cfd5, #bbbac5, #a5a6b6, #9092a7, #83869d, #777a93, #6a6f89, #646881, #5d6279, #575b71, #515569)',
  'linear-gradient(135deg, #CECED8 0%, #FFFFFF 100%)',
  'linear-gradient(to right bottom, #393939, #343435, #2f3030, #2b2b2c, #262727)'
]

export const SHADOWS = [
  { label: 'None', value: 'unset' },
  { label: 'Bottom', value: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px' },
  {
    label: 'Small',
    value:
      'rgba(0, 0, 0, 0.5) 0px 0px 5px 0px, rgba(0, 0, 0, 0.5) 0px 0px 1px 0px'
  },
  { label: 'Medium', value: 'rgb(0 0 0 / 40%) 0px 30px 55px' },
  { label: 'Large', value: 'rgba(0, 0, 0, 0.60) 0px 45px 70px 4px' },
  {
    label: '3D',
    value:
      'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
  }
]
