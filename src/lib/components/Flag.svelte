<script lang="ts">
	// Small flags for the language menu (drawn as SVG so there is nothing to download). en = United States, tr = Türkiye.
	let { code, class: cls = '' }: { code: 'en' | 'tr'; class?: string } = $props();

	const stripes = Array.from({ length: 7 }, (_, k) => k * 3.077);
	const stars = [
		[1.3, 1.1], [3.3, 1.1], [5.3, 1.1], [7.3, 1.1], [9.3, 1.1],
		[2.3, 2.85], [4.3, 2.85], [6.3, 2.85], [8.3, 2.85],
		[1.3, 4.6], [3.3, 4.6], [5.3, 4.6], [7.3, 4.6], [9.3, 4.6],
		[2.3, 6.35], [4.3, 6.35], [6.3, 6.35], [8.3, 6.35],
		[1.3, 8.1], [3.3, 8.1], [5.3, 8.1], [7.3, 8.1], [9.3, 8.1]
	];
</script>

<svg class="block h-3.5 w-[21px] flex-none rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/.08)] {cls}" viewBox="0 0 30 20" aria-hidden="true">
	{#if code === 'tr'}
		<rect width="30" height="20" rx="2" fill="#E30A17" />
		<circle cx="11.5" cy="10" r="6" fill="#fff" />
		<circle cx="13" cy="10" r="4.8" fill="#E30A17" />
		<polygon points="16.30,10.00 18.27,9.32 18.30,7.24 19.56,8.91 21.55,8.30 20.35,10.00 21.55,11.70 19.56,11.09 18.30,12.76 18.27,10.68" fill="#fff" />
	{:else}
		<rect width="30" height="20" rx="2" fill="#fff" />
		{#each stripes as y (y)}
			<rect {y} width="30" height="1.538" fill="#B22234" />
		{/each}
		<rect width="12" height="10.77" fill="#3C3B6E" />
		{#each stars as [cx, cy] (`${cx}-${cy}`)}
			<circle {cx} {cy} r=".45" fill="#fff" />
		{/each}
	{/if}
</svg>
