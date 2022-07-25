import { defineUserConfig } from '@vuepress/cli' 
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { head, navbarEn, sidebarEn } from './configs'

const isProd = process.env.NODE_ENV === 'production'

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

    lastUpdated: !isProd,
    contributors: !isProd,
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
      // only enable git plugin in production mode
      git: !isProd,
    },
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
    }),
    googleAnalyticsPlugin({
      id: 'G-TTH1YYW5TX',
    })
  ],
})
