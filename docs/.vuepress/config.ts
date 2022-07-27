import { defineUserConfig } from '@vuepress/cli' 
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { head, navbarEn, sidebarEn } from './configs'

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // extra tags in `<head>`
  head,

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Stakater App Agility Platform',
      description: 'SAAP Documentation',
    },
  },

  // configure default theme
  theme: defaultTheme({
    logo: '/favicon.png',
    docsDir: 'docs',

    lastUpdated: false,
    contributors: false,
    colorModeSwitch: false,
    colorMode: "light",

    // theme-level locales config
    locales: {
      '/': {
        // navbar
        navbar: navbarEn,
        // sidebar
        sidebar: sidebarEn,
      },
    },

    themePlugins: {
      git: false,
    },
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
    }),
    googleAnalyticsPlugin({
      id: 'G-49F1QHVV15',
    })
  ],
})
