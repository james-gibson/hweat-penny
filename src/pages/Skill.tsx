import { BorderBeam, CopyButton, Reveal } from 'fancy-ui-react'
import skillMd from '../content/skill.md?raw'
import { WheatPenny } from '../components/WheatPenny'
import { useVoice } from '../lib/speak'

const SKILL_PATH = `${import.meta.env.BASE_URL}skill.md`

/**
 * The skill, rendered for humans and copyable for agents. The same bytes are
 * served raw at /skill.md so an agent can fetch them without a browser.
 */
export function Skill() {
  const { say } = useVoice()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#/" className="flex items-center gap-3">
            <WheatPenny size={28} />
            <span className="font-semibold tracking-tight text-cream">{say('Hwheat Penny')}</span>
            <code className="hidden font-mono text-xs text-muted/60 sm:inline">skill</code>
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
              {say('skill · recalculate-hweat-penny')}
            </p>
          </Reveal>
          <Reveal preset="fade-up" delay={60}>
            <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
              {say('Recalculate the site, plus pending updates')}
            </h1>
          </Reveal>
          <Reveal preset="fade-up" delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              {say(
                'An agent that hits this site has no memory of the lab. This skill is the search plan that tells it what to look for — lezz.go, the mirror, the ledger scripts — and how to re-derive every number it sees.',
              )}
            </p>
          </Reveal>
          <Reveal preset="fade-up" delay={180}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CopyButton value={skillMd} label="Copy the skill" copiedLabel="Copied" size="sm" />
              <a
                href={SKILL_PATH}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs tracking-wide text-muted transition-colors hover:text-cream"
              >
                {say('raw skill.md')} →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-[#0c0a0c] p-5 sm:p-7">
          <BorderBeam colorFrom="#d99a55" colorTo="#e7c891" duration={11} size={240} glow={0.4} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">{say('the skill')}</p>
            <CopyButton value={skillMd} label="Copy" copiedLabel="Copied" size="sm" />
          </div>
          <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-6 text-cream/90">
            <code>{skillMd}</code>
          </pre>
        </div>

        <p className="mt-5 text-sm text-muted/80">
          {say('an agent can fetch this without a browser:')}{' '}
          <a href={SKILL_PATH} className="font-mono text-copper underline decoration-copper/30 underline-offset-4">
            {SKILL_PATH}
          </a>
        </p>
      </section>

      <footer className="border-t border-line/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <WheatPenny size={22} />
            <p className="text-sm text-cream">{say('the skill — recalculate, then redeploy')}</p>
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

