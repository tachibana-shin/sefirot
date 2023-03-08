import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Sefirot',
  description: 'Vue Components for Global Brain Design System.',

  cleanUrls: 'without-subfolders',
  lastUpdated: true,

  vite: {
    resolve: {
      alias: {
        'sefirot/': new URL('../../lib/', import.meta.url).pathname
      }
    }
  },

  themeConfig: {
    outline: [2, 3],

    editLink: {
      pattern: 'https://github.com/globalbrain/sefirot/edit/main/docs/:path'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/globalbrain/sefirot' }
    ],

    sidebar: {
      '/': sidebar(),
      'components': sidebar()
    }
  }
})

function sidebar() {
  return [
    {
      text: 'Styles',
      items: [
        { text: 'Colors', link: '/styles/colors' },
        { text: 'Shared Input Styles', link: '/styles/input-styles' }
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'SAvatar', link: '/components/avatar' },
        { text: 'SButton', link: '/components/button' },
        { text: 'SButtonGroup', link: '/components/button-group' },
        { text: 'SInputAddon', link: '/components/input-addon' },
        { text: 'SInputCheckbox', link: '/components/input-checkbox' },
        { text: 'SInputCheckboxes', link: '/components/input-checkboxes' },
        { text: 'SInputFile', link: '/components/input-file' },
        { text: 'SInputHMS', link: '/components/input-hms' },
        { text: 'SInputNumber', link: '/components/input-number' },
        { text: 'SInputRadios', link: '/components/input-radios' },
        { text: 'SInputSelect', link: '/components/input-select' },
        { text: 'SInputSwitch', link: '/components/input-switch' },
        { text: 'SInputTextarea', link: '/components/input-textarea' },
        { text: 'SInputYMD', link: '/components/input-ymd' },
        { text: 'SPill', link: '/components/pill' },
        { text: 'STable', link: '/components/table' },
        { text: 'STooltip', link: '/components/tooltip' }
      ]
    },
    {
      text: 'Composables',
      items: [
        { text: 'Utils', link: '/composables/utils' }
      ]
    },
    {
      text: 'Validation',
      items: [
        { text: 'Validators', link: '/validation/validators' }
      ]
    },
    {
      text: 'Support',
      items: [
        { text: 'Day', link: '/support/day' },
        { text: 'File', link: '/support/file' },
        { text: 'Num', link: '/support/num' },
        { text: 'Time', link: '/support/time' },
        { text: 'Utils', link: '/support/utils' }
      ]
    }
  ]
}
