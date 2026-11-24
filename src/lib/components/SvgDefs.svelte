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
		<symbol id="i-wallet" viewBox="0 0 24 24">
			<rect x="3" y="6" width="18" height="13" rx="2" />
			<path d="M3 10h18" />
			<circle cx="16.5" cy="14.5" r="1.2" />
		</symbol>
		<symbol id="i-chat" viewBox="0 0 24 24">
			<path d="M4 5h16v10H9l-5 4z" />
			<path d="M8 9h8M8 12h5" />
		</symbol>
		<symbol id="i-igame" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="9.5" />
			<circle cx="12" cy="12" r="6" />
			<path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
			<path d="M9.6 9.3h4.8l-2.6 5.6" />
		</symbol>
		<symbol id="i-shield" viewBox="0 0 24 24">
			<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
			<path d="M9 12l2 2 4-4" />
		</symbol>
		<symbol id="i-screen" viewBox="0 0 24 24">
			<rect x="3" y="4" width="18" height="12" rx="2" />
			<path d="M8 20h8M12 16v4" />
		</symbol>
		<symbol id="i-plug" viewBox="0 0 24 24">
			<path d="M9 3v5M15 3v5" />
			<path d="M6 8h12v4a6 6 0 0 1-12 0z" />
			<path d="M12 18v3" />
		</symbol>
		<symbol id="i-dice" viewBox="0 0 24 24">
			<rect x="4" y="4" width="16" height="16" rx="3" />
			<path d="M9 9h.01M15 9h.01M12 12h.01M9 15h.01M15 15h.01" />
		</symbol>
		<symbol id="i-cards" viewBox="0 0 24 24">
			<rect x="7" y="4" width="11" height="15" rx="2" transform="rotate(8 12.5 11.5)" />
			<rect x="5" y="6" width="11" height="15" rx="2" transform="rotate(-8 10.5 13.5)" />
		</symbol>
		<symbol id="i-chipc" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="8" />
			<circle cx="12" cy="12" r="3.5" />
			<path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
		</symbol>
		<symbol id="i-people" viewBox="0 0 24 24">
			<circle cx="12" cy="8" r="3" />
			<circle cx="5.5" cy="10" r="2" />
			<circle cx="18.5" cy="10" r="2" />
			<path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
			<path d="M2 18c0-2 1.5-3.5 3.5-3.5M22 18c0-2-1.5-3.5-3.5-3.5" />
		</symbol>
		<symbol id="i-gift" viewBox="0 0 24 24">
			<rect x="4" y="9" width="16" height="11" rx="2" />
			<path d="M4 13h16M12 9v11M12 9c-2-4-6-4-6-1s4 1 6 1zm0 0c2-4 6-4 6-1s-4 1-6 1z" />
		</symbol>
		<symbol id="i-bell" viewBox="0 0 24 24">
			<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" />
			<path d="M10 20a2 2 0 0 0 4 0" />
		</symbol>
		<symbol id="i-wave" viewBox="0 0 24 24">
			<path d="M2 14c3-6 6-6 9 0s6 6 9 0" />
			<path d="M2 18c3-6 6-6 9 0s6 6 9 0" opacity=".5" />
		</symbol>
		<symbol id="i-bars" viewBox="0 0 24 24"><path d="M5 20V12M10 20V6M15 20V10M20 20V4" /></symbol>
		<symbol id="i-chart" viewBox="0 0 24 24">
			<path d="M3 18l5-6 4 3 5-7 4 4" />
			<path d="M3 21h18" />
		</symbol>
		<symbol id="i-card" viewBox="0 0 24 24">
			<rect x="3" y="6" width="18" height="12" rx="2" />
			<path d="M3 10h18M7 15h4" />
		</symbol>
		<symbol id="i-globe" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
		</symbol>
		<symbol id="i-help" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="9" />
			<path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 1-1 1.7M12 17h.01" />
		</symbol>
		<symbol id="i-mail" viewBox="0 0 24 24">
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<path d="M3 7l9 6 9-6" />
		</symbol>
		<symbol id="i-phone" viewBox="0 0 24 24">
			<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
		</symbol>
		<symbol id="i-pin" viewBox="0 0 24 24">
			<path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
			<circle cx="12" cy="10" r="2.5" />
		</symbol>
		<symbol id="i-in" viewBox="0 0 24 24">
			<rect x="3" y="9" width="4" height="12" />
			<circle cx="5" cy="5" r="2" />
			<path d="M10 21v-7a3 3 0 0 1 6 0v7M10 9v12M16 21v-7" />
		</symbol>
		<symbol id="i-fb" viewBox="0 0 24 24">
			<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
		</symbol>
		<symbol id="i-wa" viewBox="0 0 24 24">
			<path d="M4 20l1.5-4A8 8 0 1 1 8.5 19z" />
			<path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z" />
		</symbol>
		<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
		<symbol id="i-compass" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="9" />
			<path d="M15.5 8.5l-2 5-5 2 2-5z" />
		</symbol>
		<symbol id="i-chip" viewBox="0 0 24 24">
			<rect x="7" y="7" width="10" height="10" rx="2" />
			<path d="M10 2v5M14 2v5M10 17v5M14 17v5M2 10h5M2 14h5M17 10h5M17 14h5" />
		</symbol>
		<symbol id="i-core" viewBox="0 0 24 24">
			<circle cx="12" cy="12" r="3" />
			<path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
		</symbol>
		<symbol id="i-key" viewBox="0 0 24 24">
			<circle cx="8" cy="12" r="4" />
			<path d="M12 12h9M18 12v3M15 12v2" />
		</symbol>
		<symbol id="i-book" viewBox="0 0 24 24">
			<path d="M4 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H4z" />
			<path d="M20 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z" />
		</symbol>
		<symbol id="i-arrow" viewBox="0 0 24 24">
			<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
		</symbol>
	</defs>
</svg>
