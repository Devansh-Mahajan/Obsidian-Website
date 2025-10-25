import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "~/Dash",
    pageTitleSuffix: " - Devansh Mahajan",
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
      "900 Psychology",
      "100 Notes",
      "000 Goals",
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
          light: "#fcf6f0", // Warm creamy background
          lightgray: "#f6efe6", // Warmer creamy light gray
          gray: "#ede4d6", // Warmer creamy medium gray
          darkgray: "#665c54", // Warm dark gray text
          dark: "#3c3836", // Warm dark text
          secondary: "#cc241d", // Gruvbox red accent
          tertiary: "#98971a", // Gruvbox green accent
          highlight: "rgba(204, 36, 29, 0.15)", // Red highlight
          textHighlight: "#d79921", // Gruvbox yellow highlight
        },
        darkMode: {
          light: "#1a1a1a", // Dark background
          lightgray: "#2d2d2d", // Dark gray
          gray: "#404040", // Medium gray
          darkgray: "#e0e0e0", // Light text
          dark: "#cc241d", // Same Gruvbox red for both modes
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
      Plugin.Attachments(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
