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
        title: { name: "Inter", weights: [600, 700] },
        header: { name: "Inter", weights: [500, 600, 700] },
        body: { name: "Inter", weights: [400, 500, 600], includeItalic: true },
        code: { name: "JetBrains Mono", weights: [400, 500, 600] },
      },
      colors: {
        lightMode: {
          light: "#f7f8fb",
          lightgray: "#e7ebf2",
          gray: "#c8d0dc",
          darkgray: "#3f4a5f",
          dark: "#111827",
          secondary: "#2563eb",
          tertiary: "#0f766e",
          highlight: "rgba(37, 99, 235, 0.12)",
          textHighlight: "rgba(20, 184, 166, 0.22)",
        },
        darkMode: {
          light: "#0e1117",
          lightgray: "#1b2130",
          gray: "#354156",
          darkgray: "#d7dee9",
          dark: "#f8fafc",
          secondary: "#60a5fa",
          tertiary: "#2dd4bf",
          highlight: "rgba(96, 165, 250, 0.16)",
          textHighlight: "rgba(45, 212, 191, 0.22)",
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
