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

// The measured update bill is published as data, not only as prose: the page
// renders this same file, so the table and the JSON cannot disagree.
const updateCost = join('src', 'data', 'update-cost.json')
if (!existsSync(updateCost)) {
  console.error('postbuild: src/data/update-cost.json is missing')
  process.exit(1)
}
copyFileSync(updateCost, join('dist', 'update-cost.json'))

console.log('postbuild: wrote dist/.nojekyll, dist/skill.md and dist/update-cost.json')
