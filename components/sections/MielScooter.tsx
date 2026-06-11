'use client'

const MIEL_WA = 'https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20commander%20du%20miel%20authentique%20de%20M%C3%A9dine.%20Pouvez-vous%20m%27indiquer%20les%20vari%C3%A9t%C3%A9s%20disponibles%2C%20les%20tarifs%20et%20les%20modalit%C3%A9s%20de%20livraison%20en%20France%20%3F%20Merci.'
const SCOOTER_WA = 'https://wa.me/33764850414?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20e-scooter%20%C3%A0%20M%C3%A9dine%20pour%20mon%20s%C3%A9jour.%20Pouvez-vous%20m%27indiquer%20les%20dates%20disponibles%20et%20les%20conditions%20de%20location%20%3F%20Merci.'

export default function MielScooter() {
  return (
    <section id="miel-scooter" className="relative py-20 md:py-28 px-5 md:px-10 bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label justify-center">Produits &amp; Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-4">
            Miel &amp; E-Scooter
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Miel */}
          <div className="pack-card p-8 flex flex-col">
            <div className="text-5xl mb-4">🍯</div>
            <h3 className="font-display text-2xl font-semibold mb-3">
              Miel de Médine — Authentique d&apos;Arabie
            </h3>
            <p className="font-body text-sm text-ivory/70 mb-4 flex-1">
              Découvrez nos variétés de miel pur récolté en Arabie Saoudite : Sidr, Acacia et Samar.
              Sélectionné directement auprès d&apos;apiculteurs de Médine pour sa qualité et son goût
              authentique, ce miel rare est réputé pour ses bienfaits exceptionnels.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Qualité premium', 'Sélectionné à Médine', 'Livraison France'].map((b) => (
                <span key={b} className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-forest/50 border border-white/5 text-ivory/80">
                  {b}
                </span>
              ))}
            </div>
            <p className="font-display text-lg text-gold mb-4">Sur devis selon variété et quantité</p>
            <a href={MIEL_WA} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
              Commander sur WhatsApp
            </a>
          </div>

          {/* E-Scooter */}
          <div className="pack-card p-8 flex flex-col">
            <div className="text-5xl mb-4">🛴</div>
            <h3 className="font-display text-2xl font-semibold mb-3">
              Location E-Scooter à Médine
            </h3>
            <p className="font-body text-sm text-ivory/70 mb-4 flex-1">
              Déplacez-vous librement à Médine pendant tout votre séjour grâce à notre service de
              location d&apos;e-scooter. Formule pratique pour 29 jours/mois, idéale pour rejoindre la
              mosquée, vos hébergements et les lieux de visite en toute autonomie.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Livraison à l'hébergement", 'Tarif transparent', 'Disponible sur réservation'].map((b) => (
                <span key={b} className="text-xs uppercase tracking-wider px-3 py-1.5 rounded-full bg-forest/50 border border-white/5 text-ivory/80">
                  {b}
                </span>
              ))}
            </div>
            <p className="font-display text-2xl text-gold mb-4">160 € / mois</p>
            <a href={SCOOTER_WA} target="_blank" rel="noopener noreferrer" className="btn-gold w-full justify-center">
              Réserver sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
