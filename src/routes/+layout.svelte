<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import logo from '#lib/assets/logo.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" /> //	"Add to Home Screen".
	<title>Stellar Team – Modular iGaming Platform</title>
	<meta
		name="description"
		content="Stellar Team provides a modular iGaming system with full source code ownership. Run it independently or with expert support."
	/>
</svelte:head>

<header>
	<img src={logo} alt="Stellar Team" width="88" height="38" />
</header>

{@render children()}
