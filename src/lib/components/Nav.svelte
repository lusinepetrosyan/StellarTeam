<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '#lib/assets/stellar-logo.svg';

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

	const links = [
		{ href: '/#services', label: 'Services' },
		{ href: '/#operate', label: 'Models' },
		{ href: 'https://www.stellar.team/', label: 'Resources', external: true },
		{ href: '/#about', label: 'About' }
	];

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

<a
	href="#main"
	class="absolute -top-16 focus:top-3 left-4 z-20 rounded-lg bg-brand-field px-3.5 py-2.5 font-body text-sm font-semibold text-white no-underline"
>
	Skip to content
</a>

<nav
	aria-label="Main"
	onfocusin={() => (focused = true)}
	onfocusout={() => (focused = false)}
	data-scrolled={scrolled}
	class="fixed inset-x-0 top-0 z-10 flex transition-transform duration-300 ease-out motion-reduce:transition-none {hidden && !focused ? '-translate-y-full' : 'translate-y-0'} items-center justify-between gap-4 border-b border-line transition-[transform,border-color,background-color] max-[720px]:border-transparent max-[720px]:data-[scrolled=true]:border-line bg-nav max-[720px]:bg-transparent max-[720px]:data-[scrolled=true]:bg-nav py-3 pr-[max(1.5rem,env(safe-area-inset-right))] pl-[max(1.5rem,env(safe-area-inset-left))] max-[400px]:pr-4 max-[400px]:pl-4 font-head text-sm font-semibold text-fg backdrop-blur-md max-[720px]:backdrop-blur-none max-[720px]:data-[scrolled=true]:backdrop-blur-md"
>
	<!-- Logo and name as one lockup on every screen size: the star, then STELLAR (normal text colour) over TEAM (the star's red) in spaced capitals -->
	<a href="/" class="flex min-h-11 items-center whitespace-nowrap text-fg" aria-label="Stellar Team, back to top">
		<img src={logo} alt="" width="61" height="36" class="block h-[36px] w-[61px] min-[721px]:h-[39px] min-[721px]:w-[66px]" />
		<span class="relative z-[1] -ml-[14px] grid font-head text-[14.5px] leading-[1.15] font-extrabold tracking-[0.12em] uppercase min-[721px]:-ml-[15px] min-[721px]:text-[16px] max-[344px]:sr-only">
			<span>Stellar</span>
			<span class="text-brand">Team</span>
		</span>
	</a>

	<div class="flex items-center gap-6 max-[720px]:gap-2">
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

		<a href="/#reach" class="flex min-h-10 items-center rounded-full bg-brand-field px-4 text-white">Contact</a>

		<button
			type="button"
			onclick={toggleTheme}
			aria-label="Switch between light and dark theme"
			class="min-h-10 cursor-pointer rounded-full border border-line bg-transparent px-3.5 font-[inherit] text-fg"
		>
			<span class="dark:hidden">Dark</span>
			<span class="hidden dark:inline">Light</span>
		</button>
	</div>
</nav>
