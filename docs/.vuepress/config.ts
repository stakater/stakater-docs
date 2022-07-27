import { defineUserConfig } from '@vuepress/cli' 
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { head, navbarEn, sidebarEn } from './configs'
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";
import { pwaPlugin } from "vuepress-plugin-pwa2";
import { clipboardPlugin } from 'vuepress-plugin-clipboard'

export default defineUserConfig({
  // set site base to default value
  base: '/',

  // extra tags in `<head>`
  head,

  shouldPrefetch: false,
  
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
    colorModeSwitch: true,
    colorMode: "auto",

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
      mediumZoom: false,
    },
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
    }),
    googleAnalyticsPlugin({
      id: 'G-TTH1YYW5TX',
    }),
    photoSwipePlugin({
      delay: 0,
      options: {
        loop: false,
        preload: [3,3],
        preloaderDelay: 0,
      }
    }),
    pwaPlugin({
      cacheHTML: true,
      cachePic: true,
      update: 'hint',
      maxPicSize: 1200,
    
    }),
    clipboardPlugin({
      staticIcon: true,
      delay: 0,
      backgroundTransitionColor: "var(#000000)"
    })
  ],
})
