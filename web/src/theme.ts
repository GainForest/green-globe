import { Theme } from 'theme-ui'

export const theme: Theme = {
  breakpoints: ['320px', '480px', '768px', '992px', '1200px'],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000000',
    background: '#f5f3ef',
    secondaryBackground: '#000000', // for dropdowns, modals
    tertiaryBackground: '#000000',
    primary: '#000000',
    secondary: '#000000',
    muted: '#000000',
    hinted: '#000000',
    skeletonHighlight: '#393a3d',
    boxShadow: '#000000',
    green: '#2bce89',
    // modes: {
    // light: {
    //   text: '#1b1e23',
    //   background: '#FFFFFF',
    //   secondaryBackground: '#f5f5f5', // for dropdowns, modals
    //   tertiaryBackground: '#E8EAED',
    //   primary: '#000000',
    //   secondary: '#808080',
    //   muted: '#b9b9bb',
    //   hinted: '#f2f2f1',
    //   skeletonHighlight: '#f5f5f5',
    //   boxShadow: '#b9b9bb',
    //   green: '#2bce89',
    // },
    // dark: {
    //   text: '#ebebec',
    //   background: '#22252A',
    //   secondaryBackground: '#1E2024', // for dropdowns, modals
    //   tertiaryBackground: '#272A2F',
    //   primary: '#ebebec',
    //   secondary: '#808080',
    //   muted: '#393a3d',
    //   hinted: '#2a2c30',
    //   skeletonHighlight: '#393a3d',
    //   boxShadow: '#000000',
    //   green: '#2bce89',
    // },
    // },
  },
}
