import Link from 'next/link'
import { CONFIG } from '@/lib/config'

export const metadata = {
  title: `Politique de confidentialité — ${CONFIG.SITE_NAME}`,
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-void px-5 md:px-10 py-24">
      <div className="max-w-3xl mx-auto">
        <span className="section-label">Informations légales</span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-10">
          Politique de confidentialité
        </h1>

        <div className="space-y-8 font-body text-sm text-ivory/70 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Données collectées</h2>
            <p>
              Lorsque vous utilisez nos formulaires de contact, de réservation ou d&apos;inscription, nous
              collectons les données suivantes : nom, adresse email, numéro WhatsApp, ainsi que les informations
              relatives à votre demande (formule choisie, dates souhaitées, nombre de personnes, message).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Finalité du traitement</h2>
            <p>
              Ces données sont utilisées exclusivement pour traiter votre demande, vous recontacter (par email
              ou WhatsApp) au sujet de nos services, et assurer le suivi de votre dossier (institut, camp
              bédouin, e-books, autres prestations).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Durée de conservation</h2>
            <p>
              Vos données sont conservées pour une durée maximale de 3 ans à compter de votre dernier contact
              avec nous, sauf obligation légale de conservation plus longue.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un
              droit d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition au
              traitement de vos données personnelles. Pour exercer ces droits, contactez-nous à l&apos;adresse{' '}
              <a href={`mailto:${CONFIG.EMAIL_CONTACT}`} className="text-gold hover:underline">{CONFIG.EMAIL_CONTACT}</a>.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Sous-traitants</h2>
            <p>
              Dans le cadre du traitement de vos données, nous faisons appel aux prestataires suivants :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-ivory">Supabase</strong> — hébergement de la base de données des demandes</li>
              <li><strong className="text-ivory">Brevo</strong> — envoi des emails transactionnels et de confirmation</li>
              <li><strong className="text-ivory">Vercel</strong> — hébergement du site internet</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">Cookies</h2>
            <p>
              Ce site utilise des cookies techniques nécessaires à son fonctionnement ainsi que des outils de
              mesure d&apos;audience anonymisés (Vercel Analytics), ne permettant pas de vous identifier
              personnellement.
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
