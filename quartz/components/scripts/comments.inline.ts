const GISCUS_ORIGIN = "https://giscus.app"

const changeTheme = (e: CustomEventMap["themechange"]) => {
  const theme = e.detail.theme
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null
  if (!iframe || !iframe.contentWindow) {
    return
  }

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: getThemeUrl(getThemeName(theme)),
        },
      },
    },
    GISCUS_ORIGIN,
  )
}

const getPreferredTheme = (): "light" | "dark" => {
  const savedTheme = document.documentElement.getAttribute("saved-theme")
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme
  }

  try {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme
    }
  } catch (error) {
    console.warn("Unable to read theme preference from localStorage", error)
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const getThemeName = (theme: string) => {
  if (theme !== "dark" && theme !== "light") {
    return theme
  }
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return theme
  }
  const darkGiscus = giscusContainer.dataset.darkTheme ?? "dark"
  const lightGiscus = giscusContainer.dataset.lightTheme ?? "light"
  return theme === "dark" ? darkGiscus : lightGiscus
}

const getThemeUrl = (theme: string) => {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return `https://giscus.app/themes/${theme}.css`
  }
  return `${giscusContainer.dataset.themeUrl ?? "https://giscus.app/themes"}/${theme}.css`
}

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

const loadGiscus = () => {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement | null
  if (!giscusContainer) {
    return false
  }

  giscusContainer.replaceChildren()

  const giscusScript = document.createElement("script")
  giscusScript.src = `${GISCUS_ORIGIN}/client.js`
  giscusScript.async = true
  giscusScript.crossOrigin = "anonymous"
  giscusScript.setAttribute("data-loading", "eager")
  giscusScript.setAttribute("data-emit-metadata", "0")
  giscusScript.setAttribute("data-repo", giscusContainer.dataset.repo)
  giscusScript.setAttribute("data-repo-id", giscusContainer.dataset.repoId)
  giscusScript.setAttribute("data-category", giscusContainer.dataset.category)
  giscusScript.setAttribute("data-category-id", giscusContainer.dataset.categoryId)
  giscusScript.setAttribute("data-mapping", giscusContainer.dataset.mapping)
  giscusScript.setAttribute("data-strict", giscusContainer.dataset.strict)
  giscusScript.setAttribute("data-reactions-enabled", giscusContainer.dataset.reactionsEnabled)
  giscusScript.setAttribute("data-input-position", giscusContainer.dataset.inputPosition)
  giscusScript.setAttribute("data-lang", giscusContainer.dataset.lang)
  const theme = getPreferredTheme()
  const giscusTheme = getThemeName(theme)
  giscusContainer.setAttribute("data-theme", giscusTheme)
  giscusScript.setAttribute("data-theme", getThemeUrl(giscusTheme))

  giscusContainer.appendChild(giscusScript)

  return true
}

document.addEventListener("nav", () => {
  if (!loadGiscus()) {
    return
  }

  document.addEventListener("themechange", changeTheme)
  window.addCleanup(() => {
    document.removeEventListener("themechange", changeTheme)
    const giscusContainer = document.querySelector(".giscus") as GiscusElement | null
    giscusContainer?.replaceChildren()
  })
})
