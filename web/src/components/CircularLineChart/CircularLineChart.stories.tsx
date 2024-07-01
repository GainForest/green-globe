// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CircularLineChart> = (args) => {
//   return <CircularLineChart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CircularLineChart from './CircularLineChart'

export const generated = () => {
  return <CircularLineChart />
}

export default {
  title: 'Components/CircularLineChart',
  component: CircularLineChart,
} as ComponentMeta<typeof CircularLineChart>
