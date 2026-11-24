<script lang="ts">
	import { TONES, type Tone } from '../tone';

	let { tone = 'auto' }: { tone?: Tone } = $props();
	const t = $derived(TONES[tone]);

	import { onMount } from 'svelte';

	const SLIDES = [
		{
			name: 'Casino Engine',
			title: 'Power your casino with a fully controlled engine.',
			text: 'Run casino content on an engine you own and configure: game control, winners, and limits handled inside your platform rather than behind a provider’s wall.'
		},
		{
			name: 'CRM and Bonuses',
			title: 'Drive engagement with intelligent player management.',
			text: 'Messaging, notifications, bonuses and CRM in one place, so your team can shape the player journey without waiting on anyone else.'
		},
		{
			name: 'Third Party Tools',
			title: 'Integrate freely with the tools you trust.',
			text: 'Payments, KYC, communication and analytics tools connect through open integrations. Your stack, your choices, no lock-in.'
		}
	];

	let current = $state(0);
	let paused = $state(false);
	let reduce = $state(false);

	function go(i: number) {
		current = (i + SLIDES.length) % SLIDES.length;
	}

	onMount(() => {
		reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	// Move on by itself every 6 seconds, unless the visitor is pointing at it, focusing it, or prefers reduced motion.
	$effect(() => {
		if (reduce || paused) return;
		const id = setInterval(() => go(current + 1), 6000);
		return () => clearInterval(id);
	});

	// Swipe left / right
	let startX: number | null = null;
	function onPointerDown(e: PointerEvent) {
		startX = e.clientX;
	}
	function onPointerUp(e: PointerEvent) {
		if (startX === null) return;
		const dx = e.clientX - startX;
		startX = null;
		if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
	}

	// ---- illustration helpers (all drawn in a 400 x 300 box) ----
	const WHEEL_R = 48;
	const wheelSegments = Array.from({ length: 12 }, (_, k) => {
		const a0 = (k * Math.PI) / 6;
		const a1 = ((k + 1) * Math.PI) / 6;
		const f = (v: number) => v.toFixed(1);
		const d = `M200 140 L${f(200 + Math.cos(a0) * WHEEL_R)} ${f(140 + Math.sin(a0) * WHEEL_R)} A${WHEEL_R} ${WHEEL_R} 0 0 1 ${f(200 + Math.cos(a1) * WHEEL_R)} ${f(140 + Math.sin(a1) * WHEEL_R)} Z`;
		return { d, odd: k % 2 === 1 };
	});
	const BALL_PATH = 'M200 100 A40 40 0 1 1 199.9 100';
	const REELS = ['7', '★', '♦', '7'];

	// Spokes of the "Third Party Tools" picture. Desktop keeps the original small ring, phones get the bigger one.
	const spokeIcons = ['i-card', 'i-shield', 'i-chat', 'i-chart', 'i-globe', 'i-help'];
	function spokesFor(R: number, step: number) {
		return spokeIcons.map((icon, k) => {
			const a = -Math.PI / 2 + (k * Math.PI) / 3;
			const x = 200 + Math.cos(a) * R;
			const y = 150 + Math.sin(a) * R * 0.78;
			return {
				icon,
				x: +x.toFixed(1),
				y: +y.toFixed(1),
				path: `M${x.toFixed(1)} ${y.toFixed(1)} L200 150`,
				kx: +(200 + Math.cos(a) * 52).toFixed(1),
				ky: +(150 + Math.sin(a) * 52 * 0.78).toFixed(1),
				delay: k * step
			};
		});
	}
	const spokesDesktop = spokesFor(108, 0.45);
	const spokesPhone = spokesFor(162, 1.15);
</script>

<!-- An icon tile (floats gently). `pad` = space around the icon as a share of the tile (the phone version uses a bigger icon). -->
{#snippet tile(x: number, y: number, icon: string, n: number, size = 48, pad = 0.25, big = false, float = true)}
	<g class={float ? 'animate-float motion-reduce:animate-none' : ''} style={float ? `animation-delay:${-((n * 1.1) % 4).toFixed(1)}s` : ''}>
		<rect
			{x}
			{y}
			width={size}
			height={size}
			rx={size * 0.22}
			class="{big ? 'fill-sv-card' : 'fill-sv-tile'} stroke-sv-chip-line [filter:drop-shadow(0_0_10px_rgb(0_0_0/.08))]"
		/>
		<svg x={x + size * pad} y={y + size * pad} width={size * (1 - 2 * pad)} height={size * (1 - 2 * pad)} viewBox="0 0 24 24">
			<use href="#{icon}" class="fill-none stroke-brand stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]" />
		</svg>
	</g>
{/snippet}

<!-- A dashed line with a small dot travelling along it. On phones the dot starts part-way along (negative begin). -->
{#snippet wire(d: string, dur: number, delay: number, early = false)}
	<path {d} class="animate-flow fill-none stroke-brand stroke-[1.6] opacity-60 [stroke-dasharray:6_6] motion-reduce:animate-none" />
	{#if !reduce}
		<circle r="3" class="fill-white stroke-brand stroke-2">
			<animateMotion {dur} begin="{early ? -delay : delay}s" repeatCount="indefinite" path={d} />
		</circle>
	{/if}
{/snippet}

<!-- One picture. m = false: the original size (desktop). m = true: the larger version drawn for phones. -->
{#snippet scene(i: number, m: boolean)}
	{#if i === 0}
		<!-- Casino Engine: roulette wheel with a running ball, slot reels below, casino tiles wired in -->
		<circle cx="200" cy="140" r="92" class="animate-halo fill-brand opacity-10 [transform-box:fill-box] origin-center motion-reduce:animate-none" />
		{#if m}
			{@render wire('M65 54 L120 54 Q138 54 148 72 L170 112', 3.6, 0, true)}
			{@render wire('M335 54 L280 54 Q262 54 252 72 L230 112', 3.6, 0.9, true)}
			{@render wire('M65 246 L120 246 Q138 246 148 228 L170 170', 3.6, 1.8, true)}
			{@render wire('M335 246 L280 246 Q262 246 252 228 L230 170', 3.6, 2.7, true)}
		{:else}
			{@render wire('M110 86 L140 86 Q150 86 156 94 L170 112', 2.2, 0)}
			{@render wire('M290 86 L260 86 Q250 86 244 94 L230 112', 2.2, 0.6)}
			{@render wire('M110 214 L140 214 Q150 214 156 206 L170 170', 2.2, 1.1)}
			{@render wire('M290 214 L260 214 Q250 214 244 206 L230 170', 2.2, 1.7)}
		{/if}
		<g class="animate-wheel [transform-box:fill-box] origin-center motion-reduce:animate-none">
			{#each wheelSegments as seg (seg.d)}
				<path d={seg.d} class={seg.odd ? 'fill-brand' : 'fill-sv-base'} />
			{/each}
			<circle cx="200" cy="140" r="48" class="fill-none stroke-brand stroke-2" />
			<circle cx="200" cy="140" r="33" class="fill-none stroke-brand stroke-2" />
		</g>
		<circle cx="200" cy="140" r="24" class="animate-hub fill-brand [transform-box:fill-box] origin-center motion-reduce:animate-none" />
		<svg x="184" y="133" width="32" height="14" viewBox="34 35 442 259"><use href="#stellar-mark" fill="#ffffff" /></svg>
		{#if reduce}
			<circle cx="200" cy="100" r="4" class="fill-white stroke-brand stroke-2" />
		{:else}
			<circle r="4" class="fill-white stroke-brand stroke-2"><animateMotion dur="2.6s" repeatCount="indefinite" path={BALL_PATH} /></circle>
		{/if}
		<rect x="144" y="222" width="112" height="42" rx="9" class="fill-sv-base stroke-brand stroke-2 [filter:drop-shadow(0_0_10px_rgb(0_0_0/.08))]" />
		<line x1="182" y1="226" x2="182" y2="260" class="stroke-brand stroke-2" />
		<line x1="218" y1="226" x2="218" y2="260" class="stroke-brand stroke-2" />
		{#each [0, 1, 2] as r (r)}
			<svg x={150 + r * 36} y="226" width="32" height="34" viewBox="0 0 32 34">
				<g>
					{#each REELS as sym, k (k)}
						<text x="16" y={24 + k * 34} text-anchor="middle" class="fill-brand font-head text-[20px] font-extrabold">{sym}</text>
					{/each}
					{#if !reduce}
						<animateTransform attributeName="transform" type="translate" from="0 0" to="0 -102" dur="{1.4 + r * 0.5}s" repeatCount="indefinite" />
					{/if}
				</g>
			</svg>
		{/each}
		{#if m}
			{@render tile(-7, 18, 'i-dice', 0, 72, 0.19)}
			{@render tile(335, 18, 'i-chipc', 1, 72, 0.19)}
			{@render tile(-7, 210, 'i-cards', 2, 72, 0.19)}
			{@render tile(335, 210, 'i-gift', 3, 72, 0.19)}
		{:else}
			{@render tile(62, 62, 'i-dice', 0)}
			{@render tile(290, 62, 'i-chipc', 1)}
			{@render tile(62, 190, 'i-cards', 2)}
			{@render tile(290, 190, 'i-gift', 3)}
		{/if}
	{:else if i === 1}
		<!-- CRM and Bonuses: a red square with people, tiles wired in with switches -->
		{#if m}
			{@render wire('M65 54 L150 54 Q166 54 166 70 L166 100', 3.4, 0, true)}
			{@render toggle(108, 54, 0)}
			{@render wire('M335 54 L250 54 Q234 54 234 70 L234 100', 3.4, 0.8, true)}
			{@render toggle(292, 54, 1.3)}
			{@render wire('M65 246 L150 246 Q166 246 166 230 L166 200', 3.4, 1.6, true)}
			{@render toggle(108, 246, 2.4)}
			{@render wire('M335 246 L250 246 Q234 246 234 230 L234 200', 3.4, 2.4, true)}
			{@render toggle(292, 246, 3.2)}
			{@render wire('M74 150 L150 150', 2.8, 0.6, true)}
			{@render wire('M326 150 L250 150', 2.8, 1.8, true)}
		{:else}
			{@render wire('M110 86 L150 86 Q160 86 160 96 L160 100', 2, 0)}
			{@render toggle(135, 86, 0)}
			{@render wire('M290 86 L250 86 Q240 86 240 96 L240 100', 2, 0.5)}
			{@render toggle(265, 86, -1.3)}
			{@render wire('M110 214 L150 214 Q160 214 160 204 L160 200', 2, 1)}
			{@render toggle(135, 214, -2.4)}
			{@render wire('M290 214 L250 214 Q240 214 240 204 L240 200', 2, 1.5)}
			{@render toggle(265, 214, -3.2)}
			{@render wire('M118 150 L150 150', 1.6, 0.3)}
			{@render wire('M282 150 L250 150', 1.6, 0.9)}
		{/if}
		<rect x="150" y="100" width="100" height="100" rx="22" class="animate-hub fill-brand [transform-box:fill-box] origin-center motion-reduce:animate-none" />
		<svg x="172" y="122" width="56" height="56" viewBox="0 0 24 24"><use href="#i-people" class="fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]" /></svg>
		{#if m}
			{@render tile(-7, 18, 'i-chart', 0, 72, 0.19)}
			{@render tile(335, 18, 'i-bars', 1, 72, 0.19)}
			{@render tile(-16, 105, 'i-wave', 2, 90, 0.19, true)}
			{@render tile(326, 105, 'i-gift', 3, 90, 0.19, true)}
			{@render tile(-7, 210, 'i-bell', 4, 72, 0.19)}
			{@render tile(335, 210, 'i-chat', 5, 72, 0.19)}
		{:else}
			{@render tile(62, 62, 'i-chart', 0)}
			{@render tile(290, 62, 'i-bars', 1)}
			{@render tile(56, 120, 'i-wave', 2, 60, 0.25, true)}
			{@render tile(284, 120, 'i-gift', 3, 60, 0.25, true)}
			{@render tile(62, 190, 'i-bell', 4)}
			{@render tile(290, 190, 'i-chat', 5)}
		{/if}
	{:else}
		<!-- Third Party Tools: a red hub with six spokes to partner tiles -->
		{@const ring = m ? spokesPhone : spokesDesktop}
		<circle cx="200" cy="150" r="80" class="animate-halo fill-brand opacity-10 [transform-box:fill-box] origin-center motion-reduce:animate-none" />
		{#each ring as sp (sp.icon)}
			{@render wire(sp.path, m ? 7 : 2.6, sp.delay, m)}
			<circle cx={sp.kx} cy={sp.ky} r="3" class="fill-brand" />
		{/each}
		<circle cx="200" cy="150" r="40" class="animate-hub fill-brand [transform-box:fill-box] origin-center motion-reduce:animate-none" />
		<svg x="180" y="130" width="40" height="40" viewBox="0 0 24 24"><use href="#i-plug" class="fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]" /></svg>
		{#each ring as sp, k (sp.icon)}
			{#if m}
				{@render tile(sp.x - 36, sp.y - 36, sp.icon, k, 72, 0.19, false, false)}
			{:else}
				{@render tile(sp.x - 24, sp.y - 24, sp.icon, k, 48, 0.25, false, false)}
			{/if}
		{/each}
	{/if}
{/snippet}

<!-- A small on/off switch whose knob slides back and forth -->
{#snippet toggle(x: number, y: number, delay: number)}
	<rect x={x - 13} y={y - 7} width="26" height="14" rx="7" class="fill-sv-base stroke-brand stroke-[1.4]" />
	<circle cx={x + 5} cy={y} r="4" class="animate-tog fill-brand motion-reduce:animate-none" style="animation-delay:{delay}s" />
{/snippet}

<section
	id="extra"
	class="@container grid gap-[calc(var(--u)*3)] {t.section} pt-0 pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[calc(var(--u)*7)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] [--u:min(1cqw,16px)] max-[720px]:gap-[6cqw] max-[720px]:pb-[14cqw]"
>
	<!-- Heading -->
	<div class="grid w-full max-w-[1180px] justify-items-center gap-[calc(var(--u)*1.6)] justify-self-center pb-[var(--u)] text-center max-[720px]:gap-[3cqw]">
		<p class="m-0 font-head text-[length:calc(var(--u)*5.2)] leading-none font-extrabold tracking-[-0.01em] {t.kicker} max-[720px]:text-[length:max(30px,9cqw)]">Additional Services</p>
		<h2 class="m-0 -mt-[calc(var(--u)*0.6)] max-w-[22ch] font-head text-[length:calc(var(--u)*4)] leading-[1.05] font-bold tracking-[-0.01em] text-balance max-[720px]:-mt-[1cqw] max-[720px]:text-[length:max(26px,7cqw)]">
			Add what you need, when you need it.
		</h2>
	</div>

	<!-- Carousel -->
	<div
		class="relative grid w-full max-w-[1180px] justify-self-center gap-[calc(var(--u)*1.6)] max-[720px]:gap-[3cqw]"
		role="region"
		aria-roledescription="carousel"
		aria-label="Additional services"
		onpointerenter={() => (paused = true)}
		onpointerleave={() => (paused = false)}
		onfocusin={() => (paused = true)}
		onfocusout={() => (paused = false)}
		onpointerdown={onPointerDown}
		onpointerup={onPointerUp}
	>
		<button
			type="button"
			aria-label="Previous service"
			onclick={() => go(current - 1)}
			class="absolute top-1/2 left-[calc(var(--u)*-1.6)] z-[2] grid size-[max(calc(var(--u)*3.2),44px)] -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-sv-tile text-sv-ink shadow-sv-2 hover:text-brand max-[720px]:hidden"
		>
			<svg class="size-4 rotate-180" aria-hidden="true"><use href="#i-arrow" /></svg>
		</button>

		<div class="overflow-hidden rounded-[calc(var(--u)*2.4)] [touch-action:pan-y] max-[720px]:rounded-[5cqw]">
			<div class="flex transition-transform duration-[550ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none" style="transform: translateX(-{current * 100}%)">
				{#each SLIDES as s, i (s.name)}
					<div
						class="grid min-w-0 flex-[0_0_100%] grid-cols-2 items-center gap-[calc(var(--u)*2)] rounded-[calc(var(--u)*2.4)] bg-sv-card p-[calc(var(--u)*2)] text-sv-ink shadow-sv max-[720px]:grid-cols-1 max-[720px]:gap-[3cqw] max-[720px]:rounded-[5cqw] max-[720px]:p-[2.5cqw]"
						role="group"
						aria-roledescription="slide"
						aria-label="{i + 1} of {SLIDES.length}: {s.name}"
						inert={i !== current}
					>
						<div class="grid gap-[calc(var(--u)*1.6)] px-[calc(var(--u)*3)] py-[calc(var(--u)*2.6)] max-[720px]:gap-[3.5cqw] max-[720px]:px-[3cqw] max-[720px]:pt-[2cqw] max-[720px]:pb-[3cqw]">
							<h3 class="m-0 font-head text-[length:max(24px,calc(var(--u)*3))] leading-[1.08] font-bold tracking-[-0.01em] text-balance max-[720px]:text-[length:max(28px,7cqw)]">{s.title}</h3>
							<p class="m-0 max-w-[46ch] text-[length:max(16px,calc(var(--u)*1.3))] leading-[1.6] text-sv-muted max-[720px]:max-w-none max-[720px]:text-[length:max(16px,4.1cqw)]">{s.text}</p>
							<a
								href="https://www.stellar.team/"
								target="_blank"
								rel="noopener"
								class="inline-flex min-h-11 w-max items-center gap-[calc(var(--u)*0.6)] rounded-full bg-brand-field px-[calc(var(--u)*1.9)] py-[var(--u)] text-[length:max(15px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-white no-underline max-[720px]:gap-2 max-[720px]:px-[4cqw] max-[720px]:py-[2.4cqw] max-[720px]:text-[length:max(15px,3.4cqw)]"
							>
								Explore {s.name}
								<svg class="size-4" aria-hidden="true"><use href="#i-arrow" /></svg>
							</a>
						</div>

						<div class="relative aspect-[4/3] overflow-hidden rounded-[calc(var(--u)*1.8)] bg-sv-base shadow-sv-2 max-[720px]:order-first max-[720px]:rounded-[3cqw]" aria-hidden="true">
							<svg viewBox="0 0 400 300" class="absolute inset-0 size-full max-[720px]:hidden">
								{@render scene(i, false)}
							</svg>
							<svg viewBox="-30 -20 460 345" class="absolute inset-0 size-full min-[721px]:hidden">
								{@render scene(i, true)}
							</svg>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<button
			type="button"
			aria-label="Next service"
			onclick={() => go(current + 1)}
			class="absolute top-1/2 right-[calc(var(--u)*-1.6)] z-[2] grid size-[max(calc(var(--u)*3.2),44px)] -translate-y-1/2 cursor-pointer place-items-center rounded-full border-0 bg-sv-tile text-sv-ink shadow-sv-2 hover:text-brand max-[720px]:hidden"
		>
			<svg class="size-4" aria-hidden="true"><use href="#i-arrow" /></svg>
		</button>

		<!-- Dots -->
		<div class="flex justify-center gap-[calc(var(--u)*0.6)] max-[720px]:gap-[1cqw]" role="tablist" aria-label="Choose a service">
			{#each SLIDES as s, i (s.name)}
				<button type="button" role="tab" aria-label={s.name} aria-selected={i === current} onclick={() => go(i)} class="cursor-pointer border-0 bg-transparent p-[12px]">
					<span
						class="block h-[max(8px,calc(var(--u)*0.9))] rounded-full transition-all duration-[250ms] max-[720px]:h-[max(10px,2.4cqw)] {i === current
							? 'w-[max(26px,calc(var(--u)*2.6))] bg-brand max-[720px]:w-[max(38px,7cqw)]'
							: 'w-[max(8px,calc(var(--u)*0.9))] max-[720px]:w-[max(10px,2.4cqw)] ' + t.dot}"
					></span>
				</button>
			{/each}
		</div>
	</div>
</section>
