import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

export default (() => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>© {year} Devansh Mahajan</p>
        <ul>
          <li>
            <a href="https://devanshmahajan.pages.dev">Website</a>
          </li>
          <li>
            <a href="https://github.com/Devansh-Mahajan">GitHub</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/devansh-mahajan-2b2b99185/">LinkedIn</a>
          </li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
