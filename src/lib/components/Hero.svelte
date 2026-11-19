<script lang="ts">
	import { onMount } from 'svelte';

	// Where the star sits in the 960x540 art box.
	const STAR = { x: 500, y: 21, s: 1.05 };
	// Wedge clip id + the offset each piece flies in from.
	const PIECES = [
		['w1', 0, -320],
		['w2', 304, -99],
		['w3', 188, 259],
		['w4', -188, 259],
		['w5', -304, -99]
	] as const;
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
		for (let x = 205; x <= 640; x += 18) {
			const t = (x - 205) / 435;
			pts.push({ x: x + (Math.random() - 0.5) * 8, y: 133 + t * 16 + Math.random() * (18 - t * 14) });
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
		function loop() {
			if (!running) return;
			frame++;
			if (!reduceMotion()) {
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
	--u  : the design unit (1% of the design width). Text and spacing use it so they scale with the artwork
	       but never grow past what the screen height can hold.
-->
<section
	id="hero"
	class="@container relative h-svh min-h-[560px] overflow-hidden bg-[radial-gradient(70%_60%_at_62%_62%,var(--color-hero-2)_0%,var(--color-hero)_65%)] text-fg [--ah:min(100%,56.25cqw)] [--u:min(1cqw,1.778svh)] max-[720px]:[--ah:100%]"
>
	<!-- Red haze below the horizon, running the full width and down to the bottom of the hero -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 bottom-0 top-[calc((100%-var(--ah))/2+0.4444*var(--ah))] bg-[radial-gradient(ellipse_75%_75%_at_55%_100%,#E8202A,rgb(232_32_42/0))] opacity-(--haze-op)"
	></div>
	<!-- Horizon line -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 top-[calc((100%-var(--ah))/2+0.6111*var(--ah))] h-[1.2px] bg-[#ff6b70] opacity-(--horizon-op)"
	></div>

	<!-- The star: five pieces fly in, flash, hold, fly out (loop) -->
	<div
		class="absolute top-[calc((100%-var(--ah))/2)] right-0 aspect-video h-(--ah) max-[720px]:inset-0 max-[720px]:aspect-auto max-[720px]:h-auto"
	>
		<div class="absolute inset-0">
			<svg
				viewBox="0 0 960 540"
				preserveAspectRatio="xMidYMid slice"
				role="img"
				aria-label="Stellar star assembling from five pieces on the horizon"
				class="absolute inset-0 size-full overflow-visible max-[720px]:-top-[4%] max-[720px]:h-[60%]"
			>
				<g transform="translate({STAR.x} {STAR.y}) scale({STAR.s})">
					<!-- reflection below the horizon: a mirrored, fading copy of the star, shown while the star is whole -->
					<g class="animate-whole opacity-(--refl-op) motion-reduce:animate-none">
						<use href="#stellar-mark" fill="url(#reflect)" transform="translate(0 588) scale(1 -1)" />
					</g>
					<g class="star-glow">
						{#each PIECES as [clip, dx, dy], i (clip)}
							<g class="animate-collect motion-reduce:animate-none" style="--dx: {dx}px; --dy: {dy}px; animation-delay: {i * 0.14}s">
								<g clip-path="url(#{clip})"><use href="#stellar-mark" fill="url(#juice)" /></g>
							</g>
						{/each}
					</g>
					<!-- the complete star (solid + network + gloss): fades in only after all five pieces have met, and out before they split again -->
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
					<use href="#stellar-mark" fill="none" stroke-width="1.4" opacity=".55" class="animate-rim stroke-rim motion-reduce:animate-none" />
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

	<!-- Copy: starts at the horizon line. The headline sits above it, the text and buttons below (on phones everything sits at the bottom). -->
	<div
		class="absolute top-[calc((100%-var(--ah))/2+0.6111*var(--ah))] left-[max(4cqw,env(safe-area-inset-left))] z-[3] grid w-[calc(var(--u)*46)] gap-[calc(var(--u)*1.6)] max-[720px]:top-auto max-[720px]:right-[6cqw] max-[720px]:bottom-[8cqw] max-[720px]:left-[6cqw] max-[720px]:w-auto max-[720px]:gap-[3cqw]"
	>
		<h1
			class="absolute bottom-full m-0 pb-[calc(var(--u)*1.6)] font-head text-[length:calc(var(--u)*4.8)] leading-[1.02] font-bold tracking-[-0.015em] text-balance max-[720px]:static max-[720px]:pb-0 max-[720px]:text-[9cqw]"
		>
			Understand Your Platform. Then Decide How to Run It.
		</h1>
		<p class="max-w-[40ch] text-[length:max(15px,calc(var(--u)*1.5))] leading-normal text-fg-muted max-[720px]:text-[length:max(15px,3.6cqw)]">
			Full source code ownership. Modular architecture. Operate independently or with expert support.
		</p>
		<div class="flex flex-wrap gap-[calc(var(--u)*1)]">
			<a
				href="https://www.stellar.team/"
				target="_blank"
				rel="noopener"
				class="inline-flex min-h-11 items-center gap-[calc(var(--u)*0.6)] rounded-full bg-brand-field px-[calc(var(--u)*1.9)] py-[calc(var(--u)*1)] font-body text-[length:max(14px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-white no-underline max-[720px]:gap-2 max-[720px]:px-[4cqw] max-[720px]:py-[2.4cqw]"
			>
				Explore our services
				<svg class="size-4" aria-hidden="true"><use href="#i-arrow" /></svg>
			</a>
			<a
				href="https://www.stellar.team/"
				target="_blank"
				rel="noopener"
				class="inline-flex min-h-11 items-center rounded-full border border-line bg-tile px-[calc(var(--u)*1.9)] py-[calc(var(--u)*1)] font-body text-[length:max(14px,calc(var(--u)*1.25))] font-semibold whitespace-nowrap text-ink no-underline max-[720px]:px-[4cqw] max-[720px]:py-[2.4cqw]"
			>
				Book a consultation
			</a>
		</div>
	</div>

	<!-- Service-area strip along the bottom (desktop only) -->
	<div
		class="absolute inset-x-[4cqw] bottom-[calc(var(--u)*2.6)] z-[3] flex justify-between font-head text-[length:max(12px,calc(var(--u)*1.05))] font-semibold text-fg-muted max-[720px]:hidden"
	>
		<span>Platform Core</span>
		<span>Wallet &amp; Payments</span>
		<span>Engagement</span>
		<span>Betting &amp; Gaming</span>
		<span>Compliance</span>
		<span>Interfaces</span>
	</div>
</section>
