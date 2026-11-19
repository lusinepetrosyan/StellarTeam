<script lang="ts">
	import logo from '#lib/assets/logo.svg';

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
	class="fixed inset-x-0 top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-nav py-3 pr-[max(1.5rem,env(safe-area-inset-right))] pl-[max(1.5rem,env(safe-area-inset-left))] font-head text-sm font-semibold text-fg backdrop-blur-md"
>
	<a href="/" class="flex min-h-11 items-center gap-2.5 text-base font-bold" aria-label="Stellar Team, back to top">
		<img src={logo} alt="" width="44" height="19" class="block h-[19px] w-11" />
		Stellar Team
	</a>

	<div class="flex items-center gap-6">
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
