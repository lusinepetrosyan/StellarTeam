<script lang="ts">
	import { useI18n } from '../i18n';

	const i18n = useI18n();

	// Partner / tooling logos (files in static/logos). They are shown white-on-dark or black-on-light by the `logo-mono` filter.
	const LOGOS = [
		['Intercom', 'intercom'],
		['RabbitMQ', 'rabbitmq'],
		['Grafana Loki', 'grafana-loki'],
		['MongoDB', 'mongodb'],
		['Smartico', 'smartico'],
		['Elasticsearch', 'elasticsearch'],
		['Prometheus', 'prometheus'],
		['Customer.io', 'customerio']
	];
</script>

{#snippet tiles(copy: boolean)}
	{#each LOGOS as [name, file] (file)}
		<div
			class="grid h-[calc(var(--u)*11.5)] w-[calc(var(--u)*24)] flex-none place-items-center rounded-[calc(var(--u)*1.5)] border border-logo-line bg-logo-tile shadow-logo-tile max-[720px]:h-[22cqw] max-[720px]:w-[46cqw] max-[720px]:rounded-[3.6cqw]"
		>
			<img src="/logos/{file}.png" alt={copy ? '' : name} loading="lazy" class="logo-mono h-[calc(var(--u)*5.4)] w-auto max-w-[72%] object-contain max-[720px]:h-[10cqw]" />
		</div>
	{/each}
{/snippet}

<!-- Two rows of logos sliding sideways without ever stopping (the second row the other way). Each row holds the set twice so the loop is seamless. -->
<section
	id="stack"
	aria-label={i18n.t.stack.title}
	class="@container grid gap-[calc(var(--u)*1.6)] overflow-hidden bg-logos pt-[calc(var(--u)*4.5)] pb-[calc(var(--u)*6)] text-field-fg [--u:min(1cqw,16px)] max-[720px]:gap-[3cqw]"
>
	<span class="pr-0 pb-[var(--u)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] font-body text-[length:max(12px,calc(var(--u)*1.05))] font-semibold tracking-[0.18em] uppercase opacity-90 max-[720px]:text-[length:max(12px,2.6cqw)]">{i18n.t.stack.title}</span>

	<div class="flex w-max animate-slide gap-[calc(var(--u)*1.6)] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:px-[5cqw] max-[720px]:gap-[3cqw]">
		{@render tiles(false)}
		<div class="contents motion-reduce:hidden" aria-hidden="true">{@render tiles(true)}</div>
	</div>
	<div class="-ml-[calc(var(--u)*13)] flex w-max animate-slide-rev gap-[calc(var(--u)*1.6)] motion-reduce:ml-0 motion-reduce:hidden max-[720px]:gap-[3cqw]" aria-hidden="true">
		{@render tiles(true)}
		{@render tiles(true)}
	</div>
</section>
