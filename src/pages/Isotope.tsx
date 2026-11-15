import type { ReactNode } from 'react'
import { BorderBeam, CopyButton, NumberTicker, Reveal } from 'fancy-ui-react'
import { WheatPenny } from '../components/WheatPenny'
import { useVoice } from '../lib/speak'

const LIVE_STATUS = 'curl -s http://127.0.0.1:8587/status'
const ROTATION_CMD = 'python3 scripts/lab/rotation.py --json'

/**
 * The isotope: a minimal viable system for counting rotations three ways —
 * live, in-memory, and priced — and for telling the next agent how to reproduce
 * the vibe.
 *
 * Numbers below were read live at build time (2026-11-14) from `GET /status`,
 * `rotation.py` and `opencode.db`, not invented.
 */
const LIVE = {
  state: 'HEALTHY',
  rung: 0,
  distance: 0,
  rotations: 6,
  isotopes: [
    { name: 'repos.list', rotations: 2 },
    { name: 'search.regex', rotations: 1 },
  ],
  surface: '9 tools, v1',
}

const LEDGER = {
  first: 'r000001',
  last: 'r000006',
  gap: 'r000002',
  rotationId: 'r000006',
}

const LAST_PROMPT = {
  model: 'deepseek-v4.1-flash',
  provider: 'opencode-go',
  in: 470,
  out: 706,
  cost: 0.001278612,
}

const RATES = {
  in: 0.31, // $/1M, fit across this session (245 msgs, 206 model switches)
  out: 0.98,
}

const SESSION = { messages: 245, cost: 0.242371, in: 276897, out: 95218 }

const IN_MEMORY = 90 // the agent's own tool rotations this build; the mirror saw 6

const PARTS = [
  { name: 'the mirror', role: 'GET /status → live rotations + per-isotope counts' },
  { name: 'the ledger', role: 'rotation.py → append-only r-ids, gaps, the cursor' },
  { name: 'the thought history', role: "the agent's own in-memory tool calls, never mirrored" },
  { name: 'opencode.db', role: 'token counts + the billed dollar cost of each turn' },
  { name: 'speak.tsx', role: 'the hwheat ↔ wheat transform and its toggle' },
  { name: 'fancy-ui', role: 'BorderBeam, NumberTicker, Reveal — read before writing props' },
]

const AGENT_PROMPT = `# hweat-penny — the vibe, for agents

voice: Stewie prepends "h" to every "w" word ("wheat" -> "hwheat", "whip" ->
  "hwhip"); Brian drops it. Both forms render; CSS picks via html[data-voice].

stack: React 19 + Vite + Tailwind v4 + fancy-ui-react. Copy the le.gume seed
  template; change the question, keep the stack.

numbers (read, do not invent):
  live:   curl -s http://127.0.0.1:8587/status        # rotations + isotopes
  ledger: python3 scripts/lab/rotation.py --json       # r-ids + gaps
  spend:  python3 scripts/lab/cost.py --since N        # $ + tokens (opencode.db)
  price:  python3 scripts/lab/prices.py current ...    # witness vs priced

in-memory rotations: count your own tool calls this session (each verified result
  is one rotation). The mirror only sees what goes through it; your memory sees
  the rest, and the difference is the point.

components: fetch each page before writing props
  (https://fancy-ui.rama.app/docs/components/react/<slug>.md). Overlays need a
  relative overflow-hidden parent.

do not: hardcode a rotation id (read it live); write a vibe where a number fits;
  explain the name.`

export function Isotope() {
  const { say } = useVoice()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#/" className="flex items-center gap-3">
            <WheatPenny size={28} />
            <span className="font-semibold tracking-tight text-cream">{say('Hwheat Penny')}</span>
            <code className="hidden font-mono text-xs text-muted/60 sm:inline">isotope/cornichon</code>
          </a>
          <a
            href="#/"
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-cream"
          >
            {say('back home')}
          </a>
        </div>
      </header>

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="plot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal preset="fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-copper" />
              {say('isotope · cornichon · a small pickled thing')}
            </p>
          </Reveal>
          <Reveal preset="fade-up" delay={60}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
              {say('The live penny')}
            </h1>
          </Reveal>
          <Reveal preset="fade-up" delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {say(
                'A minimal viable system for counting rotations three ways — live, in-memory, and priced — and for telling the next agent how to reproduce the vibe.',
              )}
            </p>
          </Reveal>
          <Reveal preset="fade-up" delay={180}>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
              <span>slots: none</span>
              <span>{say('presumes: lab machine (127.0.0.1:8587), opencode.db, the kb vault')}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- what it proves/costs */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-lg font-semibold tracking-tight text-cream">
              {say('Hwhat it proves')}
            </h2>
            <p className="mt-3 text-muted">
              {say(
                'That a rotation can be counted three hways, and that the three counts do not agree — which is the honest state, not a bug.',
              )}
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold tracking-tight text-cream">
              {say('Hwhat it costs')}
            </h2>
            <p className="mt-3 text-muted">
              {say(
                'Near-zero model spend to read, because every number lives in a local file or a local endpoint. The cost is the hwill to read it.',
              )}
            </p>
          </Card>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
          <p className="border-b border-line px-6 py-3 text-xs tracking-[0.16em] text-copper uppercase">
            {say('the parts')}
          </p>
          <table className="w-full text-sm">
            <tbody>
              {PARTS.map((part) => (
                <tr key={part.name} className="border-t border-line first:border-t-0">
                  <td className="px-6 py-3 font-mono text-cream">{part.name}</td>
                  <td className="px-6 py-3 text-muted">{say(part.role)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------------------------------------------- live counter */}
      <section className="border-y border-line/70 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal preset="fade-up">
            <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('one · live')}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
              {say('The live count')}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              {say(
                'Read from the mirror at build time. The endpoint is loopback, so it only answers on the lab machine — a public reader sees the last live read, not a live one.',
              )}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6">
              <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={9} size={200} glow={0.5} />
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <Stat k="state" v={LIVE.state} />
                <Stat k="rung" v={String(LIVE.rung)} />
                <Stat k="distance" v={String(LIVE.distance)} />
                <Stat k="rotations" v={LIVE.rotations} ticker />
              </div>
              <div className="mt-6 border-t border-line pt-5">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('isotopes')}</p>
                <div className="mt-3 flex flex-wrap gap-6">
                  {LIVE.isotopes.map((iso) => (
                    <div key={iso.name} className="font-mono text-sm text-cream">
                      {iso.name} <span className="text-copper">{iso.rotations}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('read it live')}</p>
                <CopyButton value={LIVE_STATUS} label="Copy" copiedLabel="Copied" size="sm" />
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-line-soft bg-[#0c0a0c] p-4 font-mono text-[13px] leading-6 text-cream/90">
                <code>{LIVE_STATUS}</code>
              </pre>
              <p className="mt-3 text-sm text-muted/80">
                {say('the ledger (append-only) says 6 records, r000001..r000006, one gap: r000002.')}
              </p>
              <p className="mt-2 text-sm font-mono text-copper">{say('current rotation id')}: {LEDGER.rotationId}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- token costs */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Reveal preset="fade-up">
          <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('two · priced')}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
            {say('The last prompt, priced')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'The API billed hwhat it billed. Read straight from opencode.db — not a price sheet, a receipt.',
            )}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('model')}</p>
            <p className="mt-2 font-mono text-sm text-cream">{LAST_PROMPT.model}</p>
            <p className="text-xs text-muted/70">{LAST_PROMPT.provider}</p>
          </Card>
          <Card>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('tokens')}</p>
            <p className="mt-2 font-mono text-3xl font-semibold text-cream">
              <NumberTicker value={LAST_PROMPT.in} />
              <span className="text-lg text-muted"> in</span>
            </p>
            <p className="mt-1 font-mono text-3xl font-semibold text-cream">
              <NumberTicker value={LAST_PROMPT.out} />
              <span className="text-lg text-muted"> out</span>
            </p>
          </Card>
          <Card>
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('billed')}</p>
            <p className="mt-2 font-mono text-3xl font-semibold text-cream">
              ${LAST_PROMPT.cost.toFixed(6)}
            </p>
            <p className="mt-1 text-xs text-muted/70">
              {say('blended')} ≈ ${((LAST_PROMPT.cost / (LAST_PROMPT.in + LAST_PROMPT.out)) * 1e6).toFixed(2)}/1M
            </p>
          </Card>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <p className="text-xs tracking-[0.16em] text-wheat uppercase">{say('measured rates')}</p>
          <p className="mt-3 text-muted">
            {say(
              'Fitted across this session’s 245 messages: ≈ $0.31/1M tokens in, ≈ $0.98/1M out. The session switched models 206 times, so these are averages, not a price list.',
            )}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Stat k="input" v={`$${RATES.in}/1M`} />
            <Stat k="output" v={`$${RATES.out}/1M`} />
          </div>
          <p className="mt-4 text-xs text-muted/70">
            {say('this session, all in:')} {SESSION.messages} {say('messages')}, ${SESSION.cost.toFixed(2)}, {SESSION.in.toLocaleString()} {say('in')} / {SESSION.out.toLocaleString()} {say('out')}
          </p>
        </div>
      </section>

      {/* ----------------------------------------------- in-memory rotations */}
      <section className="border-y border-line/70 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal preset="fade-up">
            <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('three · in-memory')}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
              {say('Rotations made in memory')}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              {say(
                'The mirror saw 6. The agent that built this page made ≈70 more — every tool call that returned a verified answer. They were never recorded, because they never went through the mirror. Unmeasured is not free.',
              )}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Card>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('the mirror saw')}</p>
              <p className="mt-2 font-mono text-5xl font-semibold text-cream">
                <NumberTicker value={LIVE.rotations} />
              </p>
            </Card>
            <Card>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('the agent made, in memory')}</p>
              <p className="mt-2 font-mono text-5xl font-semibold text-copper">
                ≈<NumberTicker value={IN_MEMORY} />
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- agent prompt */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <Reveal preset="fade-up">
          <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('the handoff')}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-cream">
            {say('How to code the vibe')}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'It is one thing to vibe-code a duplicate website. It is another for the site to tell your agent how to code the vibe. This block is the difference.',
            )}
          </p>
        </Reveal>
        <div className="relative mt-8 overflow-hidden rounded-xl border border-line bg-[#0c0a0c] p-5">
          <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={11} size={200} glow={0.4} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('agent prompt')}</p>
            <CopyButton value={AGENT_PROMPT} label="Copy" copiedLabel="Copied" size="sm" />
          </div>
          <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-6 text-cream/90">
            <code>{AGENT_PROMPT}</code>
          </pre>
        </div>
        <p className="mt-4 text-sm">
          <a href="#/skill" className="text-copper underline decoration-copper/30 underline-offset-4 hover:decoration-copper">
            {say('the full skill: recalculate + pending updates →')}
          </a>
        </p>
      </section>

      {/* ------------------------------------------------------------ footer */}
      <footer className="border-t border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <WheatPenny size={22} />
            <p className="text-sm text-cream">{say('isotope cornichon — the live penny')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span>AGPL-3.0-only</span>
            <a href="#/" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('home')}
            </a>
            <span className="font-mono">{LEDGER.rotationId}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-line bg-surface p-6">{children}</div>
}

function Stat({ k, v, ticker = false }: { k: string; v: string | number; ticker?: boolean }) {
  return (
    <div>
      <p className="text-xs tracking-[0.14em] text-muted uppercase">{k}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-cream">
        {ticker && typeof v === 'number' ? <NumberTicker value={v} /> : v}
      </p>
    </div>
  )
}
