import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Dash's Study Notes",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://devansh-mahajan.github.io/Obsidian-Website",
    ignorePatterns: [
      "private",
      "templates",
      ".obsidian",
      "999 Templates",
      "998 Images",
      "900 Todo",
      "600 Links",
      "400 Day Notes",
      "100 Notes",
      "000 Index",
      "Blog",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "JetBrains Mono",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff", // Clean white background
          lightgray: "#f5f5f5", // Light gray
          gray: "#e0e0e0", // Medium gray
          darkgray: "#666666", // Dark gray text
          dark: "#333333", // Dark text
          secondary: "#666666", // Simple gray accent
          tertiary: "#888888", // Light gray accent
          highlight: "rgba(102, 102, 102, 0.15)", // Gray highlight
          textHighlight: "#999999", // Light gray highlight
        },
        darkMode: {
          light: "#1a1a1a", // Dark background
          lightgray: "#2d2d2d", // Dark gray
          gray: "#404040", // Medium gray
          darkgray: "#e0e0e0", // Light text
          dark: "#ffffff", // White text
          secondary: "#ff6b6b", // Red accent
          tertiary: "#ffa726", // Orange accent
          highlight: "rgba(255, 107, 107, 0.15)", // Red highlight
          textHighlight: "#fff3cd", // Light yellow highlight
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
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
