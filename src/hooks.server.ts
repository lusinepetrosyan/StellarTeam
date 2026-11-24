import type { Handle } from '@sveltejs/kit/hooks';

// Put the right language on <html lang="…"> in the HTML that is sent (and prerendered), so search engines and screen readers get it.
export const handle: Handle = ({ event, resolve }) => {
	const lang = event.url.pathname === '/tr' || event.url.pathname.startsWith('/tr/') ? 'tr' : 'en';
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('<html lang="en">', `<html lang="${lang}">`) });
};
