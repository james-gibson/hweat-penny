import { createContext, useContext, useState, type ReactNode } from 'react'

/**
 * The hwhole joke, as a toggle.
 *
 * The Family Guy bit is Stewie over-pronouncing the "h" in "cool hwhip" while
 * Brian says it plainly. This site is written in Stewie — "hweat penny",
 * "kool hwhip" — and the toggle drops the h and the k back out for Brian.
 *
 * "hw" -> "wh" is the aspirate swap ("hweat" -> "wheat"), and "kool" -> "cool"
 * is the spelling. Nothing else changes; code identifiers and URLs are never
 * passed through this.
 */
export type Voice = 'stewie' | 'brian'

type VoiceState = {
  voice: Voice
  toggle: () => void
  say: (text: string) => string
}

const VoiceContext = createContext<VoiceState | null>(null)

function toBrian(text: string): string {
  return text
    .replace(/Hw/g, 'Wh')
    .replace(/hw/g, 'wh')
    .replace(/Kool/g, 'Cool')
    .replace(/kool/g, 'cool')
}

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voice, setVoice] = useState<Voice>('stewie')

  const toggle = () => setVoice((v) => (v === 'stewie' ? 'brian' : 'stewie'))
  const say = (text: string) => (voice === 'stewie' ? text : toBrian(text))

  return <VoiceContext.Provider value={{ voice, toggle, say }}>{children}</VoiceContext.Provider>
}

export function useVoice(): VoiceState {
  const ctx = useContext(VoiceContext)
  if (!ctx) throw new Error('useVoice must be used inside <VoiceProvider>')
  return ctx
}
