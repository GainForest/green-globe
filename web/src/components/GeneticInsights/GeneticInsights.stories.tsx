// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof GeneticInsights> = (args) => {
//   return <GeneticInsights {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import GeneticInsights from './GeneticInsights'

export const generated = () => {
  return <GeneticInsights />
}

export default {
  title: 'Components/GeneticInsights',
  component: GeneticInsights,
} as ComponentMeta<typeof GeneticInsights>
