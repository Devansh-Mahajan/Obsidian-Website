import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import { Argv } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"

const filesToCopy = async (argv: Argv, cfg: QuartzConfig) => {
  // Look specifically for attachments folder and process its contents
  const attachmentsPattern = "998 Attachements/**"
  return await glob(attachmentsPattern, argv.directory, ["**/*.md"])
}

const copyFile = async (argv: Argv, fp: FilePath) => {
  const src = joinSegments(argv.directory, fp) as FilePath
  
  // Remove the "998 Attachements/" prefix and create a clean path
  const cleanPath = fp.replace(/^998 Attachements\//, "attachments/")
  const name = slugifyFilePath(cleanPath as FilePath)
  const dest = joinSegments(argv.output, name) as FilePath

  // ensure dir exists
  const dir = path.dirname(dest) as FilePath
  await fs.promises.mkdir(dir, { recursive: true })

  await fs.promises.copyFile(src, dest)
  return dest
}

export const Attachments: QuartzEmitterPlugin = () => {
  return {
    name: "Attachments",
    async *emit({ argv, cfg }) {
      const fps = await filesToCopy(argv, cfg)
      for (const fp of fps) {
        yield copyFile(argv, fp)
      }
    },
    async *partialEmit(ctx, _content, _resources, changeEvents) {
      for (const changeEvent of changeEvents) {
        const ext = path.extname(changeEvent.path)
        if (ext === ".md") continue

        // Only process files in the attachments folder
        if (!changeEvent.path.startsWith("998 Attachements/")) continue

        if (changeEvent.type === "add" || changeEvent.type === "change") {
          yield copyFile(ctx.argv, changeEvent.path)
        } else if (changeEvent.type === "delete") {
          const cleanPath = changeEvent.path.replace(/^998 Attachements\//, "attachments/")
          const name = slugifyFilePath(cleanPath as FilePath)
          const dest = joinSegments(ctx.argv.output, name) as FilePath
          await fs.promises.unlink(dest)
        }
      }
    },
  }
}
