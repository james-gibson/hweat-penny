// GitHub Pages must not run Jekyll over this build, and must answer a deep
// miss with a page the reader can recover from. Vite copies `public/` verbatim,
// but `.nojekyll` is a dotfile and deserves an explicit write.
import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

if (!existsSync(join('dist', '404.html'))) {
  console.error('postbuild: dist/404.html is missing')
  process.exit(1)
}
writeFileSync(join('dist', '.nojekyll'), '')
console.log('postbuild: wrote dist/.nojekyll')
