import { useEffect, useState, type ReactNode } from 'react'
import {
  BorderBeam,
  Button,
  CopyButton,
  GradientButton,
  Marquee,
  NumberTicker,
  RainbowButton,
  Reveal,
} from 'fancy-ui-react'
import { WheatPenny } from './components/WheatPenny'
import updateCost from './data/update-cost.json'
import { VoiceProvider, useVoice } from './lib/speak'
import { Isotope } from './pages/Isotope'
import { Skill } from './pages/Skill'
import { Guide } from './pages/Guide'
import { Pitch } from './pages/Pitch'

const SOURCE = 'https://github.com/james-gibson/hweat-penny'
const LEGUME = 'https://james-gibson.github.io/le.gume/'

const ROTATION_CMD = 'python3 scripts/lab/rotation.py --since 60'

/** The three hwords, in order. */
const CHAIN = [
  {
    name: 'isotope',
    desc: 'The intent. One named, minimal answer a plane will verify — kb.search.regex, repos.list, a publish-guard check.',
    href: '#spend',
    cta: 'the name, not the number',
    icon: 'i',
  },
  {
    name: 'rotation',
    desc: 'One verified answer to one isotope. The mirror records it and mints a rotation id: r000006.',
    href: '#spend',
    cta: 'the hwheel turns',
    icon: 'r',
  },
  {
    name: 'penny',
    desc: 'One rotation. Nominal — nothing can be bought with it. That is hwhy it travels between planes unchanged.',
    href: '#spend',
    cta: 'the numeraire',
    icon: 'p',
  },
]

const TOOLS = [
  { code: 'syn', name: 'Synapse MCP', desc: 'Indexed the vault (repo_id: kb). Searched through the mirror — repos.list, search.regex.' },
  { code: 'ok', name: 'OpenKnowledge', desc: 'Owns the vault markdown. The bytes this page quotes live in files it keeps.' },
  { code: 'mirror', name: 'the mirror', desc: '127.0.0.1:8587. Mints rotation ids (r000006) and logs one per verified answer.' },
  { code: 'rotation.py', name: 'rotation.py', desc: 'Read the mirror log, joined spend to rotations, priced a penny in pennies.' },
  { code: 'cost.py', name: 'cost.py', desc: 'Read opencode.db, read-only: 34,827 messages, $77.07, $0.0022 a message.' },
  { code: 'penny.py', name: 'penny.py', desc: 'Broke one publish loop into its rotations: 22 checks, 63 fail() sites, ≥63 a loop.' },
  { code: 'qdrant', name: 'Qdrant', desc: 'Indexes le.gume content (repo: legume). An offline reader of the repo, not a runtime dependency.' },
  { code: 'adhd', name: 'ADHD', desc: 'A lab service (dev.kb.adhd.plist) that keeps the rest of the lab honest about itself.' },
  { code: 'db', name: 'opencode.db', desc: 'The spend ledger, SQLite, read-only. Every message carries cost and tokens in its JSON.' },
  { code: 'seed', name: 'le.gume seed', desc: 'The stack this page copied: React + Vite + Tailwind v4 + fancy-ui, shipped to Pages.' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function App() {
  return (
    <VoiceProvider>
      <Router />
    </VoiceProvider>
  )
}

/** A two-route SPA on the hash. No server, no router dependency, no prerender. */
function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function Router() {
  const path = useHashRoute().replace(/^#/, '') || '/'
  if (path === '/guide') return <Guide />
  if (path === '/skill') return <Skill />
  if (path === '/pitch') return <Pitch />
  if (path.startsWith('/isotopes/')) return <Isotope />
  return <Site />
}

function Site() {
  const { say, voice, toggle, witness, toggleWitness } = useVoice()

  const facts = [
    { k: 'mirror rotations', v: 6 },
    { k: 'ledger gap', v: 1 },
    { k: 'per publish loop', v: 63 },
    { k: 'per rotation, ceiling', v: 62 },
  ]

  return (
    <div className="min-h-screen">
      <Header say={say} voice={voice} toggle={toggle} witness={witness} toggleWitness={toggleWitness} />

      {witness === 'unverified' && (
        <section className="border-b border-line/70 bg-surface-2">
          <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="rounded-full border border-copper-deep bg-copper/10 px-3 py-1 font-mono text-xs text-copper">
                unverified
              </span>
              <p className="text-sm text-muted">
                {say('An unverified penny rotation is: copy the existing site and claim it as the answer. No witness.')}
              </p>
            </div>
            <p className="mt-2 text-xs text-muted/70">
              {say('Stewie doesn’t want a witness. Brian doesn’t care.')}
            </p>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="plot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal preset="fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                {say('kool hwhip, but for pennies')}
              </p>
            </Reveal>

            <Reveal preset="fade-up" delay={60}>
              <h1 className="mt-6 text-5xl leading-[1.02] font-semibold tracking-tight text-cream sm:text-7xl">
                {say('The Hwheat')}
                <br />
                <span className="text-copper">{say('Penny')}</span>
              </h1>
            </Reveal>

            <Reveal preset="fade-up" delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                {say(
                  'One penny. One rotation. It rolled all the way here — and it counted every single time.',
                )}
              </p>
            </Reveal>

            <Reveal preset="fade-up" delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <RainbowButton href="#spend">
                  {say('Spend a penny')}
                </RainbowButton>
                <GradientButton onClick={() => scrollTo('ledger')}>
                  {say('Read the ledger')}
                </GradientButton>
              </div>
            </Reveal>

            <p className="mt-6 text-xs text-muted/70">
              {say('a wheat penny is a one-cent piece, 1909–1958; a penny here is one rotation.')}
            </p>
          </div>

          <Reveal preset="fade-up" delay={140}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
              <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={9} size={220} glow={0.5} />
              <div className="grid place-items-center">
                <div className="animate-penny-spin">
                  <WheatPenny size={230} />
                </div>
                <p className="mt-7 font-mono text-5xl font-semibold tracking-tight text-cream">
                  <NumberTicker value={63} />
                </p>
                <p className="mt-2 text-xs tracking-[0.16em] text-muted uppercase">
                  {witness === 'verified'
                    ? say('rotations, at least — one publish loop')
                    : say('rotations, claimed — no witness')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------- rolling pennies marquee */}
      <MarqueeSection say={say} />

      {/* ------------------------------------------------------------ hwhat? */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20" id="hwhat">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8">
            <BorderBeam colorFrom="#b87333" colorTo="#d99a55" duration={7} size={180} glow={0.4} />
            <WheatPenny size={280} className="mx-auto" />
          </div>
          <div>
            <Reveal preset="fade-up">
              <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the coin')}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
                {say('Hwhat is a hwheat penny?')}
              </h2>
            </Reveal>
            <Reveal preset="fade-up" delay={60}>
              <div className="mt-5 space-y-4 text-muted">
                <p>
                  {say(
                    'A hwheat penny is a one-cent piece minted from 1909 to 1958, with two stalks of hwheat on the back — hence the name. Copper, small, worth exactly one cent.',
                  )}
                </p>
                <p>
                  {say(
                    'In this lab it is also a unit of account. A penny is one rotation. A rotation is one verified answer to one isotope. Hwhen you spend a penny, you spend one turn of the hwheel — and the hwheel counts every turn.',
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- spend */}
      <section className="border-y border-line/70 bg-surface/30" id="spend">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal preset="fade-up">
            <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the economics')}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
              {say('Spending an isotope penny')}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              {say('Three hwords, in order. The ratio between isotopes is the hwhole argument.')}
            </p>
          </Reveal>

          <Reveal preset="fade-up" delay={60} className="mt-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {CHAIN.map((step) => (
                <div key={step.name} className="rounded-xl border border-line bg-surface p-5">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-md border border-line bg-surface-2 font-mono text-xs text-copper">
                      {step.icon}
                    </span>
                    <p className="text-sm font-medium text-cream">{say(step.name)}</p>
                  </div>
                  <p className="mt-3 text-sm text-muted">{say(step.desc)}</p>
                  <p className="mt-2 text-xs text-copper">{say(step.cta)}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('cost centre')}</p>
              <p className="mt-2 font-mono text-3xl font-semibold text-cream">3.2p</p>
              <p className="mt-2 text-sm text-muted">
                {say('expensive per verified answer. Hwhat an intent costs hwhen it does not pay for its own reuse.')}
              </p>
            </Card>
            <Card>
              <p className="text-xs tracking-[0.16em] text-wheat uppercase">{say('profit centre')}</p>
              <p className="mt-2 font-mono text-3xl font-semibold text-cream">0.4p</p>
              <p className="mt-2 text-sm text-muted">
                {say('cheap per verified answer, and paid back by reuse. The multiple travels hwhere the dollar figure does not.')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- ledger */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20" id="ledger">
        <Reveal preset="fade-up">
          <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the roll count')}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
            {say('How many times did it roll on its way here?')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say('The ledger says, and the ledger is honest about hwhat it does not know.')}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {facts.map((fact) => (
            <Card key={fact.k}>
              <p className="font-mono text-4xl font-semibold text-cream">
                <NumberTicker value={fact.v} />
              </p>
              <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">{fact.k}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the mirror ledger')}</p>
            <p className="mt-3 text-muted">
              {say(
                'r000001 … r000006 — six recorded rotations, hwith one gap: r000002 hwas minted but never landed. r000003 appears twice, a stutter. The mirror only advances an id after its line lands, so a gap is a finding, not a shrug.',
              )}
            </p>
            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="text-left text-muted/70">
                  <th className="pb-2 font-medium">{say('isotope')}</th>
                  <th className="pb-2 font-medium">{say('rotations')}</th>
                </tr>
              </thead>
              <tbody className="font-mono text-cream">
                <tr className="border-t border-line">
                  <td className="py-2">repos.list</td>
                  <td className="py-2">6</td>
                </tr>
                <tr className="border-t border-line">
                  <td className="py-2">search.regex</td>
                  <td className="py-2">3</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card>
            <p className="text-xs tracking-[0.16em] text-wheat uppercase">
              {witness === 'verified' ? say('the witness') : say('no witness')}
            </p>
            {witness === 'verified' ? (
              <>
                <p className="mt-3 text-muted">
                  {say(
                    'One publish loop is the witness a plane hwill happily pay a penny for: local, deterministic, no model spend. It runs 22 checks across 63 fail() sites in 3.9 seconds — at least 63 rotations a loop, at most 62 milliseconds each.',
                  )}
                </p>
                <p className="mt-3 text-sm text-muted/80">
                  {say('63 is a floor, not a count. The loop is sterile: a clean run names none of its 22 checks.')}
                </p>
              </>
            ) : (
              <p className="mt-3 text-muted">
                {say('An unverified penny rotation is: copy the existing site and claim it as the answer. No loop ran, no check failed, nothing hwas measured.')}
              </p>
            )}
          </Card>
        </div>

        <p className="mt-6 text-sm text-muted">
          {say(
            'So, on its way here, it rolled at least 63 times through the loop that built its own seed template, and 6 more through the mirror that serves this vault — skipping r000002 and stuttering on r000003.',
          )}
        </p>
        <p className="mt-4 text-sm">
          <a
            href="#/isotopes/cornichon"
            className="text-copper underline decoration-copper/30 underline-offset-4 hover:decoration-copper"
          >
            {say('Read the live count on the isotope →')}
          </a>
        </p>
      </section>

      {/* ------------------------------------------------------- update cost */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20" id="update">
        <Reveal preset="fade-up">
          <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the update bill')}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
            {say('What one update costs, seed by seed')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'A seed pays for an update in rotations, not hours. Count hwhat a cycle can verify — the guard\u2019s checks, the contrast pairs, the doom and a11y rules — and the clock barely moves. The price of an update is hwhat it can prove.',
            )}
          </p>
        </Reveal>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted/70">
                <th className="pb-2 font-medium">{say('seed')}</th>
                <th className="pb-2 font-medium">{say('role')}</th>
                <th className="pb-2 text-right font-medium">{say('checks')}</th>
                <th className="pb-2 text-right font-medium">{say('sites')}</th>
                <th className="pb-2 text-right font-medium">{say('pairs')}</th>
                <th className="pb-2 text-right font-medium">{say('doom')}</th>
                <th className="pb-2 text-right font-medium">{say('a11y')}</th>
                <th className="pb-2 text-right font-medium">{say('shells')}</th>
                <th className="pb-2 text-right font-medium">{say('seconds')}</th>
                <th className="pb-2 text-right font-medium">{say('rotations')}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-cream">
              {updateCost.seeds.map((row) => (
                <tr key={row.seed} className="border-t border-line">
                  <td className="py-2">{row.seed}</td>
                  <td className="py-2 text-muted">{row.role}</td>
                  <td className="py-2 text-right">{row.checks}</td>
                  <td className="py-2 text-right">{row.sites}</td>
                  <td className="py-2 text-right">{row.pairs}</td>
                  <td className="py-2 text-right">{row.doom}</td>
                  <td className="py-2 text-right">{row.a11y}</td>
                  <td className="py-2 text-right">{row.shells}</td>
                  <td className="py-2 text-right">{row.seconds.toFixed(1)}</td>
                  <td className="py-2 text-right">{row.rotations}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {updateCost.notes.map((note) => (
            <Card key={note}>
              <p className="text-sm text-muted">{say(note)}</p>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted/80">
          {say(
            `Measured ${updateCost.measuredAt}. ${updateCost.method} The record each seed publishes is at its own /rotations.json.`,
          )}
        </p>
      </section>

      {/* ------------------------------------------------------------- tools */}
      <section className="border-y border-line/70 bg-surface/30" id="tools">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal preset="fade-up">
            <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the receipts')}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
              {say('Show off your tools')}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              {say('This page hwas not hwritten from memory. It read the lab, and it kept the receipts.')}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool) => (
              <div key={tool.code} className="rounded-xl border border-line bg-surface p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-surface-2 font-mono text-xs text-copper">
                    {tool.code.slice(0, 3)}
                  </span>
                  <p className="text-sm font-medium text-cream">{say(tool.name)}</p>
                </div>
                <p className="mt-3 text-sm text-muted">{say(tool.desc)}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-8 overflow-hidden rounded-xl border border-line bg-[#0c0a0c] p-5">
            <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={11} size={200} glow={0.4} />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('copied straight from the scripts')}</p>
              <CopyButton value={ROTATION_CMD} label="Copy" copiedLabel="Copied" size="sm" />
            </div>
            <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-6 text-cream/90">
              <code>{`$ ${ROTATION_CMD}
rotation economics  (9 rotations, $77.07 recorded, 60s buckets)
  a penny has no price in this window: no spend landed on a rotation
  ledger: 6 records, 1 GAP(S) — first r000002

$ python3 scripts/lab/penny.py --run-file scripts/lab/fixtures/penny/legume-loop.txt --seconds 3.9
  1 loop = 1 penny whole, or ≥63 by rotation
  3.9s per loop ⇒ ≤62ms per rotation`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ third party */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20" id="third-party">
        <Reveal preset="fade-up">
          <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the punchline')}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
            {say('The third-party agent')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'Hwithout these tools, a third-party agent hwould have to rebuild the hwhole lab from scratch to recreate this page — hwhich is hwhere the price of a penny goes really, really high.',
            )}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="text-xs tracking-[0.16em] text-wheat uppercase">{say('hwith the tools')}</p>
            <p className="mt-3 font-mono text-4xl font-semibold text-cream">≤62ms</p>
            <p className="mt-2 text-sm text-muted">
              {say('per rotation, and ≈ $0.000 of model spend. The witness is local; the mirror is local; the ledger is one read-only script away. A profit centre.')}
            </p>
          </Card>

          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6">
            <BorderBeam colorFrom="#b87333" colorTo="#e2a35c" duration={6} size={180} glow={0.6} />
            <ThirdPartyPrice say={say} />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted/80">
          {say(
            'The honest caveat: the mirror’s rotations are unpriced, not free, and the witness floor is a floor, not a count. Hwhat the third-party agent pays is model spend to rediscover hwhat the tools already knew.',
          )}
        </p>
      </section>

      {/* ------------------------------------------------------------- footer */}
      <footer className="border-t border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <WheatPenny size={22} />
            <p className="text-sm text-cream">{say('Hwheat Penny — one penny, one rotation.')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span>AGPL-3.0-only</span>
            <a href={LEGUME} className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('from the le.gume seed template')}
            </a>
            <a href={SOURCE} className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('source')}
            </a>
            <a href="#/isotopes/cornichon" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('the isotope: cornichon')}
            </a>
            <a href="#/skill" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('the skill')}
            </a>
            <a href="#/guide" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('the guide')}
            </a>
            <a href="#/pitch" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('the pitch')}
            </a>
            <span className="font-mono">r000006</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Header({
  say,
  voice,
  toggle,
  witness,
  toggleWitness,
}: {
  say: (t: string) => ReactNode
  voice: 'stewie' | 'brian'
  toggle: () => void
  witness: 'verified' | 'unverified'
  toggleWitness: () => void
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#" className="flex items-center gap-3">
          <WheatPenny size={28} />
          <span className="font-semibold tracking-tight text-cream">{say('Hwheat Penny')}</span>
          <code className="hidden font-mono text-xs text-muted/60 sm:inline">koolqhwhip</code>
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={toggleWitness}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-cream"
            aria-pressed={witness === 'unverified'}
            title={witness === 'verified' ? "Stewie doesn't want a witness" : "Brian doesn't care"}
          >
            {witness === 'verified' ? say('witness: on') : say('witness: off')}
          </button>
          <button
            onClick={toggle}
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-cream"
            aria-pressed={voice === 'brian'}
          >
            {voice === 'stewie' ? say('say it like Brian') : say('say it like Stewie')}
          </button>
        </div>
      </div>
    </header>
  )
}

function MarqueeSection({ say }: { say: (t: string) => ReactNode }) {
  const phrases = [
    'hwheat penny',
    'kool hwhip',
    'one penny = one rotation',
    '≥63 a loop',
    'r000006',
    'unpriced ≠ free',
  ]
  return (
    <section className="overflow-hidden border-b border-line/70 bg-surface/40 py-6">
      <Marquee repeat={3} speed={0.8} fade pauseOnHover>
        {phrases.map((phrase) => (
          <span
            key={phrase}
            className="mx-6 flex items-center gap-2 text-xs tracking-[0.24em] text-muted/70 uppercase"
          >
            <WheatPenny size={18} className="animate-penny-spin" />
            {say(phrase)}
          </span>
        ))}
      </Marquee>
    </section>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-line bg-surface p-6">{children}</div>
}

function ThirdPartyPrice({ say }: { say: (t: string) => ReactNode }) {
  const [pos, setPos] = useState(0)
  const multiple = Math.round(63 * Math.pow(1.16, pos))
  const label =
    pos < 33 ? say('at par') : pos < 66 ? say('getting steep') : pos < 95 ? say('really high') : say('really, really high')

  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('hwithout them')}</p>
      <p className="mt-3 font-mono text-4xl font-semibold text-copper">
        <NumberTicker value={multiple} />
        <span className="ml-1 text-2xl text-muted">p</span>
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="how high?"
        className="mt-6 w-full accent-[#d99a55]"
      />
      <p className="mt-2 text-xs text-muted/70">{say('how high? drag it — a penny priced hwithout the tools.')}</p>
    </div>
  )
}
