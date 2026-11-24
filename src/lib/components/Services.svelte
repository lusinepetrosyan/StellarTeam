<script lang="ts">
	import { TONES, type Tone } from '../tone';

	let { tone = 'auto' }: { tone?: Tone } = $props();
	const t = $derived(TONES[tone]);

	// The six service groups. `inc` = what each group includes (also drawn around the hub in the diagram).
	const GROUPS = [
		{ name: 'Platform Core', text: 'Authentication, configuration, localisation, and system logic.', inc: ['Authentication', 'Configuration', 'Localisation', 'System logic'], icon: 'i-core' },
		{ name: 'Wallet, Payments, and Transactions', text: 'Balance logic, cashier operations, and payment processing.', inc: ['Accounting', 'Cashier', 'Payment Integrations', 'Payment GC'], icon: 'i-wallet' },
		{ name: 'Engagement, Retention, and Communication', text: 'Player communication, CRM, and retention tools.', inc: ['Messaging', 'Notifications', 'Bonus', 'CRM', 'Telegram', 'Intercom'], icon: 'i-chat' },
		{ name: 'Betting and Gaming Operations', text: 'Sportsbook and casino logic.', inc: ['Tickets', 'Sports Bets', 'Casino Control', 'Winners'], icon: 'i-igame' },
		{ name: 'Compliance, Reporting, and Oversight', text: 'Verification, reporting, and operational monitoring.', inc: ['Reporting', 'Report Calculator', 'KYC (Sumsub)'], icon: 'i-shield' },
		{ name: 'Interfaces and Experience Layer', text: 'The visible and operational interfaces.', inc: ['Website', 'Admin Panel'], icon: 'i-screen' }
	];

	// One group per slide; `current` is the slide on show (arrows, dots and swiping change it).
	let current = $state(0);
	function go(i: number) {
		current = (i + GROUPS.length) % GROUPS.length;
	}
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

	// Where each tile sits around the hub (viewBox 400 x 300). The first group gets the Stellar star as its hub.
	// Phones get their own, bigger set: larger tiles and labels, so the diagram fills its box instead of leaving a wide empty margin.
	function nodes(inc: string[], star: boolean, phone: boolean) {
		const n = inc.length;
		const rx = phone ? (star ? 124 : 112) : 124;
		const ry = phone ? (star ? 135 : 100) : 96;
		return inc.map((label, k) => {
			const a = -Math.PI / 2 + k * ((Math.PI * 2) / n) + (star ? Math.PI / n : 0);
			const x = 200 + Math.cos(a) * rx;
			const y = 150 + Math.sin(a) * ry;
			const w = phone ? Math.max(92, label.length * 9 + 22) : Math.max(80, label.length * 7.2 + 24);
			return { label, x: +x.toFixed(1), y: +y.toFixed(1), w, h: phone ? 38 : 32 };
		});
	}
</script>

<!-- The diagram for one group: its items around a hub, joined by dashed lines that flow. phone = the bigger version drawn for phone cards. -->
{#snippet diagram(g: (typeof GROUPS)[number], star: boolean, phone: boolean)}
		{#if star}
			<circle cx="200" cy="150" r={phone ? 92 : 78} class="animate-breathe fill-brand opacity-[0.14] [transform-origin:200px_150px] motion-reduce:animate-none" />
		{:else}
			<circle cx="200" cy="150" r={phone ? 104 : 96} class="fill-brand opacity-[0.12]" />
		{/if}
		{#each nodes(g.inc, star, phone) as nd (nd.label)}
			<line x1="200" y1="150" x2={nd.x} y2={nd.y} class="animate-flow fill-none stroke-brand stroke-[1.6] opacity-55 [stroke-dasharray:6_6] motion-reduce:animate-none" />
			<rect x={(nd.x - nd.w / 2).toFixed(1)} y={(nd.y - nd.h / 2).toFixed(1)} width={nd.w} height={nd.h} rx="8" class="fill-sv-tile stroke-sv-chip-line" />
			<text x={nd.x} y={nd.y + (phone ? 5.5 : 4)} text-anchor="middle" class="fill-sv-ink font-body font-semibold {phone ? 'text-[16.5px]' : 'text-[11.5px]'}">{nd.label}</text>
		{/each}
		{#if star}
			{#if phone}
				<svg x="141.7" y="94.3" width="189.4" height="111" viewBox="34 35 442 259"><use href="#stellar-mark" class="fill-brand" /></svg>
			{:else}
				<svg x="147.5" y="99.8" width="170.6" height="100" viewBox="34 35 442 259"><use href="#stellar-mark" class="fill-brand" /></svg>
			{/if}
		{:else if phone}
			<circle cx="200" cy="150" r="46" class="fill-brand" />
			<svg x="174" y="124" width="52" height="52" viewBox="0 0 24 24"><use href="#{g.icon}" class="fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]" /></svg>
		{:else}
			<circle cx="200" cy="150" r="34" class="fill-brand" />
			<svg x="184" y="134" width="32" height="32" viewBox="0 0 24 24"><use href="#{g.icon}" class="fill-none stroke-white stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]" /></svg>
		{/if}
{/snippet}

<section
	id="services"
	class="@container grid gap-[calc(var(--u)*3)] {t.section} pt-[calc(var(--u)*6)] pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[calc(var(--u)*7)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] [--u:min(1cqw,16px)] max-[720px]:gap-[6cqw] max-[720px]:pt-[12cqw] max-[720px]:pb-[14cqw]"
>
	<!-- Heading -->
	<div class="grid w-full max-w-[1180px] justify-items-center gap-[calc(var(--u)*1.6)] justify-self-center pb-[var(--u)] text-center max-[720px]:gap-[3cqw]">
		<p class="m-0 font-head text-[length:calc(var(--u)*5.2)] leading-none font-extrabold tracking-[-0.01em] {t.kicker} max-[720px]:text-[length:max(30px,9cqw)]">Service Groups</p>
		<h2 class="m-0 -mt-[calc(var(--u)*0.6)] max-w-[22ch] font-head text-[length:calc(var(--u)*4)] leading-[1.05] font-bold tracking-[-0.01em] text-balance max-[720px]:-mt-[1cqw] max-[720px]:text-[length:max(26px,7cqw)]">
			Explore the system by functional area.
		</h2>
		<p class="max-w-[52ch] text-[length:max(15px,calc(var(--u)*1.5))] leading-normal {t.sub} max-[720px]:text-[length:max(15px,3.2cqw)]">
			Each area represents a group of services that define how your platform operates.
		</p>
	</div>

	<!-- Desktop and tablets: one panel per group, text on one side and the diagram on the other (the sides alternate) -->
	<div class="grid w-full max-w-[1180px] gap-[calc(var(--u)*2)] justify-self-center max-[720px]:hidden">
		{#each GROUPS as g, i (g.name)}
			{@const star = i === 0}
			<div class="grid min-w-0 grid-cols-2 items-center gap-[calc(var(--u)*3)] rounded-[calc(var(--u)*2.4)] bg-sv-card px-[calc(var(--u)*3.4)] py-[calc(var(--u)*3.2)] text-sv-ink shadow-sv">
				<div class="grid gap-[calc(var(--u)*1.4)] {i % 2 ? 'order-2' : ''}">
					<h3 class="m-0 font-head text-[length:max(22px,calc(var(--u)*3.2))] leading-[1.03] font-extrabold tracking-[-0.015em]">{g.name}</h3>
					<p class="m-0 max-w-[36ch] text-[length:max(15px,calc(var(--u)*1.6))] leading-normal text-sv-muted">{g.text}</p>
					<span class="text-[length:max(11px,calc(var(--u)*1.05))] font-bold tracking-[0.14em] text-sv-muted uppercase">Includes</span>
					<div class="flex flex-wrap gap-[calc(var(--u)*0.6)]">
						{#each g.inc as item (item)}
							<span class="rounded-[7px] border border-sv-chip-line bg-sv-tile px-[calc(var(--u)*1)] py-[calc(var(--u)*0.55)] text-[length:max(13px,calc(var(--u)*1.25))] font-medium text-sv-ink">{item}</span>
						{/each}
					</div>
					<a
						href="https://www.stellar.team/"
						target="_blank"
						rel="noopener"
						class="mt-[calc(var(--u)*0.3)] inline-flex min-h-11 w-max items-center gap-[calc(var(--u)*0.6)] rounded-full bg-brand-field px-[calc(var(--u)*1.9)] py-[var(--u)] text-[length:max(15px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-white no-underline"
					>
						Explore model
						<svg class="size-4" aria-hidden="true"><use href="#i-arrow" /></svg>
					</a>
				</div>

				<!-- Diagram: the items around a hub, joined by dashed lines that flow -->
				<div class="relative aspect-[4/3] rounded-[calc(var(--u)*1.8)] bg-sv-base" aria-hidden="true">
					<svg viewBox="0 0 400 300" class="absolute inset-0 size-full">
						{@render diagram(g, star, false)}
					</svg>
				</div>
			</div>
		{/each}
	</div>

	<!-- Phones only: swipeable cards, one group per card (diagram on top, then title, text, tags and button), with dots underneath -->
	<div
		class="relative grid w-full justify-self-center gap-[3cqw] min-[721px]:hidden"
		role="region"
		aria-roledescription="carousel"
		aria-label="Service groups"
		onpointerdown={onPointerDown}
		onpointerup={onPointerUp}
	>
		<div class="overflow-hidden rounded-[calc(var(--u)*2.4)] [touch-action:pan-y] max-[720px]:rounded-[5cqw]">
			<div class="flex transition-transform duration-[550ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none" style="transform: translateX(-{current * 100}%)">
				{#each GROUPS as g, i (g.name)}
					{@const star = i === 0}
					<div
						class="grid min-w-0 flex-[0_0_100%] grid-cols-2 items-center gap-[calc(var(--u)*2)] rounded-[calc(var(--u)*2.4)] bg-sv-card p-[calc(var(--u)*2)] text-sv-ink shadow-sv max-[720px]:grid-cols-1 max-[720px]:content-start max-[720px]:gap-[3cqw] max-[720px]:rounded-[5cqw] max-[720px]:p-[2.5cqw]"
						role="group"
						aria-roledescription="slide"
						aria-label="{i + 1} of {GROUPS.length}: {g.name}"
						inert={i !== current}
					>
						<div class="grid gap-[calc(var(--u)*1.4)] px-[calc(var(--u)*3)] py-[calc(var(--u)*2.6)] max-[720px]:gap-[3cqw] max-[720px]:px-[2.5cqw] max-[720px]:pt-[2cqw] max-[720px]:pb-[3cqw]">
							<h3 class="m-0 font-head text-[length:max(24px,calc(var(--u)*3))] leading-[1.05] font-extrabold tracking-[-0.015em] text-balance max-[720px]:text-[length:max(28px,7.2cqw)]">{g.name}</h3>
							<p class="m-0 max-w-[46ch] text-[length:max(16px,calc(var(--u)*1.4))] leading-normal text-sv-muted max-[720px]:max-w-none max-[720px]:text-[length:max(16px,4cqw)]">{g.text}</p>
							<span class="text-[length:max(11px,calc(var(--u)*1.05))] font-bold tracking-[0.14em] text-sv-muted uppercase max-[720px]:text-[length:max(11px,2.6cqw)]">Includes</span>
							<div class="flex flex-wrap gap-[calc(var(--u)*0.6)] max-[720px]:gap-[1.6cqw]">
								{#each g.inc as item (item)}
									<span
										class="rounded-[7px] border border-sv-chip-line bg-sv-tile px-[calc(var(--u)*1)] py-[calc(var(--u)*0.55)] text-[length:max(13px,calc(var(--u)*1.25))] font-medium text-sv-ink max-[720px]:px-[2.4cqw] max-[720px]:py-[1.4cqw] max-[720px]:text-[length:max(13px,3.2cqw)]"
									>{item}</span>
								{/each}
							</div>
							<a
								href="https://www.stellar.team/"
								target="_blank"
								rel="noopener"
								class="mt-[calc(var(--u)*0.3)] inline-flex min-h-11 w-max items-center gap-[calc(var(--u)*0.6)] rounded-full bg-brand-field px-[calc(var(--u)*1.9)] py-[var(--u)] text-[length:max(15px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-white no-underline max-[720px]:gap-2 max-[720px]:px-[4cqw] max-[720px]:py-[2.4cqw] max-[720px]:text-[length:max(15px,3.4cqw)]"
							>
								Explore model
								<svg class="size-4" aria-hidden="true"><use href="#i-arrow" /></svg>
							</a>
						</div>

						<!-- Diagram: the items around a hub, joined by dashed lines that flow (a bigger version for phones) -->
						<div class="relative aspect-[4/3] rounded-[calc(var(--u)*1.8)] bg-sv-base shadow-sv-2 max-[720px]:order-first max-[720px]:rounded-[3cqw]" aria-hidden="true">
							<svg viewBox="0 0 400 300" class="absolute inset-0 size-full">
								{@render diagram(g, star, true)}
							</svg>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Dots -->
		<div class="flex justify-center gap-[calc(var(--u)*0.6)] max-[720px]:gap-[1cqw]" role="tablist" aria-label="Choose a service group">
			{#each GROUPS as g, i (g.name)}
				<button type="button" role="tab" aria-label={g.name} aria-selected={i === current} onclick={() => go(i)} class="cursor-pointer border-0 bg-transparent p-[12px]">
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
