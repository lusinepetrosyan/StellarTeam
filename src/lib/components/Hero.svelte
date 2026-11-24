<script lang="ts">
	import { onMount } from 'svelte';

	// Where the star sits in the 960x540 art box (from the exported hero). Its base is on the horizon line, y = 357.
	const STAR = { x: 440, y: 48, s: 1.05 };
	// Wedge clip id + the offset each piece flies in from.
	const PIECES = [
		['w1', 0, -320],
		['w2', 304, -99],
		['w3', 188, 259],
		['w4', -188, 259],
		['w5', -304, -99]
	] as const;
	const AREAS = ['Platform Core', 'Wallet & Payments', 'Engagement', 'Betting & Gaming', 'Compliance', 'Interfaces'];
	const NS = 'http://www.w3.org/2000/svg';

	let disc: SVGGElement;
	let streak: SVGGElement;

	const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	function el(name: string, attrs: Record<string, string | number> = {}) {
		const e = document.createElementNS(NS, name);
		for (const k in attrs) e.setAttribute(k, String(attrs[k]));
		return e;
	}

	// The "network" inside the star: random points joined by short lines, slowly rotating, with pulses travelling along them.
	// Built on mount (not in the template) because it uses Math.random, which must not differ between server and client.
	function buildDisc(g: SVGGElement) {
		const cx = 170, cy = 165, R = 165, N = 150;
		const pts: { x: number; y: number; hot: boolean }[] = [];
		const edges: [number, number][] = [];
		for (let i = 0; i < N; i++) {
			const a = Math.random() * Math.PI * 2;
			const r = Math.sqrt(Math.random()) * R;
			pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, hot: Math.random() < 0.2 });
		}
		for (let p = 0; p < N; p++)
			for (let q = p + 1; q < N; q++) {
				const dx = pts[p].x - pts[q].x, dy = pts[p].y - pts[q].y;
				if (dx * dx + dy * dy < 1600) edges.push([p, q]);
			}
		const lines = el('g', { fill: 'none' });
		for (const [a, b] of edges) lines.appendChild(el('line', { x1: pts[a].x, y1: pts[a].y, x2: pts[b].x, y2: pts[b].y }));
		const dots = el('g');
		for (const pt of pts) dots.appendChild(el('circle', { cx: pt.x, cy: pt.y, r: pt.hot ? 2.6 : 1.6, class: pt.hot ? 'hot' : '' }));
		const pulses = el('g');
		g.append(lines, dots, pulses);
		return { g, pts, edges, pulses, live: [] as { e: [number, number]; t: number; v: number; c: Element }[], angle: Math.random() * 360 };
	}

	// The streak (the long tail of the mark) gets a flatter line pattern.
	function buildStreak(g: SVGGElement) {
		const pts: { x: number; y: number }[] = [];
		for (let x = 205; x <= 462; x += 11) {
			// top and bottom edge of the wedge at this x
			const top = 133 - ((x - 202) * 21) / 274;
			const bot = 154 - ((x - 188) * 42) / 288;
			pts.push({ x: x + (Math.random() - 0.5) * 8, y: top + 1 + Math.random() * Math.max(1, bot - top - 2) });
		}
		const lines = el('g', { fill: 'none' });
		for (let i = 0; i < pts.length - 1; i++) {
			lines.appendChild(el('line', { x1: pts[i].x, y1: pts[i].y, x2: pts[i + 1].x, y2: pts[i + 1].y }));
			if (i < pts.length - 2 && Math.random() < 0.6)
				lines.appendChild(el('line', { x1: pts[i].x, y1: pts[i].y, x2: pts[i + 2].x, y2: pts[i + 2].y }));
		}
		const dots = el('g');
		for (const p of pts) dots.appendChild(el('circle', { cx: p.x, cy: p.y, r: 1.4 }));
		g.append(lines, dots);
	}

	onMount(() => {
		const net = buildDisc(disc);
		disc.setAttribute('transform', `rotate(${net.angle} 170 165)`);
		buildStreak(streak);

		let frame = 0;
		let running = true;
		let raf = 0;
		function step() {
			net.angle += 0.1;
			net.g.setAttribute('transform', `rotate(${net.angle.toFixed(2)} 170 165)`);
			// Start a new pulse along a random line every 10 frames (max 16 at once).
			if (frame % 10 === 0 && net.live.length < 16) {
				const e = net.edges[Math.floor(Math.random() * net.edges.length)];
				const c = el('circle', { r: 2.4, class: 'pulse' });
				net.pulses.appendChild(c);
				net.live.push({ e, t: 0, v: 0.02 + Math.random() * 0.03, c });
			}
			for (let i = net.live.length - 1; i >= 0; i--) {
				const pu = net.live[i];
				const A = net.pts[pu.e[0]], B = net.pts[pu.e[1]];
				pu.t += pu.v;
				if (pu.t >= 1) {
					net.pulses.removeChild(pu.c);
					net.live.splice(i, 1);
					continue;
				}
				pu.c.setAttribute('cx', String(A.x + (B.x - A.x) * pu.t));
				pu.c.setAttribute('cy', String(A.y + (B.y - A.y) * pu.t));
				pu.c.setAttribute('opacity', (1 - Math.abs(pu.t - 0.5) * 1.6).toFixed(2));
			}
		}
		function loop() {
			if (!running) return;
			frame++;
			if (!reduceMotion()) step();
			raf = requestAnimationFrame(loop);
		}
		loop();

		// Pause when the tab is hidden.
		function onVisibility() {
			running = !document.hidden;
			if (running) loop();
		}
		document.addEventListener('visibilitychange', onVisibility);
		return () => {
			running = false;
			cancelAnimationFrame(raf);
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<!--
	Layout notes
	--ah : height of the star artwork. The artwork is a 16:9 picture: it is as wide as the screen on tall/narrow screens,
	       and as tall as the screen on wide/short screens (then it sits on the right). On phones it fills the hero.
	--s  : (portrait/square screens, the 'stack' layout) the design unit there: the smaller of 1% of the width and 0.45% of the height,
	       so everything always fits the screen height. --ox centers that column; --ex is the spare height, shared out between
	       the gaps; --hzs is the horizon height and --cps where the text starts; --k is the size of one star unit.
	--u  : the design unit (1% of the design width). Text and spacing use it so they scale with the artwork
	       but never grow past what the screen height can hold.
-->
<section
	id="hero"
	class="@container relative h-svh min-h-[320px] overflow-hidden stack:flex stack:h-auto stack:min-h-svh stack:flex-col bg-[radial-gradient(70%_60%_at_62%_62%,var(--color-hero-2)_0%,var(--color-hero)_65%)] text-fg [--ah:min(100%,56.25cqw)] [--u:min(1cqw,1.778svh)] [--s:min(1cqw,0.45svh)] [--k:calc(var(--s)*0.195)] [--px:calc(min(1cqw,16px)*5)] [--ox:calc((100cqw_-_var(--s)*100)/2)] [--ex:max(0px,calc(100svh_-_var(--s)*200))] [--hzs:max(calc(var(--s)*69_+_var(--ex)*0.25),calc(var(--k)*272.25_+_78px))] [--cps:calc(var(--hzs)_+_var(--s)*6_+_var(--ex)*0.15)]"
>
	<!-- Red haze below the horizon, running the full width and down to the bottom of the hero -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 bottom-0 top-[calc((100%-var(--ah))/2+0.4378*var(--ah))] stack:top-[calc(var(--hzs)_-_var(--s)*30)] bg-[radial-gradient(ellipse_75%_75%_at_55%_100%,#E8202A,rgb(232_32_42/0))] opacity-(--haze-op)"
	></div>
	<!-- Horizon line -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 top-[calc((100%-var(--ah))/2+0.6044*var(--ah))] stack:top-(--hzs) h-[1.2px] bg-[#ff6b70] opacity-(--horizon-op)"
	></div>

	<!-- The star: five pieces fly in and flash once, then the finished star stays (only the network inside keeps moving) -->
	<div
		class="absolute top-[calc((100%-var(--ah))/2)] right-0 aspect-video h-(--ah) stack:inset-0 stack:aspect-auto stack:h-auto"
	>
		<div class="absolute inset-0">
			<svg
				viewBox="0 0 960 540"
				preserveAspectRatio="xMidYMid slice"
				role="img"
				aria-label="Stellar star assembling from five pieces on the horizon"
				class="absolute inset-0 size-full overflow-visible stack:inset-auto stack:top-[calc(var(--hzs)_-_357*var(--k))] stack:left-[calc(var(--px)_+_2.5cqw_-_475.7*var(--k))] stack:h-[calc(540*var(--k))] stack:w-[calc(960*var(--k))]"
			>
				<g transform="translate({STAR.x} {STAR.y}) scale({STAR.s})" class="[transform:translate(440px,17.4px)_scale(1.05)] stack:[transform:translate(440px,48px)_scale(1.05)]">
					<!-- reflection below the horizon: a mirrored, fading copy of the star, fades in with the finished star -->
					<g class="animate-whole opacity-(--refl-op) motion-reduce:animate-none">
						<use href="#stellar-mark" fill="url(#reflect)" transform="translate(0 588) scale(1 -1)" />
					</g>
					<g class="star-glow">
						{#each PIECES as [clip, dx, dy], k (clip)}
							<g class="animate-collect motion-reduce:animate-none" style="--dx: {dx}px; --dy: {dy}px; animation-delay: {k * 0.14}s">
								<g clip-path="url(#{clip})"><use href="#stellar-mark" fill="url(#juice)" /></g>
							</g>
						{/each}
					</g>
					<!-- the complete star (solid + network + gloss): fades in once, after all five pieces have met, and stays -->
					<g class="animate-whole motion-reduce:animate-none">
						<use href="#stellar-mark" fill="url(#juice)" />
						<g clip-path="url(#mark-clip)">
							<g
								bind:this={disc}
								class="[&_circle]:fill-white/70 [&_circle.hot]:fill-white [&_circle.pulse]:fill-white [&_line]:stroke-white/25 [&_line]:[stroke-width:.8]"
							></g>
							<g
								bind:this={streak}
								class="[&_circle]:fill-white/70 [&_line]:stroke-white/25 [&_line]:[stroke-width:.8]"
							></g>
							<ellipse cx="130" cy="90" rx="115" ry="55" fill="url(#gloss)" opacity=".45" />
						</g>
					</g>
					<!-- thin light border around the star -->
					<use href="#stellar-mark" fill="none" stroke-width="1.4" stroke-linejoin="miter" stroke-miterlimit="24" opacity=".55" class="animate-rim stroke-rim motion-reduce:animate-none" />
					<circle
						cx="170"
						cy="165"
						r="90"
						fill="url(#flash-grad)"
						class="animate-flash origin-center opacity-0 [transform-box:fill-box] motion-reduce:animate-none"
					/>
				</g>
			</svg>
		</div>
	</div>

	<!-- Copy: the red horizon line runs between the headline (above it) and the text and buttons (below it), with a gap on both sides. On phones all of it sits below the line. -->
	<div
		class="absolute top-[calc((100%-var(--ah))/2+0.2278*var(--ah))] left-[max(4cqw,env(safe-area-inset-left))] z-[3] grid w-[calc(var(--u)*46)] gap-[calc(var(--u)*1.6)] short:w-[calc(var(--u)*80)] stack:relative stack:top-auto stack:left-auto stack:ml-(--px) stack:mt-(--cps) stack:w-[calc(100cqw_-_var(--px)*2)] stack:gap-[calc(var(--s)*3)]"
	>
		<h1
			class="m-0 short:max-w-[calc(var(--u)*46)] font-head text-[length:calc(var(--u)*4.8)] leading-[1.02] font-bold tracking-[-0.015em] [text-shadow:0_0_20px_var(--color-hero),0_0_6px_var(--color-hero)] text-balance stack:text-[length:min(max(calc(var(--s)*9.3),min(9cqw,2.4rem)),8.9cqw)]"
		>
			<span class="stack:block">Understand Your</span> <span class="stack:block">Platform. Then</span> <span class="stack:block">Decide How to Run It.</span>
		</h1>
		<p class="mt-[calc(var(--u)*2.6)] max-w-[40ch] text-[length:max(18px,calc(var(--u)*1.85))] leading-normal text-fg-muted [text-shadow:0_0_20px_var(--color-hero),0_0_6px_var(--color-hero)] short:max-w-none short:text-[length:16px] stack:mt-0 stack:max-w-none stack:text-fg stack:text-[length:min(max(17px,calc(var(--s)*5.1)),24px)]">
			Full source code ownership. Modular architecture. Operate independently or with expert support.
		</p>
		<div class="flex flex-wrap gap-[calc(var(--u)*1)] stack:mt-[calc(var(--s)*5)] stack:flex-nowrap stack:gap-[calc(var(--s)*2)]">
			<a
				href="https://www.stellar.team/"
				target="_blank"
				rel="noopener"
				class="inline-flex min-h-11 items-center gap-[calc(var(--u)*0.6)] rounded-full bg-brand-field px-[calc(var(--u)*1.9)] py-[calc(var(--u)*1)] font-body text-[length:max(15px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-white no-underline stack:grow stack:justify-center stack:gap-2 stack:px-[max(8px,calc(var(--s)*2.6))] stack:py-[calc(var(--s)*2.4)] stack:min-w-0 stack:text-[length:clamp(11px,3.8cqw,16px)]"
			>
				Explore our services
				<svg class="size-4 stack:hidden" aria-hidden="true"><use href="#i-arrow" /></svg>
			</a>
			<a
				href="https://www.stellar.team/"
				target="_blank"
				rel="noopener"
				class="inline-flex min-h-11 items-center rounded-full border border-line bg-tile px-[calc(var(--u)*1.9)] py-[calc(var(--u)*1)] font-body text-[length:max(15px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-ink no-underline stack:grow stack:justify-center stack:px-[max(8px,calc(var(--s)*2.6))] stack:py-[calc(var(--s)*2.4)] stack:min-w-0 stack:text-[length:clamp(11px,3.8cqw,16px)]"
			>
				Book a consultation
			</a>
		</div>
	</div>

	<!-- Service areas along the bottom. On phones they become a small labelled group of tags that fills the lower part of the screen. -->
	<div
		class="absolute inset-x-[4cqw] bottom-[calc(var(--u)*2.6)] z-[3] flex justify-between font-head text-[length:max(13px,calc(var(--u)*1.05))] font-semibold text-fg-muted short:hidden stack:@container stack:relative stack:inset-auto stack:ml-(--px) stack:mt-auto stack:w-[calc(100cqw_-_var(--px)*2)] stack:pt-[calc(var(--s)*4)] stack:pb-[calc(var(--s)*3)] stack:grid stack:grid-cols-3 stack:gap-[6px] stack:max-[340px]:grid-cols-2"
	>
		<p class="m-0 hidden w-full text-center text-[length:max(11px,min(3.4cqw,14px))] font-bold tracking-[0.12em] uppercase stack:col-span-3 stack:mb-1 stack:block">Platform areas</p>
		{#each AREAS as area (area)}
			<span class="stack:flex stack:min-h-[calc(var(--s)*10)] stack:items-center stack:justify-center stack:rounded-xl stack:border stack:border-line stack:px-1 stack:py-1.5 stack:text-center stack:leading-tight stack:whitespace-nowrap stack:text-[length:max(11px,min(3.3cqw,15px))]">{area}</span>
		{/each}
	</div>
</section>
