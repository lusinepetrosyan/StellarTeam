// TEST ONLY: background tones for the Service Groups and Additional Services sections.
// Pick one with ?tone=dark | light | red in the address bar (no value = follows the site theme, as before).
export type Tone = 'auto' | 'dark' | 'light' | 'red';

export const TONES: Record<Tone, { section: string; kicker: string; sub: string; dot: string }> = {
	auto: { section: 'bg-surface text-ink', kicker: 'text-brand', sub: 'text-ink-muted', dot: 'bg-sv-ui-3' },
	// always dark / always light, whatever the site theme is
	dark: { section: '[color-scheme:dark] bg-surface text-ink', kicker: 'text-brand', sub: 'text-ink-muted', dot: 'bg-sv-ui-3' },
	light: { section: '[color-scheme:light] bg-surface text-ink', kicker: 'text-brand', sub: 'text-ink-muted', dot: 'bg-sv-ui-3' },
	// red field like the About band; the cards stay dark so they stand out
	red: { section: '[color-scheme:dark] bg-brand-field text-white', kicker: 'text-white', sub: 'text-white/90', dot: 'bg-white/40' }
};
