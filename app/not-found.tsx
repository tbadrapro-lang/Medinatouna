import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-void flex flex-col items-center justify-center px-5 text-center">
      <p className="font-arabic text-7xl md:text-8xl text-gold arabic-glow mb-6" dir="rtl">٤٠٤</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ivory mb-3">
        Page introuvable
      </h1>
      <p className="font-body text-ivory/60 mb-8 max-w-md">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn-gold">
        Retour à l&apos;accueil
      </Link>
    </main>
  )
}
