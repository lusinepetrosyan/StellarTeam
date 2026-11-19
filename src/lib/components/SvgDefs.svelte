<script lang="ts">
	import { STAR_PATH } from '../star-path';
</script>

<!-- Shared SVG definitions (mark, clips, gradients, icons). Render once in the root layout; use with <use href="#id" />. -->
<svg width="0" height="0" class="absolute" aria-hidden="true" focusable="false">
	<defs>
		<path id="stellar-mark" d={STAR_PATH} />
		<clipPath id="mark-clip"><use href="#stellar-mark" /></clipPath>

		<!-- Five wedges used to cut the star into pieces for the hero animation -->
		<clipPath id="w1"><polygon points="170,165 -359,-563 170,-735 699,-563" /></clipPath>
		<clipPath id="w2"><polygon points="170,165 699,-563 1026,-113 1026,443" /></clipPath>
		<clipPath id="w3"><polygon points="170,165 1026,443 699,893 170,1065" /></clipPath>
		<clipPath id="w4"><polygon points="170,165 170,1065 -359,893 -686,443" /></clipPath>
		<clipPath id="w5"><polygon points="170,165 -686,443 -686,-113 -359,-563" /></clipPath>

		<radialGradient id="juice" gradientUnits="userSpaceOnUse" cx="140" cy="120" r="190">
			<stop offset="0" stop-color="#ff7a7e" />
			<stop offset=".45" stop-color="#E8202A" />
			<stop offset="1" stop-color="#7a0a12" />
		</radialGradient>
		<linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#fff" stop-opacity=".6" />
			<stop offset="1" stop-color="#fff" stop-opacity="0" />
		</linearGradient>
		<linearGradient id="reflect" gradientUnits="userSpaceOnUse" x1="0" y1="294" x2="0" y2="110">
			<stop offset="0" stop-color="#E8202A" stop-opacity=".45" />
			<stop offset="1" stop-color="#E8202A" stop-opacity="0" />
		</linearGradient>
		<radialGradient id="horizon" cx=".55" cy="1" r=".75">
			<stop offset="0" stop-color="#E8202A" stop-opacity="1" />
			<stop offset="1" stop-color="#E8202A" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="flash-grad">
			<stop offset="0" stop-color="#fff" />
			<stop offset=".3" stop-color="#ffd3d5" />
			<stop offset="1" stop-color="#E8202A" stop-opacity="0" />
		</radialGradient>

		<!-- Icons (add the rest from the design here as sections need them) -->
		<symbol id="i-arrow" viewBox="0 0 24 24">
			<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
		</symbol>
	</defs>
</svg>
