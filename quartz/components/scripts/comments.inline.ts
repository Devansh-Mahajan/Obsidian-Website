const GISCUS_ORIGIN = "https://giscus.app"

type GiscusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    themeUrl: string
    lightTheme: string
    darkTheme: string
    mapping: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict: string
    reactionsEnabled: string
    inputPosition: "top" | "bottom"
    lang: string
  }
}

const getPreferredTheme = (): "light" | "dark" => {
  const savedTheme = document.documentElement.getAttribute("saved-theme")
  return savedTheme === "dark" ? "dark" : "light"
}

const getThemeName = (theme: string) => {
  const container = document.querySelector(".giscus") as GiscusElement | null
  if (!container || (theme !== "dark" && theme !== "light")) {
    return theme
  }
  return theme === "dark" ? container.dataset.darkTheme : container.dataset.lightTheme
}

const getThemeUrl = (theme: string) => {
  const container = document.querySelector(".giscus") as GiscusElement | null
  return `${container?.dataset.themeUrl ?? "https://giscus.app/themes"}/${theme}.css`
}

const changeTheme = (event: CustomEventMap["themechange"]) => {
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null
  if (!iframe?.contentWindow) {
    return
  }

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: getThemeUrl(getThemeName(event.detail.theme)),
        },
      },
    },
    GISCUS_ORIGIN,
  )
}

const loadGiscus = () => {
  const container = document.querySelector(".giscus") as GiscusElement | null
  if (!container) {
    return false
  }

  container.replaceChildren()

  const script = document.createElement("script")
  script.src = `${GISCUS_ORIGIN}/client.js`
  script.async = true
  script.crossOrigin = "anonymous"
  script.setAttribute("data-loading", "lazy")
  script.setAttribute("data-emit-metadata", "0")
  script.setAttribute("data-repo", container.dataset.repo)
  script.setAttribute("data-repo-id", container.dataset.repoId)
  script.setAttribute("data-category", container.dataset.category)
  script.setAttribute("data-category-id", container.dataset.categoryId)
  script.setAttribute("data-mapping", container.dataset.mapping)
  script.setAttribute("data-strict", container.dataset.strict)
  script.setAttribute("data-reactions-enabled", container.dataset.reactionsEnabled)
  script.setAttribute("data-input-position", container.dataset.inputPosition)
  script.setAttribute("data-lang", container.dataset.lang)

  const theme = getThemeName(getPreferredTheme())
  container.setAttribute("data-theme", theme)
  script.setAttribute("data-theme", getThemeUrl(theme))
  container.appendChild(script)

  return true
}

document.addEventListener("nav", () => {
  if (!loadGiscus()) {
    return
  }

  document.addEventListener("themechange", changeTheme)
  window.addCleanup(() => {
    document.removeEventListener("themechange", changeTheme)
    document.querySelector(".giscus")?.replaceChildren()
  })
})
