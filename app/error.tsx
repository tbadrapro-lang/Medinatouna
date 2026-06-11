'use client'

import { useEffect } from 'react'
import { CONFIG, waLink } from '@/lib/config'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-void flex flex-col items-center justify-center px-5 text-center">
      <p className="font-arabic text-6xl md:text-7xl text-gold arabic-glow mb-6" dir="rtl">خطأ</p>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-ivory mb-3">
        Une erreur est survenue
      </h1>
      <p className="font-body text-ivory/60 mb-8 max-w-md">
        Quelque chose s&apos;est mal passé. Vous pouvez réessayer ou nous contacter directement sur WhatsApp,
        nous répondons sous 24h.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button onClick={() => reset()} className="btn-gold">
          Réessayer
        </button>
        <a
          href={waLink(CONFIG.WHATSAPP_FR, "Bonjour, j'ai rencontré une erreur sur le site, pouvez-vous m'aider ?")}
          target="_blank" rel="noopener noreferrer"
          className="btn-outline"
        >
          Contacter sur WhatsApp
        </a>
      </div>
    </main>
  )
}
