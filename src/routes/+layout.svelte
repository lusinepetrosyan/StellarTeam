<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import Footer from '#lib/components/Footer.svelte';
	import Nav from '#lib/components/Nav.svelte';
	import SvgDefs from '#lib/components/SvgDefs.svelte';
	import type { LayoutProps } from './$types';
	import '../app.css';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<title>Stellar Team – Modular iGaming Platform</title>
	<meta
		name="description"
		content="Stellar Team provides a modular iGaming system with full source code ownership. Run it independently or with expert support."
	/>
</svelte:head>

<SvgDefs />
<Nav />

<main id="main">
	{@render children()}
</main>

<Footer />
