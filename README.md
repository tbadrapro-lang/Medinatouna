# Les Bons Plans d'Arabie — lesbonsplansdarabie.com

Site Next.js 14 · Tailwind CSS · Supabase · Brevo

## Stack
- **Framework**: Next.js 14 (App Router)
- **CSS**: Tailwind CSS + animations custom
- **BDD/CRM**: Supabase (table `leads`)
- **Emails**: Brevo (transactionnel + relances)
- **Paiement**: WhatsApp + PayPal + virement RIB
- **Hébergement**: Vercel (site) + o2switch (emails pro)

## Services
1. Institut de langue arabe à Médine (Medinatouna)
2. Camp bédouin dans le désert (PrestaArabia)
3. E-books exclusifs
4. Catalogue Médine (miel, e-scooter, bons plans)

## Installation

```bash
npm install
cp .env.local.example .env.local
# Remplir les variables dans .env.local
npm run dev
```

## Variables d'environnement (.env.local)
Voir `.env.local.example` pour la liste complète.

## Supabase
Exécuter `supabase_setup.sql` dans l'éditeur SQL de Supabase.

## Déploiement
```bash
git push origin main
# Vercel déploie automatiquement
```

## DNS o2switch → Vercel
1. Ajouter le domaine dans Vercel Dashboard
2. Dans o2switch : A record → 76.76.21.21 (Vercel)
3. MX record → conserver les MX o2switch pour les emails

## Contact
WhatsApp: +33764850414
