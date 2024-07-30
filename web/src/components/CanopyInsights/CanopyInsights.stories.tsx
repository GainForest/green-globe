// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CanopyInsights> = (args) => {
//   return <CanopyInsights {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CanopyInsights from './CanopyInsights'

export const generated = () => {
  return <CanopyInsights />
}

export default {
  title: 'Components/CanopyInsights',
  component: CanopyInsights,
} as ComponentMeta<typeof CanopyInsights>
