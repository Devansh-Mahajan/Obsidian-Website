import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="site-lockup" aria-label={`${title} home`}>
        <span class="site-mark">DM</span>
        <span class="site-wordmark">
          <span>{title}</span>
          <small>ETH Zurich / EECS</small>
        </span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  font-family: var(--titleFont);
}

.page-title .site-lockup {
  display: grid;
  grid-template-columns: 2.45rem minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  color: var(--dark);
  background: transparent;
  line-height: 1.1;
}

.page-title .site-mark {
  display: grid;
  place-items: center;
  width: 2.45rem;
  height: 2.45rem;
  border: 1px solid var(--gray);
  border-radius: 8px;
  background: var(--light);
  color: var(--secondary);
  font-size: 0.8rem;
  font-weight: 700;
}

.page-title .site-wordmark {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.page-title .site-wordmark > span {
  overflow-wrap: normal;
  color: var(--dark);
  font-size: 1.15rem;
  font-weight: 700;
}

.page-title small {
  color: var(--darkgray);
  font-family: var(--bodyFont);
  font-size: 0.72rem;
  font-weight: 500;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
