import { defineParams } from '@sveltejs/kit/params';

// Parameter matchers for the routes. `lang` is the only language prefix in the URL: "/tr". English has none (it lives at "/").
export const params = defineParams({
	lang: (value: string) => (value === 'tr' ? value : undefined)
});
