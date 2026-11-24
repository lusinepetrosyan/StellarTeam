// English text of the whole site. The Turkish file (tr.ts) must have exactly the same shape.
export const en = {
	meta: {
		title: 'Stellar Team – Modular iGaming Platform',
		description: 'Stellar Team provides a modular iGaming system with full source code ownership. Run it independently or with expert support.'
	},
	nav: {
		main: 'Main',
		skip: 'Skip to content',
		home: 'Stellar Team, back to top',
		services: 'Services',
		models: 'Models',
		resources: 'Resources',
		about: 'About',
		contact: 'Contact',
		dark: 'Dark',
		light: 'Light',
		themeLabel: 'Switch between light and dark theme',
		langLabel: 'Language'
	},
	hero: {
		starLabel: 'Stellar star assembling from five pieces on the horizon',
		headline: ['Understand Your', 'Platform. Then', 'Decide How to Run It.'],
		sub: 'Full source code ownership. Modular architecture. Operate independently or with expert support.',
		primary: 'Explore our services',
		secondary: 'Book a consultation',
		areasTitle: 'Platform areas',
		areas: ['Platform Core', 'Wallet & Payments', 'Engagement', 'Betting & Gaming', 'Compliance', 'Interfaces']
	},
	about: {
		kicker: 'About us',
		title: 'What Stellar Team is',
		sub: 'Stellar Team provides a modular iGaming system built for operators who want full control.',
		points: ['Infrastructure', 'Ownership', 'Practical Knowledge'],
		card: 'You do not just get software. You get the system, the structure, and the understanding required to run it.',
		cta: 'Explore the system'
	},
	services: {
		kicker: 'Service Groups',
		title: 'Explore the system by functional area.',
		sub: 'Each area represents a group of services that define how your platform operates.',
		includes: 'Includes',
		cta: 'Explore model',
		region: 'Service groups',
		choose: 'Choose a service group',
		slide: (i: number, n: number, name: string) => `${i} of ${n}: ${name}`,
		groups: [
			{ name: 'Platform Core', text: 'Authentication, configuration, localisation, and system logic.', inc: ['Authentication', 'Configuration', 'Localisation', 'System logic'] },
			{ name: 'Wallet, Payments, and Transactions', text: 'Balance logic, cashier operations, and payment processing.', inc: ['Accounting', 'Cashier', 'Payment Integrations', 'Payment GC'] },
			{ name: 'Engagement, Retention, and Communication', text: 'Player communication, CRM, and retention tools.', inc: ['Messaging', 'Notifications', 'Bonus', 'CRM', 'Telegram', 'Intercom'] },
			{ name: 'Betting and Gaming Operations', text: 'Sportsbook and casino logic.', inc: ['Tickets', 'Sports Bets', 'Casino Control', 'Winners'] },
			{ name: 'Compliance, Reporting, and Oversight', text: 'Verification, reporting, and operational monitoring.', inc: ['Reporting', 'Report Calculator', 'KYC (Sumsub)'] },
			{ name: 'Interfaces and Experience Layer', text: 'The visible and operational interfaces.', inc: ['Website', 'Admin Panel'] }
		]
	},
	extra: {
		kicker: 'Additional Services',
		title: 'Add what you need, when you need it.',
		region: 'Additional services',
		prev: 'Previous service',
		next: 'Next service',
		choose: 'Choose a service',
		slide: (i: number, n: number, name: string) => `${i} of ${n}: ${name}`,
		slides: [
			{
				name: 'Casino Engine',
				cta: 'Explore Casino Engine',
				title: 'Power your casino with a fully controlled engine.',
				text: 'Run casino content on an engine you own and configure: game control, winners, and limits handled inside your platform rather than behind a provider’s wall.'
			},
			{
				name: 'CRM and Bonuses',
				cta: 'Explore CRM and Bonuses',
				title: 'Drive engagement with intelligent player management.',
				text: 'Messaging, notifications, bonuses and CRM in one place, so your team can shape the player journey without waiting on anyone else.'
			},
			{
				name: 'Third Party Tools',
				cta: 'Explore Third Party Tools',
				title: 'Integrate freely with the tools you trust.',
				text: 'Payments, KYC, communication and analytics tools connect through open integrations. Your stack, your choices, no lock-in.'
			}
		]
	},
	operate: {
		kicker: 'How You Operate',
		title: 'Multiple ways to run the system.',
		cta: 'Explore Models',
		models: [
			{ title: 'Self-Managed Operation', line: 'Run the system with your in-house team.', points: ['Full source code ownership', 'Full control over development', 'No dependency on providers'] },
			{ title: 'Guided Ownership', line: 'Work with Stellar Team as an external CTO.', points: ['Ongoing updates and improvements', 'Technical and strategic guidance', 'Support when needed'] }
		]
	},
	why: {
		kicker: 'Why This Structure Matters',
		title: 'A platform is not defined by its features, but by how well it can be understood, controlled, and adapted.',
		cards: [
			{ title: 'Full Control', text: 'You define how the system works.' },
			{ title: 'No Dependency', text: 'You are not locked into a provider.' },
			{ title: 'Modular Growth', text: 'Components evolve independently.' },
			{ title: 'Performance', text: 'Handles real-time load and traffic spikes.' }
		]
	},
	stack: { title: 'Our Tech Stack' },
	reach: {
		kicker: 'Reach Out',
		title: 'Start by understanding. Then decide how to build.',
		sub: 'Explore the system in detail or start a conversation.',
		cta: 'Get in touch'
	},
	footer: {
		tagline: 'A modular iGaming system built for operators who want full control.',
		social: 'Social profiles',
		menu: 'Footer menu',
		company: 'Company',
		about: 'About',
		services: 'Services',
		operate: 'How You Operate',
		faq: 'FAQ',
		resources: 'Resources',
		contact: 'Contact',
		phone: '[ phone number ]',
		address: '[ registered address ]',
		legal: 'Legal',
		privacy: 'Privacy Policy',
		terms: 'Terms of Service',
		cookies: 'Cookie Policy',
		accessibility: 'Accessibility Statement',
		copyright: '© 2026 by Stellar Team ·',
		entity: '[ Legal entity, reg. no. ]',
		top: 'Back to top'
	}
};

export type Dict = typeof en;
