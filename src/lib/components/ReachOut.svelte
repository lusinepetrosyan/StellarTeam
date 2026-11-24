<script lang="ts">
	import { useI18n } from '../i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.reach);
</script>

<!-- The closing call to action: a red field with a large blurred copy of the star behind the text -->
<section
	id="reach"
	class="@container relative grid grid-cols-[1fr_minmax(0,calc(var(--u)*46))] justify-items-start gap-[calc(var(--u)*1.6)] overflow-hidden bg-brand-field pt-[calc(var(--u)*9)] pr-[max(calc(var(--u)*6),env(safe-area-inset-right))] pb-[calc(var(--u)*10)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] text-left text-white [--u:min(1cqw,16px)] max-[720px]:grid-cols-1 max-[720px]:gap-[3cqw] max-[720px]:pt-[16cqw] max-[720px]:pb-[18cqw] [&>*:not(svg)]:col-start-2 [&>*:not(svg)]:max-w-[calc(var(--u)*46)] max-[720px]:[&>*:not(svg)]:col-start-1 max-[720px]:[&>*:not(svg)]:max-w-[92cqw]"
>
	<svg
		viewBox="34 35 442 259"
		class="pointer-events-none absolute top-1/2 left-[38%] h-auto w-[100cqw] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-55 blur-[calc(var(--u)*0.7)] max-[720px]:left-1/2 max-[720px]:w-[170cqw] max-[720px]:blur-[1.4cqw]"
		aria-hidden="true"
	>
		<use href="#stellar-mark" class="fill-white" />
	</svg>

	<p class="relative m-0 font-head text-[length:calc(var(--u)*5.2)] leading-none font-extrabold tracking-[-0.01em] text-white [text-shadow:0_2px_24px_rgb(232_32_42/.9),0_0_2px_rgb(232_32_42/.8)] max-[720px]:text-[length:max(30px,9cqw)]">{t.kicker}</p>
	<h2 class="relative m-0 max-w-[22ch] font-head text-[length:max(24px,calc(var(--u)*3.4))] leading-[1.08] font-bold tracking-[-0.01em] text-balance text-white [text-shadow:0_2px_24px_rgb(232_32_42/.9),0_0_2px_rgb(232_32_42/.8)] max-[720px]:text-[length:max(26px,6.4cqw)]">
		{t.title}
	</h2>
	<p class="relative mt-[calc(var(--u)*0.4)] max-w-[44ch] text-[length:max(16px,calc(var(--u)*1.6))] leading-normal text-white/92 [text-shadow:0_2px_24px_rgb(232_32_42/.9),0_0_2px_rgb(232_32_42/.8)] max-[720px]:text-[length:max(16px,3.8cqw)]">
		{t.sub}
	</p>
	<a
		href="https://www.stellar.team/"
		target="_blank"
		rel="noopener"
		class="group relative mt-[calc(var(--u)*1.4)] inline-flex min-h-11 w-max items-center gap-[calc(var(--u)*1.1)] rounded-[calc(var(--u)*1)] bg-white px-[calc(var(--u)*4)] py-[calc(var(--u)*1.8)] text-[length:max(16px,calc(var(--u)*1.9))] font-bold text-brand-field no-underline shadow-[0_0_0_calc(var(--u)*0.5)_rgb(255_255_255/.22),0_14px_40px_rgb(0_0_0/.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_calc(var(--u)*0.8)_rgb(255_255_255/.3),0_20px_50px_rgb(0_0_0/.32)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-[720px]:gap-[2.4cqw] max-[720px]:rounded-[2.2cqw] max-[720px]:px-[8cqw] max-[720px]:py-[4cqw] max-[720px]:text-[length:max(16px,4.2cqw)] max-[720px]:shadow-[0_0_0_1.2cqw_rgb(255_255_255/.22),0_14px_40px_rgb(0_0_0/.28)]"
	>
		{t.cta}
		<svg class="size-[max(16px,calc(var(--u)*1.8))] transition-transform duration-200 group-hover:translate-x-[0.4cqw]" aria-hidden="true"><use href="#i-arrow" /></svg>
	</a>
</section>
