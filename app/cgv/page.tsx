import Link from 'next/link'
import { CONFIG, waLink } from '@/lib/config'

export const metadata = {
  title: `Conditions générales de vente — ${CONFIG.SITE_NAME}`,
}

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-void px-5 md:px-10 py-24">
      <div className="max-w-3xl mx-auto">
        <span className="section-label">Informations légales</span>
        <h1 className="font-display text-4xl md:text-5xl font-semibold mt-4 mb-10">
          Conditions générales de vente
        </h1>

        <div className="space-y-8 font-body text-sm text-ivory/70 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">1. Services proposés</h2>
            <p>
              {CONFIG.SITE_NAME} propose à la vente différents services et formules, notamment :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Packs de séjour à l&apos;institut de langue arabe à Médine (Pack Été, Intensif, Famille)</li>
              <li>Expériences au camp bédouin dans le désert (Cavalier, Soirée, Premium)</li>
              <li>E-books et guides numériques (phrases essentielles, guide de l&apos;Omra, adresses confidentielles)</li>
              <li>Services additionnels : transferts, guides, location e-scooter, miel de Médine</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">2. Tarifs</h2>
            <p>
              Les prix sont indiqués en euros (€) ou en riyals saoudiens (SAR) selon le service, toutes taxes
              comprises. {CONFIG.SITE_NAME} se réserve le droit de modifier ses tarifs à tout moment, les
              prestations étant facturées sur la base du tarif en vigueur au moment de la confirmation de la
              commande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">3. Modalités de paiement</h2>
            <p>Le paiement peut s&apos;effectuer selon les modalités suivantes :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Par PayPal, via le lien fourni au moment de la réservation</li>
              <li>Par virement bancaire, les coordonnées (RIB) étant communiquées sur simple demande via WhatsApp</li>
              <li>Toute demande complémentaire peut être effectuée directement via WhatsApp</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">4. Politique d&apos;annulation</h2>
            <p className="border border-gold/20 bg-forest/20 p-4">
              Aucun remboursement ne pourra être effectué. Toutefois, dans certains cas et sous réserve de
              disponibilité, un avoir pourra être proposé afin de reporter le séjour sur une autre période.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">5. Délai de rétractation</h2>
            <p>
              Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne
              s&apos;applique pas aux contrats de prestations de services de voyage (hébergement, transport,
              restauration, loisirs) fournis à une date ou selon une périodicité déterminée. Les services
              proposés sur ce site relevant de cette catégorie, aucun droit de rétractation ne peut être exercé
              après confirmation de la commande.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ivory mb-2">6. Contact</h2>
            <p>
              Pour toute question relative à ces conditions générales de vente, vous pouvez nous contacter à
              l&apos;adresse <a href={`mailto:${CONFIG.EMAIL_CONTACT}`} className="text-gold hover:underline">{CONFIG.EMAIL_CONTACT}</a>{' '}
              ou via{' '}
              <a
                href={waLink(CONFIG.WHATSAPP_FR, "Bonjour, j'ai une question concernant les CGV du site.")}
                target="_blank" rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                WhatsApp
              </a>.
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
