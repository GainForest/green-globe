// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CircularBarChart> = (args) => {
//   return <CircularBarChart {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CircularBarChart from './CircularBarChart'

export const generated = () => {
  return <CircularBarChart />
}

export default {
  title: 'Components/CircularBarChart',
  component: CircularBarChart,
} as ComponentMeta<typeof CircularBarChart>
