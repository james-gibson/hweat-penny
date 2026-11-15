import { createContext, useContext, useState, type ReactNode } from 'react'

/**
 * The hwhole joke, as two toggles.
 *
 * The Family Guy bit is Stewie over-pronouncing the "h" in "cool hwhip" while
 * Brian says it plainly. This site is written in Stewie — "hweat penny",
 * "kool hwhip" — and the voice toggle drops every over-pronounced h back out for
 * Brian.
 *
 * Stewie aspirates two ways, so the reversal handles both:
 *   - a swap ("wheat" -> "hweat", "what" -> "hwat", "when" -> "hwen");
 *   - a prepended h ("whip" -> "hwhip", "where" -> "hwhere", "which" -> "hwhich",
 *     "whole" -> "hwhole", "why" -> "hwhy", "wheel" -> "hwheel");
 *   - and, because Stewie aspirates everything, a prepended h on words that are
 *     not "wh" at all ("with" -> "hwith", "was" -> "hwas", "will" -> "hwill").
 *
 * The witness toggle is a different choice: is the penny rotation verified, or
 * is it copied and claimed? Stewie doesn't want a witness; Brian doesn't care.
 */
export type Voice = 'stewie' | 'brian'
export type Witness = 'verified' | 'unverified'

type VoiceState = {
  voice: Voice
  toggle: () => void
  say: (text: string) => string
  witness: Witness
  setWitness: (witness: Witness) => void
  toggleWitness: () => void
}

const VoiceContext = createContext<VoiceState | null>(null)

function toBrian(text: string): string {
  return text
    // prepended h on words that are not "wh" at all (Stewie aspirates everything)
    .replace(/Hwithout/g, 'Without')
    .replace(/hwithout/g, 'without')
    .replace(/Hwritten/g, 'Written')
    .replace(/hwritten/g, 'written')
    .replace(/Hwould/g, 'Would')
    .replace(/hwould/g, 'would')
    .replace(/Hwords/g, 'Words')
    .replace(/hwords/g, 'words')
    .replace(/Hwill/g, 'Will')
    .replace(/hwill/g, 'will')
    .replace(/Hways/g, 'Ways')
    .replace(/hways/g, 'ways')
    .replace(/Hwith/g, 'With')
    .replace(/hwith/g, 'with')
    .replace(/Hwas/g, 'Was')
    .replace(/hwas/g, 'was')
    // prepended h on true "wh" words (the double-h forms)
    .replace(/Hwhole/g, 'Whole')
    .replace(/hwhole/g, 'whole')
    .replace(/Hwhere/g, 'Where')
    .replace(/hwhere/g, 'where')
    .replace(/Hwhich/g, 'Which')
    .replace(/hwhich/g, 'which')
    .replace(/Hwheel/g, 'Wheel')
    .replace(/hwheel/g, 'wheel')
    .replace(/Hwhy/g, 'Why')
    .replace(/hwhy/g, 'why')
    .replace(/Hwhip/g, 'Whip')
    .replace(/hwhip/g, 'whip')
    // swap forms ("hweat" -> "wheat", "hwat" -> "what", "hwen" -> "when")
    .replace(/Hw/g, 'Wh')
    .replace(/hw/g, 'wh')
    // "kool" -> "cool"
    .replace(/Kool/g, 'Cool')
    .replace(/kool/g, 'cool')
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voice, setVoice] = useState<Voice>('stewie')
  const [witness, setWitness] = useState<Witness>('verified')

  const toggle = () => setVoice((v) => (v === 'stewie' ? 'brian' : 'stewie'))
  const toggleWitness = () => setWitness((w) => (w === 'verified' ? 'unverified' : 'verified'))
  const say = (text: string) => (voice === 'stewie' ? text : toBrian(text))

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
