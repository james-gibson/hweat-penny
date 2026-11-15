import { BorderBeam, CopyButton, Reveal } from 'fancy-ui-react'
import { WheatPenny } from '../components/WheatPenny'
import { useVoice } from '../lib/speak'

const BEFORE = `// v1 — a .replace() per aspirated word (32 lines, 21 forms)
function toBrian(text) {
  return text
    .replace(/Hwithout/g, 'Without')
    .replace(/hwithout/g, 'without')
    .replace(/hwritten/g, 'written')
    .replace(/hwould/g, 'would')
    .replace(/hwords/g, 'words')
    // ... and 27 more. Every new word needed a new line,
    // and two of the forms were wrong from the start.`

const AFTER = `// v2 — one rule, one lookahead
function toBrian(text) {
  return text
    .replace(/H(?=w)/g, '')   // drop the prepended h
    .replace(/h(?=w)/g, '')   // drop the prepended h
    .replace(/Kool/g, 'Cool')
    .replace(/kool/g, 'cool')
}`

const ROWS = [
  { k: 'the rule', wrong: 'two rules — a swap and a prepend, mixed', right: 'one rule: prepend "h" to every "w" word' },
  { k: 'the mapper', wrong: '32 replaces, one per word, fragile', right: 'one lookahead (h before w)' },
  { k: 'the toggle', wrong: 'JavaScript rewrote the string', right: 'CSS picks which spelling is visible' },
  { k: 'the preference', wrong: 'reinvented', right: 'le.gume motion-rung shape (stored)' },
]

export function Guide() {
  const { say } = useVoice()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#/" className="flex items-center gap-3">
            <WheatPenny size={28} />
            <span className="font-semibold tracking-tight text-cream">{say('Hwheat Penny')}</span>
            <code className="hidden font-mono text-xs text-muted/60 sm:inline">guide</code>
          </a>
          <a href="#/" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-cream">
            {say('back home')}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-line/70">
        <div className="plot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal preset="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" />
              {say('guide · the mistake')}
            </p>
          </Reveal>
          <Reveal preset="fade-up" delay={60}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
              {say('Hwat hwent hwrong')}
            </h1>
          </Reveal>
          <Reveal preset="fade-up" delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {say(
                'The first version of this site toggled its voice with a 32-line string-mapper. It was a cost centre: rework, fragile, and it reinvented a preference le.gume already solved with its rungs.',
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <Reveal preset="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-cream">
            {say('The mistake')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'I mixed two aspiration rules — a swap ("wheat" → "hweat") and a prepend ("whip" → "hwhip"). That made the reversal wrong, so Brian mode printed "whas", "whith", "whhere". The fix was a 32-line .replace() list, one line per word, which is how a spell-checker dies.',
            )}
          </p>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
          <p className="border-b border-line px-6 py-3 text-xs tracking-[0.16em] text-copper uppercase">
            {say('hwrong → right')}
          </p>
          <table className="w-full text-sm">
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.k} className="border-t border-line first:border-t-0">
                  <td className="px-6 py-3 font-mono text-cream">{row.k}</td>
                  <td className="px-6 py-3 text-muted line-through decoration-copper/40">{row.wrong}</td>
                  <td className="px-6 py-3 text-muted">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-xl border border-line bg-[#0c0a0c] p-5">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('v1 · 32 lines')}</p>
            <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-6 text-cream/90">
              <code>{BEFORE}</code>
            </pre>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-line bg-[#0c0a0c] p-5">
            <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={9} size={180} glow={0.4} />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('v2 · one rule')}</p>
              <CopyButton value={AFTER} label="Copy" copiedLabel="Copied" size="sm" />
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-[13px] leading-6 text-cream/90">
              <code>{AFTER}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="border-y border-line/70 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
          <Reveal preset="fade-up">
            <h2 className="text-2xl font-semibold tracking-tight text-cream">
              {say('Hwat it cost')}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              {say(
                'Measured, not inferred. The detour was a cost centre — rework that paid back nothing reusable.',
              )}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <Stat k={say('mapper size')} v="32 → 4" />
            <Stat k={say('rework spend')} v="≈ $0.003" />
            <Stat k={say('class')} v="cost → profit" />
          </div>

          <p className="mt-6 text-sm text-muted">
            {say(
              'The real cost was not the three-tenths of a cent. It was the shape: a list that grows with every word, instead of one rule — and the fact that le.gume had already solved "toggle a stored preference" with its rungs, and I copied neither the rung nor the CSS.',
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <Reveal preset="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-cream">
            {say('The lesson')}
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('copy')}</p>
            <p className="mt-3 text-muted">
              {say('le.gume solved "a stored preference with a default" via the seed rung ladder and useMotion(). The voice toggle is that same shape. Copy it.')}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs tracking-[0.16em] text-wheat uppercase">{say('do not reinvent')}</p>
            <p className="mt-3 text-muted">
              {say('One rule beats a list. CSS visibility beats a string rewrite. Hwhen the difference is one character, toggle the character — do not map the whole word.')}
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <WheatPenny size={22} />
            <p className="text-sm text-cream">{say('the guide — the mistake, priced')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span>AGPL-3.0-only</span>
            <a href="#/" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('home')}
            </a>
            <a href="#/isotopes/cornichon" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('the isotope')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Stat({ k, v }: { k: React.ReactNode; v: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <p className="text-xs tracking-[0.14em] text-muted uppercase">{k}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-cream">{v}</p>
    </div>
  )
}
