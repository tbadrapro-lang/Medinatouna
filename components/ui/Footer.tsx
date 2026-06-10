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
    <footer className="relative bg-night px-6 pt-24 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* CTA final */}
        <div className="text-center mb-20">
          <p className="font-arabic text-2xl md:text-3xl text-gold mb-4" dir="rtl">
            مرحبا بكم في المدينة المنورة
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8 max-w-2xl mx-auto">
            Prêt à vivre votre aventure en Arabie ?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#institut" className="btn-gold">
              Rejoindre l&apos;institut
            </a>
            <a href="#camp" className="btn-outline">
              Réserver le camp
            </a>
          </div>
        </div>

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
