import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * The hwhole joke, as two toggles — the CSS version.
 *
 * Stewie prepends an "h" to every "w" word ("wheat" -> "hwheat", "whip" ->
 * "hwhip", "with" -> "hwith"); Brian drops it. There is exactly one rule, so the
 * reversal is one lookahead: remove an "h"/"H" immediately before a "w".
 * "kool" is the one spelling change ("cool").
 *
 * Both spellings are rendered into the DOM (`say` returns two spans); CSS picks
 * which one shows via `html[data-voice]`. The preference is stored, the way
 * le.gume's motion rungs store a preference. The first version was a 32-line
 * string-mapper — see /guide for the mistake and its cost.
 */
export type Voice = 'stewie' | 'brian'
export type Witness = 'verified' | 'unverified'

type VoiceState = {
  voice: Voice
  toggle: () => void
  say: (text: string) => ReactNode
  witness: Witness
  setWitness: (witness: Witness) => void
  toggleWitness: () => void
}

const VoiceContext = createContext<VoiceState | null>(null)
const STORAGE_KEY = 'hweat.voice'

/** Stewie -> Brian: drop the prepended h and fix the one spelling. */
export function toBrian(text: string): string {
  return text
    .replace(/H(?=w)/g, '')
    .replace(/h(?=w)/g, '')
    .replace(/Kool/g, 'Cool')
    .replace(/kool/g, 'cool')
}

function say(text: string): ReactNode {
  return (
    <>
      <span className="v-stewie">{text}</span>
      <span className="v-brian">{toBrian(text)}</span>
    </>
  )
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voice, setVoice] = useState<Voice>(() => {
    if (typeof window === 'undefined') return 'stewie'
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'brian' ? 'brian' : 'stewie'
    } catch {
      return 'stewie'
    }
  })
  const [witness, setWitness] = useState<Witness>('verified')

  useEffect(() => {
    document.documentElement.dataset.voice = voice
    try {
      window.localStorage.setItem(STORAGE_KEY, voice)
    } catch {
      // private browsing: the choice still applies this session
    }
  }, [voice])

  const toggle = () => setVoice((v) => (v === 'stewie' ? 'brian' : 'stewie'))
  const toggleWitness = () => setWitness((w) => (w === 'verified' ? 'unverified' : 'verified'))

  return (
    <VoiceContext.Provider value={{ voice, toggle, say, witness, setWitness, toggleWitness }}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice(): VoiceState {
  const ctx = useContext(VoiceContext)
  if (!ctx) throw new Error('useVoice must be used inside <VoiceProvider>')
  return ctx
}
