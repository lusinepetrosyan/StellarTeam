<script lang="ts">
	import { onMount } from 'svelte';
	import About from '#lib/components/About.svelte';
	import AdditionalServices from '#lib/components/AdditionalServices.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import HowYouOperate from '#lib/components/HowYouOperate.svelte';
	import ReachOut from '#lib/components/ReachOut.svelte';
	import TechStack from '#lib/components/TechStack.svelte';
	import Services from '#lib/components/Services.svelte';
	import WhyMatters from '#lib/components/WhyMatters.svelte';
	import type { Tone } from '../../lib/tone';

	// TEST ONLY: ?tone=dark | light | red changes the background of Service Groups and Additional Services.
	let tone = $state<Tone>('auto');
	onMount(() => {
		const t = new URLSearchParams(location.search).get('tone');
		if (t === 'dark' || t === 'light' || t === 'red') tone = t;
	});
</script>

<Hero />
<About />
<Services {tone} />
<AdditionalServices {tone} />
<HowYouOperate />
<WhyMatters />
<TechStack />
<ReachOut />
