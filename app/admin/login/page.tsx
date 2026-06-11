'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('Mot de passe incorrect.')
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07110c] px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/logo.jpg"
            alt="Les Bons Plans d'Arabie"
            width={64}
            height={64}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid rgba(196,154,60,.4)',
              boxShadow: '0 0 16px rgba(196,154,60,.25)',
              margin: '0 auto 16px',
            }}
          />
          <h1 className="font-display text-2xl font-semibold text-[#f4efe4]">
            Dashboard Admin
          </h1>
          <p className="text-sm text-[#f4efe4]/60 mt-1">Les Bons Plans d&apos;Arabie</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-6"
          style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
        >
          <label className="block text-sm text-[#f4efe4]/70 mb-2">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="form-input w-full mb-4"
            placeholder="••••••••"
          />

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
