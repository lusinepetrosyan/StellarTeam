import { getContext, setContext } from 'svelte';
import { en, type Dict } from './en';
import { tr } from './tr';

export type Lang = 'en' | 'tr';
export const LANGS: Lang[] = ['en', 'tr'];
const DICTS: Record<Lang, Dict> = { en, tr };

export type I18n = {
	readonly lang: Lang;
	/** all the text for the current language */
	readonly t: Dict;
	/** where the home page lives: "/" for English, "/tr" for Turkish */
	readonly home: string;
	/** a link to a place on the home page of the current language, e.g. link('services') → "/#services" or "/tr#services" */
	link: (id: string) => string;
};

const KEY = Symbol('i18n');

// Called once, in the root layout. `get` is read every time, so the text follows the language when the visitor switches.
export function provideI18n(get: () => Lang): I18n {
	const ctx: I18n = {
		get lang() {
			return get();
		},
		get t() {
			return DICTS[get()];
		},
		get home() {
			return get() === 'tr' ? '/tr' : '/';
		},
		link(id) {
			return (get() === 'tr' ? '/tr' : '/') + '#' + id;
		}
	};
	setContext(KEY, ctx);
	return ctx;
}

export function useI18n(): I18n {
	return getContext<I18n>(KEY);
}
