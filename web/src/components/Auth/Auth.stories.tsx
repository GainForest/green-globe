// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Auth> = (args) => {
//   return <Auth {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Auth from './Auth'

export const generated = () => {
  return <Auth />
}

export default {
  title: 'Components/Auth',
  component: Auth,
} as ComponentMeta<typeof Auth>
