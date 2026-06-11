const LINKS = [
  {
    title: 'Programmes',
    items: ['Institut de langue', 'Camp bédouin', 'E-books', 'Catalogue'],
  },
  {
    title: 'Informations',
    items: ['À propos', 'Témoignages', 'FAQ', 'Contact'],
  },
  {
    title: 'Légal',
    items: ['Mentions légales', 'CGV', 'Confidentialité', 'Cookies'],
  },
]

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6 5.82c-1.01-.88-1.6-2.15-1.6-3.55h-3.07v13.7a2.7 2.7 0 11-2.7-2.7c.27 0 .53.04.78.11V10.3a6.34 6.34 0 00-.78-.05A5.78 5.78 0 003.45 16a5.78 5.78 0 0010.55 3.27c.92-1.36 1.42-2.96 1.42-4.6V8.83a8.8 8.8 0 005.13 1.65V7.41c-1.6 0-3.07-.55-4.16-1.59-.34-.32-.6-.65-.79-1z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z" />
  </svg>
)

const SOCIALS = [
  { label: 'Instagram', href: '#', icon: <InstagramIcon /> },
  { label: 'Facebook', href: '#', icon: <FacebookIcon /> },
  { label: 'TikTok', href: '#', icon: <TikTokIcon /> },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services%20%28institut%20de%20langue%2C%20camp%20b%C3%A9douin%2C%20e-books%29.%20Pourriez-vous%20me%20contacter%20%3F%20Merci.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-night px-6 pt-24 pb-10 overflow-hidden">
      {/* Geometric islamic pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23c49a3c' stroke-width='1'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='28'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* CTA final */}
        <div className="text-center mb-16">
          <p className="font-arabic text-2xl text-gold mb-4" dir="rtl">
            السلام عليكم
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8 max-w-2xl mx-auto">
            Prêt à vivre l&apos;Arabie <em className="italic text-gold">autrement</em> ?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#institut" className="btn-gold">
              Rejoindre l&apos;institut
            </a>
            <a
              href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20obtenir%20des%20informations%20sur%20vos%20services%20%28institut%20de%20langue%2C%20camp%20b%C3%A9douin%2C%20e-books%29.%20Pourriez-vous%20me%20contacter%20%3F%20Merci."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp direct
            </a>
          </div>
        </div>

        {/* Separator */}
        <div
          className="h-px w-full mb-16"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          }}
        />

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-white/5 pt-16 pb-10">
          {LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg font-semibold mb-4 text-ivory">{col.title}</h3>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-body text-sm text-ivory/60 hover:text-gold transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-ivory">Suivez-nous</h3>
            <div className="flex items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-ivory/60 hover:text-gold hover:border-gold/40 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="font-body text-xs text-ivory/40">
            © {new Date().getFullYear()} Les Bons Plans d&apos;Arabie. Tous droits réservés. — Site réalisé par Proxia IA
          </p>
        </div>
      </div>
    </footer>
  )
}
