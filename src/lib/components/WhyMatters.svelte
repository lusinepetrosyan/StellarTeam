<script lang="ts">
	import { onMount } from 'svelte';

	// Four cards, fanned out like a hand of playing cards. tx = how far from the middle, rot = tilt in degrees.
	const CARDS = [
		{ title: 'Full Control', text: 'You define how the system works.', icon: 'i-key', tx: -29, rot: -12, look: 'bg-brand-field text-white' },
		{ title: 'No Dependency', text: 'You are not locked into a provider.', icon: 'i-plug', tx: -9.7, rot: -4, look: 'bg-tile text-ink border border-card-line' },
		{ title: 'Modular Growth', text: 'Components evolve independently.', icon: 'i-chip', tx: 9.7, rot: 4, look: 'bg-card text-ink' },
		{ title: 'Performance', text: 'Handles real-time load and traffic spikes.', icon: 'i-chart', tx: 29, rot: 12, look: 'bg-brand-tint text-ink' }
	];

	// The cards are dealt out when the section scrolls into view (and again if it is scrolled away and back)
	let section: HTMLElement;
	let go = $state(false);
	onMount(() => {
		if (!('IntersectionObserver' in window)) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) go = true;
					else if (e.boundingClientRect.top > 0) go = false;
				}
			},
			{ threshold: 0.35 }
		);
		io.observe(section);
		return () => io.disconnect();
	});
</script>

<section bind:this={section} id="why" class="@container bg-surface pb-[calc(var(--u)*5)] text-ink [--u:min(1cqw,16px)] max-[720px]:pb-[12cqw]">
	<!-- Heading -->
	<div
		class="grid justify-items-center gap-[calc(var(--u)*1.6)] pt-[calc(var(--u)*6)] pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[var(--u)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] text-center max-[720px]:gap-[3cqw] max-[720px]:pt-[12cqw] max-[720px]:pb-[4cqw]"
	>
		<p class="m-0 font-head text-[length:calc(var(--u)*5.2)] leading-none font-extrabold tracking-[-0.01em] text-brand max-[720px]:text-[length:max(30px,9cqw)]">Why This Structure Matters</p>
		<h2 class="m-0 max-w-[30ch] font-head text-[length:max(22px,calc(var(--u)*3))] leading-[1.1] font-bold tracking-[-0.01em] text-balance max-[720px]:max-w-none max-[720px]:text-[length:max(22px,5.4cqw)]">
			A platform is not defined by its features, but by how well it can be understood, controlled, and adapted.
		</h2>
	</div>

	<!-- The hand of cards (on phones: a 2 x 2 grid) -->
	<div
		class="relative mx-auto mt-[var(--u)] h-[calc(var(--u)*31)] max-w-[1180px] max-[720px]:mt-[4cqw] max-[720px]:grid max-[720px]:h-auto max-[720px]:grid-cols-2 max-[720px]:gap-[3cqw] max-[720px]:px-[5cqw]"
	>
		{#each CARDS as c, k (c.title)}
			<div
				class="absolute bottom-0 left-1/2 -ml-[calc(var(--u)*9.4)] grid h-[calc(var(--u)*27)] w-[calc(var(--u)*18.75)] origin-[50%_100%] content-start gap-[calc(var(--u)*0.8)] rounded-[calc(var(--u)*1.5)] px-[calc(var(--u)*1.7)] py-[calc(var(--u)*1.8)] shadow-[0_calc(var(--u)*1.6)_calc(var(--u)*4)_rgb(0_0_0/.18)] [transform:translateX(var(--tx))_rotate(var(--rot))] motion-reduce:animate-none {go ? 'animate-deal' : ''} {c.look} max-[720px]:relative max-[720px]:bottom-auto max-[720px]:left-auto max-[720px]:m-0 max-[720px]:h-auto max-[720px]:min-h-[48cqw] max-[720px]:w-auto max-[720px]:animate-none max-[720px]:gap-[2.5cqw] max-[720px]:rounded-[4cqw] max-[720px]:p-[4.5cqw] max-[720px]:shadow-[0_4cqw_8cqw_rgb(0_0_0/.12)] max-[720px]:[transform:none]"
				style="--tx: calc(var(--u) * {c.tx}); --rot: {c.rot}deg; animation-delay: {k * 0.1}s"
			>
				<h3 class="m-0 font-head text-[length:max(22px,calc(var(--u)*2.8))] leading-[0.98] font-extrabold tracking-[-0.03em] max-[720px]:text-[length:max(24px,6.4cqw)]">{c.title}</h3>
				<p class="m-0 text-[length:max(14px,calc(var(--u)*1.1))] leading-[1.45] max-[720px]:text-[length:max(14px,3.4cqw)]">{c.text}</p>
				<svg
					class="absolute right-[calc(var(--u)*1.4)] bottom-[calc(var(--u)*1.4)] size-[max(28px,calc(var(--u)*2.4))] fill-none stroke-current stroke-[1.8] opacity-90 [stroke-linecap:round] [stroke-linejoin:round] max-[720px]:right-[3.5cqw] max-[720px]:bottom-[3.5cqw] max-[720px]:size-[max(28px,6cqw)]"
					aria-hidden="true"><use href="#{c.icon}" /></svg
				>
			</div>
		{/each}
	</div>
</section>
