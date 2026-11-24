<script lang="ts">
	// The two ways to run the system. Shown side by side, each as a card.
	const MODELS = [
		{ icon: 'i-people', title: 'Self-Managed Operation', line: 'Run the system with your in-house team.', points: ['Full source code ownership', 'Full control over development', 'No dependency on providers'] },
		{ icon: 'i-compass', title: 'Guided Ownership', line: 'Work with Stellar Team as an external CTO.', points: ['Ongoing updates and improvements', 'Technical and strategic guidance', 'Support when needed'] }
	];
</script>

<section id="operate" class="@container bg-surface text-ink [--u:min(1cqw,16px)]">
	<!-- Heading -->
	<div
		class="grid justify-items-center gap-[calc(var(--u)*1.6)] pt-[calc(var(--u)*6)] pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[calc(var(--u)*3.5)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] text-center max-[720px]:gap-[3cqw] max-[720px]:pt-[12cqw] max-[720px]:pb-[6cqw]"
	>
		<p class="m-0 font-head text-[length:calc(var(--u)*5.2)] leading-none font-extrabold tracking-[-0.01em] text-brand max-[720px]:text-[length:max(30px,9cqw)]">How You Operate</p>
		<h2 class="m-0 -mt-[calc(var(--u)*0.6)] max-w-[22ch] font-head text-[length:calc(var(--u)*4)] leading-[1.05] font-bold tracking-[-0.01em] text-balance max-[720px]:-mt-[1cqw] max-[720px]:text-[length:max(26px,7cqw)]">
			Multiple ways to run the system.
		</h2>
	</div>

	<!-- The band: both ways side by side as cards, then one button -->
	<div
		class="grid justify-items-center gap-[calc(var(--u)*3)] bg-field pt-[calc(var(--u)*5)] pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[calc(var(--u)*6)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] text-center text-field-fg max-[720px]:gap-[6cqw] max-[720px]:pt-[10cqw] max-[720px]:pb-[12cqw]"
	>
		<div class="grid w-full max-w-[1180px] grid-cols-2 gap-[calc(var(--u)*2)] text-left max-[720px]:grid-cols-1 max-[720px]:gap-[4cqw]">
			{#each MODELS as m (m.title)}
				<article
					class="grid min-w-0 content-start gap-[calc(var(--u)*1.5)] rounded-[calc(var(--u)*2)] bg-tile pt-[calc(var(--u)*2.8)] pr-[calc(var(--u)*3)] pb-[calc(var(--u)*3)] pl-[calc(var(--u)*3)] text-ink shadow-[0_2px_4px_rgb(0_0_0/.06),0_18px_40px_rgb(0_0_0/.14)] max-[720px]:gap-[3cqw] max-[720px]:rounded-[5cqw] max-[720px]:p-[6cqw]"
				>
					<div class="grid justify-items-start gap-[calc(var(--u)*1.6)] max-[720px]:gap-[3.5cqw]">
						<span
							class="grid size-[max(44px,calc(var(--u)*5))] flex-none place-items-center rounded-[calc(var(--u)*1.1)] bg-brand-field shadow-[0_1px_0_rgb(255_255_255/.18)_inset,0_-3px_0_rgb(0_0_0/.18)_inset] max-[720px]:size-[max(52px,13cqw)] max-[720px]:rounded-[3cqw]"
						>
							<svg class="size-[50%] fill-none stroke-white stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><use href="#{m.icon}" /></svg>
						</span>
						<h3 class="m-0 font-head text-[length:max(24px,calc(var(--u)*2.5))] leading-[1.05] font-extrabold tracking-[-0.015em] max-[720px]:text-[length:max(26px,6.4cqw)]">{m.title}</h3>
					</div>
					<p class="m-0 text-[length:max(16px,calc(var(--u)*1.5))] leading-normal text-ink-muted max-[720px]:text-[length:max(16px,4cqw)]">{m.line}</p>
					<ul class="m-0 mt-[calc(var(--u)*0.3)] grid list-none gap-[calc(var(--u)*1.1)] border-t border-card-line p-0 pt-[calc(var(--u)*1.6)] max-[720px]:gap-[3cqw] max-[720px]:pt-[4cqw]">
						{#each m.points as pt (pt)}
							<li class="flex items-center gap-[calc(var(--u)*1)] font-head text-[length:max(16px,calc(var(--u)*1.5))] leading-[1.3] font-semibold max-[720px]:gap-[2.5cqw] max-[720px]:text-[length:max(16px,4cqw)]">
								<svg
									class="size-[max(22px,calc(var(--u)*1.7))] flex-none rounded-full bg-brand-tint fill-none stroke-brand stroke-[2.6] p-[calc(var(--u)*0.35)] [stroke-linecap:round] [stroke-linejoin:round] max-[720px]:size-[max(24px,5.4cqw)] max-[720px]:p-[1.2cqw]"
									aria-hidden="true"><use href="#i-check" /></svg
								>
								{pt}
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>

		<a
			href="https://www.stellar.team/"
			target="_blank"
			rel="noopener"
			class="inline-flex min-h-11 w-max items-center gap-[calc(var(--u)*0.6)] rounded-full bg-brand-field px-[calc(var(--u)*1.9)] py-[var(--u)] text-[length:max(15px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-white no-underline max-[720px]:gap-2 max-[720px]:px-[4cqw] max-[720px]:py-[2.4cqw] max-[720px]:text-[length:max(15px,3.4cqw)]"
		>
			Explore Models
			<svg class="size-4" aria-hidden="true"><use href="#i-arrow" /></svg>
		</a>
	</div>
</section>
