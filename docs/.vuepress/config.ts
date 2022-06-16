import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { sidebarEn } from "./configs";
import { navbarEn } from "./configs";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  // base URL
  base: "/",

  //language and other basic information of the website
  lang: "en-US",
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  title: "Stakater App Agility Platform Documentation",
  description: "Stakater App Agility Platform Documentation", //TODO: Add user/search friendly description. abaziz

  theme: defaultTheme({
    sidebar: sidebarEn,
    navbar: navbarEn,
  }),

  //plugins: [searchPlugin()],
});
