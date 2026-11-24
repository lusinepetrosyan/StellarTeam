import type { Dict } from './en';

// Turkish text. Everything is in Turkish (formal "siz"); only brand and product names stay as they are: Stellar Team, iGaming, Sumsub, Telegram, Intercom, Payment GC.
export const tr: Dict = {
	meta: {
		title: 'Stellar Team – Modüler iGaming Platformu',
		description: 'Stellar Team, tam kaynak kod sahipliği sunan modüler bir iGaming sistemi sağlar. Bağımsız olarak veya uzman desteğiyle işletin.'
	},
	nav: {
		main: 'Ana menü',
		skip: 'İçeriğe geç',
		home: 'Stellar Team, sayfanın başına dön',
		services: 'Hizmetler',
		models: 'Modeller',
		resources: 'Kaynaklar',
		about: 'Hakkımızda',
		contact: 'İletişim',
		dark: 'Koyu',
		light: 'Açık',
		themeLabel: 'Açık ve koyu tema arasında geçiş yap',
		langLabel: 'Dil'
	},
	hero: {
		starLabel: 'Ufuk çizgisinde beş parçadan birleşen Stellar yıldızı',
		headline: ['Platformunuzu', 'Anlayın. Sonra', 'Nasıl İşleteceğinize', 'Karar Verin.'],
		sub: 'Tam kaynak kod sahipliği. Modüler mimari. Bağımsız olarak veya uzman desteğiyle işletin.',
		primary: 'Hizmetleri keşfedin',
		secondary: 'Görüşme planlayın',
		areasTitle: 'Platform alanları',
		areas: ['Platform Çekirdeği', 'Cüzdan ve Ödemeler', 'Etkileşim', 'Bahis ve Oyun', 'Uyumluluk', 'Arayüzler']
	},
	about: {
		kicker: 'Hakkımızda',
		title: 'Stellar Team Nedir?',
		sub: 'Stellar Team, tam kontrol isteyen operatörler için geliştirilmiş modüler bir iGaming sistemi sunar.',
		points: ['Altyapı', 'Sahiplik', 'Uygulamalı Bilgi'],
		card: 'Yalnızca bir yazılım edinmezsiniz. Sistemi, yapıyı ve onu işletmek için gereken bilgi birikimini edinirsiniz.',
		cta: 'Sistemi keşfedin'
	},
	services: {
		kicker: 'Hizmet Grupları',
		title: 'Sistemi işlevsel alanlara göre keşfedin.',
		sub: 'Her alan, platformunuzun nasıl çalıştığını belirleyen bir hizmet grubunu temsil eder.',
		includes: 'Kapsam',
		cta: 'Modeli keşfedin',
		region: 'Hizmet grupları',
		choose: 'Bir hizmet grubu seçin',
		slide: (i, n, name) => `${i} / ${n}: ${name}`,
		groups: [
			{ name: 'Platform Çekirdeği', text: 'Kimlik doğrulama, yapılandırma, yerelleştirme ve sistem mantığı.', inc: ['Kimlik Doğrulama', 'Yapılandırma', 'Yerelleştirme', 'Sistem Mantığı'] },
			{ name: 'Cüzdan, Ödemeler ve İşlemler', text: 'Bakiye mantığı, kasa operasyonları ve ödeme işleme.', inc: ['Muhasebe', 'Kasa', 'Ödeme Entegrasyonları', 'Payment GC'] },
			{ name: 'Etkileşim, Elde Tutma ve İletişim', text: 'Oyuncu iletişimi, oyuncu ilişkileri yönetimi ve oyuncuyu elde tutma araçları.', inc: ['Mesajlaşma', 'Bildirimler', 'Bonus', 'Oyuncu İlişkileri', 'Telegram', 'Intercom'] },
			{ name: 'Bahis ve Oyun Operasyonları', text: 'Spor bahisleri ve kazino mantığı.', inc: ['Kuponlar', 'Spor Bahisleri', 'Kazino Kontrolü', 'Kazananlar'] },
			{ name: 'Uyumluluk, Raporlama ve Denetim', text: 'Doğrulama, raporlama ve operasyonel izleme.', inc: ['Raporlama', 'Rapor Hesaplayıcı', 'Müşterini Tanı (Sumsub)'] },
			{ name: 'Arayüzler ve Deneyim Katmanı', text: 'Görünen ve operasyonel arayüzler.', inc: ['Web Sitesi', 'Yönetim Paneli'] }
		]
	},
	extra: {
		kicker: 'Ek Hizmetler',
		title: 'İhtiyacınız olanı, ihtiyacınız olduğunda ekleyin.',
		region: 'Ek hizmetler',
		prev: 'Önceki hizmet',
		next: 'Sonraki hizmet',
		choose: 'Bir hizmet seçin',
		slide: (i, n, name) => `${i} / ${n}: ${name}`,
		slides: [
			{
				name: 'Kazino Motoru',
				cta: 'Kazino Motorunu keşfedin',
				title: 'Kazinonuzu tam kontrol sahibi olduğunuz bir motorla güçlendirin.',
				text: 'Kazino içeriğini sahibi olduğunuz ve yapılandırdığınız bir motor üzerinde çalıştırın: oyun kontrolü, kazananlar ve limitler, bir sağlayıcının kontrolünde değil, kendi platformunuzun içinde yönetilir.'
			},
			{
				name: 'Oyuncu İlişkileri ve Bonuslar',
				cta: 'Oyuncu İlişkileri ve Bonusları keşfedin',
				title: 'Akıllı oyuncu yönetimiyle etkileşimi artırın.',
				text: 'Mesajlaşma, bildirimler, bonuslar ve oyuncu ilişkileri tek bir yerde; ekibiniz kimseyi beklemeden oyuncu yolculuğunu şekillendirebilir.'
			},
			{
				name: 'Üçüncü Taraf Araçlar',
				cta: 'Üçüncü Taraf Araçları keşfedin',
				title: 'Güvendiğiniz araçlarla özgürce entegre olun.',
				text: 'Ödeme, müşteri doğrulama, iletişim ve analiz araçları açık entegrasyonlar üzerinden bağlanır. Sizin altyapınız, sizin seçimleriniz, sağlayıcıya bağımlılık yok.'
			}
		]
	},
	operate: {
		kicker: 'Nasıl İşletirsiniz',
		title: 'Sistemi işletmenin birden fazla yolu.',
		cta: 'Modelleri keşfedin',
		models: [
			{ title: 'Kendi Yönetiminiz', line: 'Sistemi kendi ekibinizle işletin.', points: ['Tam kaynak kod sahipliği', 'Geliştirme üzerinde tam kontrol', 'Sağlayıcılara bağımlılık yok'] },
			{ title: 'Yönlendirmeli Sahiplik', line: 'Stellar Team ile harici teknoloji direktörü olarak çalışın.', points: ['Sürekli güncelleme ve iyileştirmeler', 'Teknik ve stratejik rehberlik', 'İhtiyaç duyduğunuzda destek'] }
		]
	},
	why: {
		kicker: 'Bu Yapı Neden Önemli',
		title: 'Bir platformu tanımlayan özellikleri değil, ne kadar iyi anlaşılabildiği, kontrol edilebildiği ve uyarlanabildiğidir.',
		cards: [
			{ title: 'Tam Kontrol', text: 'Sistemin nasıl çalışacağını siz belirlersiniz.' },
			{ title: 'Bağımlılık Yok', text: 'Bir sağlayıcıya bağlı kalmazsınız.' },
			{ title: 'Modüler Büyüme', text: 'Bileşenler birbirinden bağımsız gelişir.' },
			{ title: 'Performans', text: 'Anlık yükü ve trafik artışlarını kaldırır.' }
		]
	},
	stack: { title: 'Teknoloji Altyapımız' },
	reach: {
		kicker: 'Bize Ulaşın',
		title: 'Önce anlayarak başlayın. Sonra nasıl inşa edeceğinize karar verin.',
		sub: 'Sistemi ayrıntılı olarak keşfedin ya da bir görüşme başlatın.',
		cta: 'İletişime geçin'
	},
	footer: {
		tagline: 'Tam kontrol isteyen operatörler için geliştirilmiş modüler bir iGaming sistemi.',
		social: 'Sosyal medya profilleri',
		menu: 'Alt menü',
		company: 'Şirket',
		about: 'Hakkımızda',
		services: 'Hizmetler',
		operate: 'Nasıl İşletirsiniz',
		faq: 'SSS',
		resources: 'Kaynaklar',
		contact: 'İletişim',
		phone: '[ telefon numarası ]',
		address: '[ kayıtlı adres ]',
		legal: 'Yasal',
		privacy: 'Gizlilik Politikası',
		terms: 'Kullanım Koşulları',
		cookies: 'Çerez Politikası',
		accessibility: 'Erişilebilirlik Beyanı',
		copyright: '© 2026 Stellar Team ·',
		entity: '[ Tüzel kişi, sicil no. ]',
		top: 'Başa dön'
	}
};
