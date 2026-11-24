<script lang="ts">
	import { useI18n } from '../i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.about);

	// Shared look of the white cards inside the red band. Sizes use --u (the design unit, set on the section).
	const card =
		'flex min-w-0 items-center gap-[calc(var(--u)*1.4)] rounded-[calc(var(--u)*1.6)] bg-tile p-[calc(var(--u)*1.6)] text-ink shadow-[0_2px_4px_rgb(0_0_0/.06),0_18px_40px_rgb(0_0_0/.14)] max-[720px]:gap-[3.5cqw] max-[720px]:rounded-[4cqw] max-[720px]:p-[4cqw]';

	const ICONS = ['i-core', 'i-key', 'i-book'];
	const points = $derived(t.points.map((title, k) => ({ icon: ICONS[k], title })));
</script>

<section id="about" class="@container relative bg-surface text-ink [--u:min(1cqw,16px)]">
	<!-- Red band -->
	<div
		class="grid justify-items-center gap-[calc(var(--u)*1.6)] bg-brand-field pt-[calc(var(--u)*6)] pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[calc(var(--u)*7)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] text-center text-white max-[720px]:gap-[3cqw] max-[720px]:pt-[12cqw] max-[720px]:pb-[14cqw]"
	>
		<p class="m-0 font-head text-[length:max(13px,calc(var(--u)*1.5))] font-extrabold tracking-[0.12em] uppercase max-[720px]:text-[length:max(13px,3.2cqw)]">
			{t.kicker}
		</p>
		<h2 class="m-0 max-w-[22ch] font-head text-[length:calc(var(--u)*4.6)] leading-[1.05] font-bold tracking-[-0.01em] text-balance max-[720px]:text-[9cqw]">
			{t.title}
		</h2>
		<p class="max-w-[52ch] text-[length:max(15px,calc(var(--u)*1.5))] leading-normal text-white/92 max-[720px]:text-[length:max(15px,3.4cqw)]">
			{t.sub}
		</p>

		<div class="mt-[calc(var(--u)*2)] grid w-full max-w-[1180px] grid-cols-3 gap-[calc(var(--u)*1.4)] text-left max-[720px]:mt-[5cqw] max-[720px]:grid-cols-1 max-[720px]:gap-[3cqw]">
			{#each points as point (point.title)}
				<div class={card}>
					<span
						class="grid size-[calc(var(--u)*5.4)] flex-none place-items-center rounded-[calc(var(--u)*1)] bg-sv-tile shadow-[0_1px_2px_rgb(0_0_0/.05),0_6px_16px_rgb(0_0_0/.06)] max-[720px]:size-[13cqw] max-[720px]:rounded-[2.6cqw]"
					>
						<svg
							class="size-[calc(var(--u)*2.6)] fill-none stroke-brand stroke-2 [stroke-linecap:round] [stroke-linejoin:round] max-[720px]:size-[6.2cqw]"
							aria-hidden="true"
						>
							<use href="#{point.icon}" />
						</svg>
					</span>
					<div class="font-head text-[length:max(16px,calc(var(--u)*2))] leading-[1.1] font-bold tracking-[-0.01em] max-[720px]:text-[length:max(18px,4.8cqw)]">
						{point.title}
					</div>
				</div>
			{/each}

			<div class="{card} col-span-2 max-[720px]:col-span-1">
				<p class="m-0 text-[length:max(15px,calc(var(--u)*1.5))] leading-normal max-[720px]:text-[length:max(15px,3.6cqw)]">
					{t.card}
				</p>
			</div>

			<!-- White call-to-action card: it stands out from the red band (the old red-on-red card did not), one-line title, round arrow button -->
			<a
				href="https://www.stellar.team/"
				target="_blank"
				rel="noopener"
				class="group grid grid-rows-[1fr_auto] content-between justify-items-start gap-[calc(var(--u)*1)] rounded-[calc(var(--u)*1.6)] bg-white p-[calc(var(--u)*1.6)] text-brand-field no-underline shadow-[0_2px_4px_rgb(0_0_0/.08),0_18px_40px_rgb(0_0_0/.2)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgb(0_0_0/.1),0_24px_48px_rgb(0_0_0/.28)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-[720px]:min-h-[26cqw] max-[720px]:rounded-[4cqw] max-[720px]:p-[4cqw]"
			>
				<div class="font-head text-[length:max(18px,calc(var(--u)*2.1))] leading-[1.1] font-bold tracking-[-0.01em] max-[720px]:text-[length:max(20px,5.4cqw)]">
					{t.cta}
				</div>
				<span
					class="grid size-[calc(var(--u)*4)] place-items-center justify-self-end rounded-full bg-brand-field transition-transform duration-200 group-hover:translate-x-[0.4cqw] max-[720px]:size-[max(40px,10.5cqw)]"
				>
					<svg
						class="size-[55%] fill-none stroke-white stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round]"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path d="M5 12h14M13 6l6 6-6 6" />
					</svg>
				</span>
			</a>
		</div>
	</div>

	<!-- Curved belt under the band, with the star badge -->
	<div class="relative h-[calc(var(--u)*16.3)] bg-surface max-[720px]:h-[26cqw]" aria-hidden="true">
		<svg
			class="absolute top-[-1px] left-0 block h-[calc(var(--u)*7)] w-full max-[720px]:h-[10cqw]"
			viewBox="0 0 100 10"
			preserveAspectRatio="none"
		>
			<path d="M0 0H100Q50 20 0 0Z" class="fill-brand-field" />
		</svg>
		<div
			class="absolute top-[calc(var(--u)*1.5)] left-1/2 grid size-[calc(var(--u)*11)] -translate-x-1/2 place-items-center rounded-full bg-brand shadow-[0_0_0_calc(var(--u)*1.2)_var(--color-brand-tint),0_calc(var(--u)*1.4)_calc(var(--u)*3)_rgb(0_0_0/.25)] max-[720px]:top-0 max-[720px]:size-[20cqw] max-[720px]:shadow-[0_0_0_2cqw_var(--color-brand-tint),0_2cqw_5cqw_rgb(0_0_0/.25)]"
		>
			<svg viewBox="34 35 442 259" class="h-[calc(var(--u)*4.93)] w-[calc(var(--u)*8.2)] fill-white max-[720px]:h-[9cqw] max-[720px]:w-[15cqw]"><use href="#stellar-mark" /></svg>
		</div>
	</div>
</section>
