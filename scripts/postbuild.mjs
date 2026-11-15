// GitHub Pages must not run Jekyll over this build, and must answer a deep
// miss with a page the reader can recover from. The skill is served raw so an
// agent can fetch it without a browser; Vite copies `public/` but `src/content/`
// is the single source of truth, so it is copied here.
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

if (!existsSync(join('dist', '404.html'))) {
  console.error('postbuild: dist/404.html is missing')
  process.exit(1)
}
writeFileSync(join('dist', '.nojekyll'), '')

const skill = join('src', 'content', 'skill.md')
if (!existsSync(skill)) {
  console.error('postbuild: src/content/skill.md is missing')
  process.exit(1)
}
copyFileSync(skill, join('dist', 'skill.md'))

console.log('postbuild: wrote dist/.nojekyll and dist/skill.md')
