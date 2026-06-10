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
  {
    title: 'Suivez-nous',
    items: ['Instagram', 'Facebook', 'TikTok', 'WhatsApp'],
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
              href="https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20plus%20d%27informations"
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
