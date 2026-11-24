<script lang="ts">
	import { onMount } from 'svelte';
	import Flag from './Flag.svelte';
	import logo from '#lib/assets/stellar-logo.svg';
	import { useI18n } from '../i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.nav);

	// The bar slides away while scrolling down and comes back on any scroll up (desktop and phone).
	// It always stays visible near the top of the page and while a link or button in it has keyboard focus.
	let hidden = $state(false);
	let scrolled = $state(false); // phones: the bar's bottom line only shows once the page has been scrolled
	let focused = $state(false);

	onMount(() => {
		let lastY = scrollY;
		let ticking = false;
		function update() {
			const y = Math.max(0, scrollY);
			const delta = y - lastY;
			scrolled = y > 4;
			if (y < 80) hidden = false;
			else if (delta > 6) hidden = true;
			else if (delta < -6) hidden = false;
			if (Math.abs(delta) > 6 || y < 80) lastY = y;
			ticking = false;
		}
		function onScroll() {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		}
		addEventListener('scroll', onScroll, { passive: true });
		return () => removeEventListener('scroll', onScroll);
	});

	const links = $derived([
		{ href: i18n.link('services'), label: t.services },
		{ href: i18n.link('operate'), label: t.models },
		{ href: 'https://www.stellar.team/', label: t.resources, external: true },
		{ href: i18n.link('about'), label: t.about }
	]);

	// Language menu: the two languages, each with its own flag and URL ("/" and "/tr")
	const LANGS = [
		{ code: 'en', short: 'EN', name: 'English', href: '/' },
		{ code: 'tr', short: 'TR', name: 'Türkçe', href: '/tr' }
	] as const;
	const current = $derived(LANGS.find((l) => l.code === i18n.lang) ?? LANGS[0]);
	let langOpen = $state(false);
	let langBox: HTMLElement;
	let langBtn: HTMLButtonElement;

	function onDocClick(e: MouseEvent) {
		if (langOpen && !langBox.contains(e.target as Node)) langOpen = false;
	}
	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && langOpen) {
			langOpen = false;
			langBtn.focus();
		}
	}

	// Same rule as the `dark:` variant in app.css: manual choice first, else the system setting.
	function isDark() {
		const t = document.documentElement.dataset.theme;
		return t ? t === 'dark' : !matchMedia('(prefers-color-scheme: light)').matches;
	}

	function toggleTheme() {
		const next = isDark() ? 'light' : 'dark';
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {}
	}
</script>

<svelte:document onclick={onDocClick} onkeydown={onKey} />

<a
	href="#main"
	class="absolute -top-16 focus:top-3 left-4 z-20 rounded-lg bg-brand-field px-3.5 py-2.5 font-body text-sm font-semibold text-white no-underline"
>
	{t.skip}
</a>

<nav
	aria-label={t.main}
	onfocusin={() => (focused = true)}
	onfocusout={() => (focused = false)}
	data-scrolled={scrolled}
	class="fixed inset-x-0 top-0 z-10 flex transition-transform duration-300 ease-out motion-reduce:transition-none {hidden && !focused ? '-translate-y-full' : 'translate-y-0'} items-center justify-between gap-4 border-b border-line transition-[transform,border-color,background-color] max-[720px]:border-transparent max-[720px]:data-[scrolled=true]:border-line bg-nav max-[720px]:bg-transparent max-[720px]:data-[scrolled=true]:bg-nav py-3 pr-[max(1.5rem,env(safe-area-inset-right))] pl-[max(1.5rem,env(safe-area-inset-left))] max-[400px]:pr-4 max-[400px]:pl-4 font-head text-sm font-semibold text-fg backdrop-blur-md max-[720px]:backdrop-blur-none max-[720px]:data-[scrolled=true]:backdrop-blur-md"
>
	<!-- Logo and name as one lockup on every screen size: the star, then STELLAR (normal text colour) over TEAM (the star's red) in spaced capitals -->
	<a href={i18n.home} class="flex min-h-11 items-center whitespace-nowrap text-fg" aria-label={t.home}>
		<img src={logo} alt="" width="61" height="36" class="block h-[36px] w-[61px] min-[721px]:h-[39px] min-[721px]:w-[66px]" />
		<span class="relative z-[1] -ml-[14px] grid font-head text-[14.5px] leading-[1.15] font-extrabold tracking-[0.12em] uppercase min-[721px]:-ml-[15px] min-[721px]:text-[16px] max-[379px]:sr-only">
			<span>Stellar</span>
			<span class="text-brand">Team</span>
		</span>
	</a>

	<div class="flex items-center gap-6 max-[720px]:gap-2 max-[400px]:gap-1.5">
		{#each links as link (link.href)}
			<a
				href={link.href}
				class="flex min-h-11 items-center max-[720px]:hidden"
				target={link.external ? '_blank' : undefined}
				rel={link.external ? 'noopener' : undefined}
			>
				{link.label}
			</a>
		{/each}

		<a href={i18n.link('reach')} class="flex min-h-10 items-center rounded-full bg-brand-field px-4 text-white max-[400px]:px-3">{t.contact}</a>

		<!-- Language menu: flag + code, opens a short list. The links are real pages, so it works without JavaScript too. -->
		<div bind:this={langBox} class="relative">
			<button
				bind:this={langBtn}
				type="button"
				aria-haspopup="menu"
				aria-expanded={langOpen}
				aria-label="{t.langLabel}: {current.name}"
				onclick={() => (langOpen = !langOpen)}
				class="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-line bg-transparent px-2.5 font-[inherit] text-fg max-[400px]:gap-1.5 max-[400px]:px-2"
			>
				<Flag code={current.code} />
				<span class="font-head text-[13px] font-semibold tracking-[0.04em] max-[720px]:hidden">{current.short}</span>
				<svg class="size-3.5 fill-none stroke-current stroke-2 transition-transform duration-200 {langOpen ? 'rotate-180' : ''}" viewBox="0 0 24 24" aria-hidden="true" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
			</button>
			{#if langOpen}
				<div role="menu" class="absolute top-[calc(100%+8px)] right-0 grid min-w-40 gap-0.5 rounded-[14px] border border-line bg-nav p-1.5 shadow-[0_16px_40px_rgb(0_0_0/.18)] backdrop-blur-md">
					{#each LANGS as l (l.code)}
						<a
							role="menuitem"
							href={l.href}
							lang={l.code}
							hreflang={l.code}
							aria-current={l.code === current.code ? 'true' : undefined}
							onclick={() => (langOpen = false)}
							class="flex min-h-10 items-center gap-2.5 rounded-[9px] px-3 font-head text-sm font-semibold hover:bg-card aria-[current=true]:bg-card"
						>
							<Flag code={l.code} />{l.name}
						</a>
					{/each}
				</div>
			{/if}
		</div>

		<button
			type="button"
			onclick={toggleTheme}
			aria-label={t.themeLabel}
			class="min-h-10 cursor-pointer rounded-full border border-line bg-transparent px-3.5 font-[inherit] text-fg max-[400px]:px-3"
		>
			<span class="dark:hidden">{t.dark}</span>
			<span class="hidden dark:inline">{t.light}</span>
		</button>
	</div>
</nav>
