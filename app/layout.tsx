import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Noto_Naskh_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ConfigProvider } from '@/components/ConfigProvider'
import { getEffectiveConfig } from '@/lib/getSettings'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lesbonsplansdarabie.com'),
  title: "Les Bons Plans d'Arabie — Institut langue arabe, Camp bédouin, Omra Médine",
  description:
    "Institut de langue arabe agréé à Médine, camp bédouin dans le désert, e-books et adresses confidentielles. Omra incluse, professeurs natifs.",
  openGraph: {
    title: "Les Bons Plans d'Arabie — Institut langue arabe, Camp bédouin, Omra Médine",
    description:
      "Institut de langue arabe agréé à Médine, camp bédouin dans le désert, e-books et adresses confidentielles. Omra incluse, professeurs natifs.",
    url: 'https://lesbonsplansdarabie.com',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = await getEffectiveConfig()
  return (
    <html lang="fr">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${notoNaskhArabic.variable} bg-[#07110c] text-[#f4efe4] antialiased overflow-x-hidden`}
      >
        <ConfigProvider config={config}>{children}</ConfigProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: "Les Bons Plans d'Arabie",
              url: 'https://lesbonsplansdarabie.com',
              description:
                "Institut de langue arabe agréé à Médine, camp bédouin dans le désert, e-books et adresses confidentielles. Omra incluse, professeurs natifs.",
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Médine',
                addressCountry: 'SA',
              },
              areaServed: 'SA',
              priceRange: '€€',
            }),
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
