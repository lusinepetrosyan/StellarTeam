<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import Footer from '#lib/components/Footer.svelte';
	import Nav from '#lib/components/Nav.svelte';
	import SvgDefs from '#lib/components/SvgDefs.svelte';
	import { page } from '$app/state';
	import { provideI18n, type Lang } from '../lib/i18n';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children }: LayoutProps = $props();

	// "/tr" is Turkish, everything else English. All the text comes from the dictionaries in src/lib/i18n.
	const lang = $derived<Lang>(page.params.lang === 'tr' ? 'tr' : 'en');
	const i18n = provideI18n(() => lang);

	// keep <html lang> right when the visitor switches language without a page reload
	$effect(() => {
		document.documentElement.lang = lang;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<title>{i18n.t.meta.title}</title>
	<meta name="description" content={i18n.t.meta.description} />
</svelte:head>

<SvgDefs />
<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />
