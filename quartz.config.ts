import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Devansh Mahajan",
    pageTitleSuffix: " | Devansh Mahajan",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "devansh-mahajan.github.io/Obsidian-Website",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      ".github",
      "999 Templates",
      "900 Private Notes",
      "100 Notes",
      "000 Goals",
      "000 ToDo",
      "Blog",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: { name: "Newsreader", weights: [500, 600] },
        header: { name: "Newsreader", weights: [500, 600, 700] },
        body: { name: "Newsreader", weights: [400, 500], includeItalic: true },
        code: { name: "JetBrains Mono", weights: [400, 500, 600] },
      },
      colors: {
        lightMode: {
          light: "#faf7f0",
          lightgray: "#ece5d5",
          gray: "#c4b9a1",
          darkgray: "#39332a",
          dark: "#1c1811",
          secondary: "#8a3a24",
          tertiary: "#6b5a35",
          highlight: "rgba(138, 58, 36, 0.07)",
          textHighlight: "rgba(107, 90, 53, 0.22)",
        },
        darkMode: {
          light: "#161310",
          lightgray: "#241f18",
          gray: "#4a4131",
          darkgray: "#d8cfba",
          dark: "#f1ead9",
          secondary: "#d98a63",
          tertiary: "#c2a968",
          highlight: "rgba(217, 138, 99, 0.12)",
          textHighlight: "rgba(194, 169, 104, 0.22)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Attachments(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
