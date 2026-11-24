<script lang="ts">
	import { useI18n } from '../i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.footer);
	// Shared look of the links in the columns (underline grows on hover, the link nudges right)
	const colLink =
		"relative inline-flex min-h-11 w-max items-center gap-[calc(var(--u)*0.7)] font-head text-[length:max(15px,calc(var(--u)*1.4))] font-semibold text-inherit no-underline transition duration-[250ms] after:absolute after:bottom-[calc(var(--u)*0.35)] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:content-[''] hover:translate-x-[0.5cqw] hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none max-[720px]:text-[length:max(16px,4cqw)]";
	const icon = 'size-[max(16px,calc(var(--u)*1.3))] flex-none fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] max-[720px]:size-[max(16px,3.6cqw)]';
	// Text still to be filled in with real details
	const placeholder =
		'inline-block rounded-lg border border-dashed border-field-sep bg-[rgb(127_127_127/.08)] px-[calc(var(--u)*0.7)] py-[calc(var(--u)*0.2)] font-body text-[length:max(13px,calc(var(--u)*1.15))] font-medium text-field-dim max-[720px]:text-[length:max(13px,3.2cqw)]';
	const label = 'font-body text-[length:max(12px,calc(var(--u)*1.05))] font-bold tracking-[0.16em] text-brand uppercase mb-[calc(var(--u)*0.6)] max-[720px]:text-[length:max(12px,2.8cqw)]';
</script>

<footer
	id="footer"
	class="@container grid gap-[calc(var(--u)*4.5)] border-t border-line bg-field pt-[calc(var(--u)*6)] pr-[max(calc(var(--u)*5),env(safe-area-inset-right))] pb-[calc(var(--u)*3.4)] pl-[max(calc(var(--u)*5),env(safe-area-inset-left))] text-field-fg [--u:min(1cqw,16px)] max-[720px]:gap-[9cqw] max-[720px]:pt-[12cqw] max-[720px]:pb-[7cqw]"
>
	<div class="grid w-full max-w-[1180px] grid-cols-[1.4fr_1fr_1.1fr_1fr] gap-[calc(var(--u)*3.5)] justify-self-center max-[720px]:grid-cols-2 max-[720px]:gap-[7cqw]">
		<!-- Brand -->
		<div class="grid content-start gap-[calc(var(--u)*1.8)] max-[720px]:col-span-full">
			<a href={i18n.home} class="group inline-flex w-max items-center gap-[calc(var(--u)*1.1)] font-head text-[length:max(20px,calc(var(--u)*2.4))] font-extrabold tracking-[-0.015em] text-inherit no-underline max-[720px]:text-[length:max(26px,7cqw)]">
				<svg viewBox="34 35 442 259" class="block h-[calc(var(--u)*3)] w-[max(56px,calc(var(--u)*7))] [transform-box:fill-box] origin-[30%_55%] fill-brand transition-transform duration-[400ms] ease-[cubic-bezier(.3,1.6,.4,1)] group-hover:scale-110 group-hover:-rotate-12 motion-reduce:transition-none max-[720px]:h-[7cqw] max-[720px]:w-[16cqw]" aria-hidden="true">
					<use href="#stellar-mark" />
				</svg>
				Stellar Team
			</a>
			<p class="m-0 max-w-[30ch] text-[length:max(14px,calc(var(--u)*1.35))] leading-normal text-field-dim max-[720px]:text-[length:max(15px,3.6cqw)]">{t.tagline}</p>
			<div class="flex gap-[calc(var(--u)*0.8)]" aria-label={t.social}>
				{#each [['LinkedIn', 'https://www.linkedin.com/', 'i-in'], ['Facebook', 'https://www.facebook.com/', 'i-fb'], ['WhatsApp', 'https://www.whatsapp.com/', 'i-wa']] as [name, href, glyph] (name)}
					<a
						{href}
						target="_blank"
						rel="noopener"
						aria-label={name}
						class="inline-grid size-12 min-h-12 place-items-center rounded-full border-[1.5px] border-field-sep p-0 text-inherit transition duration-300 ease-[cubic-bezier(.3,1.6,.4,1)] hover:-translate-y-1 hover:-rotate-[8deg] hover:border-brand hover:bg-brand hover:text-white motion-reduce:transition-none"
					>
						<svg class="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><use href="#{glyph}" /></svg>
					</a>
				{/each}
			</div>
		</div>

		<!-- Company -->
		<nav class="grid content-start gap-[calc(var(--u)*0.7)] max-[720px]:gap-[1cqw]" aria-label={t.menu}>
			<span class={label}>{t.company}</span>
			<a href={i18n.link('about')} class={colLink}>{t.about}</a>
			<a href={i18n.link('services')} class={colLink}>{t.services}</a>
			<a href={i18n.link('operate')} class={colLink}>{t.operate}</a>
			<a href="https://www.stellar.team/" target="_blank" rel="noopener" class={colLink}>{t.faq}</a>
			<a href="https://www.stellar.team/" target="_blank" rel="noopener" class={colLink}>{t.resources}</a>
		</nav>

		<!-- Contact -->
		<div class="grid content-start gap-[calc(var(--u)*0.7)] max-[720px]:gap-[1cqw]">
			<span class={label}>{t.contact}</span>
			<a href="mailto:info@stellar.team" class="{colLink} select-all text-[length:max(16px,calc(var(--u)*1.7))] font-extrabold max-[720px]:text-[length:max(17px,4.4cqw)]">
				<svg class={icon} aria-hidden="true"><use href="#i-mail" /></svg>info@stellar.team
			</a>
			<a href={i18n.link('reach')} class={colLink}><svg class={icon} aria-hidden="true"><use href="#i-phone" /></svg><span class={placeholder}>{t.phone}</span></a>
			<a href={i18n.link('reach')} class={colLink}><svg class={icon} aria-hidden="true"><use href="#i-pin" /></svg><span class={placeholder}>{t.address}</span></a>
		</div>

		<!-- Legal -->
		<div class="grid content-start gap-[calc(var(--u)*0.7)] max-[720px]:gap-[1cqw]">
			<span class={label}>{t.legal}</span>
			<a href="https://www.stellar.team/privacy-policy" target="_blank" rel="noopener" class={colLink}>{t.privacy}</a>
			<a href="#footer" class={colLink}><span class={placeholder}>{t.terms}</span></a>
			<a href="#footer" class={colLink}><span class={placeholder}>{t.cookies}</span></a>
			<a href="https://www.stellar.team/accessibility-statement" target="_blank" rel="noopener" class={colLink}>{t.accessibility}</a>
		</div>
	</div>

	<!-- Bottom bar -->
	<div class="flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-[calc(var(--u)*2)] justify-self-center border-t border-field-sep pt-[calc(var(--u)*2.4)] font-body text-[length:max(13px,calc(var(--u)*1.15))] font-medium text-field-dim max-[720px]:gap-[4cqw] max-[720px]:pt-[5cqw] max-[720px]:text-[length:max(13px,3cqw)]">
		<span>{t.copyright} <span class={placeholder}>{t.entity}</span></span>
		<div class="inline-flex overflow-hidden rounded-full border-[1.5px] border-field-sep" aria-label={i18n.t.nav.langLabel}>
			<a href="/" lang="en" aria-current={i18n.lang === 'en' ? 'true' : undefined} class="inline-flex min-h-11 items-center px-[calc(var(--u)*1.2)] font-body font-semibold text-inherit no-underline max-[720px]:px-[3.4cqw] aria-[current=true]:bg-brand aria-[current=true]:text-white">EN</a>
			<a href="/tr" lang="tr" aria-current={i18n.lang === 'tr' ? 'true' : undefined} class="inline-flex min-h-11 items-center px-[calc(var(--u)*1.2)] font-body font-semibold text-inherit no-underline max-[720px]:px-[3.4cqw] aria-[current=true]:bg-brand aria-[current=true]:text-white">TR</a>
		</div>
		<a href="#main" class="group inline-flex min-h-11 items-center gap-[calc(var(--u)*0.7)] font-body font-semibold text-link no-underline">
			{t.top}
			<svg class="size-[max(14px,calc(var(--u)*1.2))] -rotate-90 transition-transform duration-300 group-hover:-rotate-90 group-hover:translate-x-[0.4cqw] motion-reduce:transition-none" aria-hidden="true"><use href="#i-arrow" /></svg>
		</a>
	</div>
</footer>
