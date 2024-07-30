// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CircularMultiLineChart> = (args) => {
//   return <CircularMultiLineChart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CircularMultiLineChart from './CircularMultiLineChart'

export const generated = () => {
  return <CircularMultiLineChart />
}

export default {
  title: 'Components/CircularMultiLineChart',
  component: CircularMultiLineChart,
} as ComponentMeta<typeof CircularMultiLineChart>
