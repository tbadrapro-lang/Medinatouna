import Link from 'next/link'
import { CONFIG, waLink } from '@/lib/config'

export const metadata = {
  title: `Mentions légales — ${CONFIG.SITE_NAME}`,
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-void px-5 md:px-10 py-24">
      <div className="max-w-3xl mx-auto">
        <span className="section-label">Informations légales</span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-10">
          Mentions légales
        </h1>

        <div className="space-y-8 font-body text-sm text-ivory/70 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Éditeur du site</h2>
            <p>
              Le site {CONFIG.SITE_NAME} est édité par [PLACEHOLDER — nom de la société / auto-entrepreneur],
              immatriculé au [PLACEHOLDER — RCS / SIRET], dont le siège social est situé [PLACEHOLDER — adresse].
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Directeur de la publication</h2>
            <p>[PLACEHOLDER — nom du directeur de la publication]</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Contact</h2>
            <p>
              Email : <a href={`mailto:${CONFIG.EMAIL_CONTACT}`} className="text-gold hover:underline">{CONFIG.EMAIL_CONTACT}</a>
              <br />
              WhatsApp :{' '}
              <a
                href={waLink(CONFIG.WHATSAPP_FR, 'Bonjour, j\'ai une question concernant les mentions légales du site.')}
                target="_blank" rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                +33 7 64 85 04 14
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logos) est la propriété de
              {' '}{CONFIG.SITE_NAME} ou de ses partenaires, sauf mention contraire. Toute reproduction sans
              autorisation est interdite.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/" className="btn-outline">Retour à l&apos;accueil</Link>
        </div>
      </div>
    </main>
  )
}
