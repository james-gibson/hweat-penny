import { BorderBeam, Reveal } from 'fancy-ui-react'
import { WheatPenny } from '../components/WheatPenny'
import { useVoice } from '../lib/speak'

const REGISTER = [
  {
    risk: 'CVE-2026-123633 on bookworm',
    alt: 'HTTP/2 off',
    need: 'h2 multiplexing / performance',
    owner: 'edge owner / when a fixed package lands',
  },
  {
    risk: 'CVE-2026-123633 on bookworm',
    alt: 'source build 1.30.7',
    need: 'distro package management / unattended-upgrades provenance',
    owner: 'edge owner / when bookworm ships a fixed package',
  },
  {
    risk: 'CVE-2026-123633 on bookworm',
    alt: 'move to trixie',
    need: 'stability / ops churn',
    owner: 'platform owner / migration window',
  },
  {
    risk: 'lab.jamesgibson.co stale A record',
    alt: 'update or retire the record',
    need: 'the lab’s public reachability',
    owner: 'DNS owner / next WAN-IP change',
  },
]

const ALTERNATIVES = [
  { name: 'HTTP/2 off', price: 'one rotation to verify cve_safe; reverted on the fixed build', cost: 'the h2 need', state: 'taken' },
  { name: 'Source build 1.30.7', price: 'the build’s rotations', cost: 'package provenance', state: 'taken' },
  { name: 'Move to trixie', price: 'the migration’s rotations', cost: 'the stability need', state: 'open' },
  { name: 'Accept', price: 'the monitoring rotations', cost: 'the residual risk', state: 'open' },
]

export function Pitch() {
  const { say } = useVoice()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#/" className="flex items-center gap-3">
            <WheatPenny size={28} />
            <span className="font-semibold tracking-tight text-cream">{say('Hwheat Penny')}</span>
            <code className="hidden font-mono text-xs text-muted/60 sm:inline">pitch</code>
          </a>
          <a
            href="#/"
            className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-cream"
          >
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
              {say('pitch · the trade-off')}
            </p>
          </Reveal>
          <Reveal preset="fade-up" delay={60}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
              {say('A security trade-off is not a flag')}
            </h1>
          </Reveal>
          <Reveal preset="fade-up" delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {say(
                'It is a price in pennies and a cost in the business need the alternative removes.',
              )}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <Reveal preset="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-cream">{say('The register')}</h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'Four fields, not one. An “accepted” entry without the alternative and the counter-need is an unowned risk.',
            )}
          </p>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
          <p className="border-b border-line px-6 py-3 text-xs tracking-[0.16em] text-copper uppercase">
            {say('risk → alternative → need → owner')}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs tracking-[0.12em] text-muted uppercase">
                  <th className="px-6 py-3 font-medium">{say('risk')}</th>
                  <th className="px-6 py-3 font-medium">{say('alternative')}</th>
                  <th className="px-6 py-3 font-medium">{say('business need it counters')}</th>
                  <th className="px-6 py-3 font-medium">{say('owner / revisit')}</th>
                </tr>
              </thead>
              <tbody>
                {REGISTER.map((row) => (
                  <tr key={`${row.risk}-${row.alt}`} className="border-t border-line first:border-t-0">
                    <td className="px-6 py-4 text-cream">{row.risk}</td>
                    <td className="px-6 py-4 text-muted">{row.alt}</td>
                    <td className="px-6 py-4 text-muted">{row.need}</td>
                    <td className="px-6 py-4 text-muted">{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-line/70 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
          <Reveal preset="fade-up">
            <h2 className="text-2xl font-semibold tracking-tight text-cream">{say('Two currencies')}</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6">
              <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={9} size={180} glow={0.4} />
              <p className="text-xs tracking-[0.16em] text-copper uppercase">{say('pennies to verify')}</p>
              <p className="mt-3 text-muted">
                {say(
                  'The alternative is a proof: one rotation per verified subject. HTTP/2 off is one posture rotation for cve_safe; a migration is every vhost, route and service re-verified.',
                )}
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <p className="text-xs tracking-[0.16em] text-wheat uppercase">{say('a need to adopt')}</p>
              <p className="mt-3 text-muted">
                {say(
                  'The same alternative costs a named business need — h2 performance, stability, public reachability. The critic quotes both; it does not collapse the proof into the need.',
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <Reveal preset="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-cream">{say('The witness')}</h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'The posture loop is a witness: local, deterministic, no model spend. cert_collect plus cert_posture is one loop; each step is an isotope, each vhost a rotation. A passing loop is sterile, so the floor is stated, not the count.',
            )}
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line/70 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
          <Reveal preset="fade-up">
            <h2 className="text-2xl font-semibold tracking-tight text-cream">
              {say('The worked example')}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              {say('Bookworm had no fixed nginx. “Upgrade” was not the action; the alternatives were — and the source build skipped the distro channels:')}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ALTERNATIVES.map((a) => (
              <div key={a.name} className="rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-cream">{a.name}</h3>
                  <span className={a.state === 'taken' ? 'text-xs tracking-wider text-copper uppercase' : 'text-xs tracking-wider text-muted uppercase'}>
                    {a.state}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{a.price}</p>
                <p className="mt-2 text-sm text-muted">{a.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <Reveal preset="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight text-cream">{say('The rule')}</h2>
          <p className="mt-2 max-w-2xl text-muted">
            {say(
              'A protection is a spectrum, not a flag. The trade-off is a position on two axes: the penny cost of proving the alternative, and the business cost of adopting it. The owner decides; the critic records the price and the revisit.',
            )}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cream">
            {say('A wheat penny is still a penny in any plane. The wheat is the need the alternative costs.')}
          </p>
        </Reveal>
      </section>

      <footer className="border-t border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <WheatPenny size={22} />
            <p className="text-sm text-cream">{say('the pitch — a price in pennies')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span>AGPL-3.0-only</span>
            <a href="#/" className="underline decoration-line underline-offset-4 hover:text-cream">
              {say('home')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
