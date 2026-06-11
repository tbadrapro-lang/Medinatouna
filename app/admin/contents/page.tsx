'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Content = {
  id: string
  type: string
  titre: string
  sous_titre?: string
  description?: string
  prix?: string
  ancien_prix?: string
  badge?: string
  items: string[]
  image_url?: string
  ordre: number
  actif: boolean
  featured: boolean
}

const TYPE_LABELS: Record<string, string> = {
  pack_institut: 'Packs Institut',
  pack_camp: 'Packs Camp',
  ebook: 'E-books',
  bon_plan: 'Bons plans',
  transfert: 'Transferts',
}

const EMPTY: Omit<Content, 'id'> = {
  type: '',
  titre: '',
  sous_titre: '',
  description: '',
  prix: '',
  ancien_prix: '',
  badge: '',
  items: [],
  image_url: '',
  ordre: 0,
  actif: true,
  featured: false,
}

function ContentsInner() {
  const params = useSearchParams()
  const type = params.get('type') || 'pack_institut'

  const [items, setItems] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Content | (typeof EMPTY) | null>(null)
  const [itemsText, setItemsText] = useState('')

  function load() {
    setLoading(true)
    fetch(`/api/admin/contents?type=${type}`)
      .then((res) => res.json())
      .then((data) => setItems(data.contents || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    setEditing(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  function startNew() {
    setEditing({ ...EMPTY, type, ordre: items.length })
    setItemsText('')
  }

  function startEdit(item: Content) {
    setEditing(item)
    setItemsText((item.items || []).join('\n'))
  }

  async function save() {
    if (!editing) return
    const payload = {
      ...editing,
      items: itemsText.split('\n').map((s) => s.trim()).filter(Boolean),
    }

    const isNew = !('id' in editing) || !editing.id
    const res = await fetch('/api/admin/contents', {
      method: isNew ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setEditing(null)
      load()
    }
  }

  async function remove(id: string) {
    if (!confirm('Supprimer ce contenu ?')) return
    await fetch(`/api/admin/contents?id=${id}`, { method: 'DELETE' })
    load()
  }

  async function toggleActive(item: Content) {
    await fetch('/api/admin/contents', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, actif: !item.actif }),
    })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="font-display text-xl font-semibold">{TYPE_LABELS[type] || type}</h2>
        <button onClick={startNew} className="btn-gold text-sm">
          + Ajouter
        </button>
      </div>

      {editing && (
        <div
          className="rounded-xl border p-5 mb-6 grid gap-3"
          style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
        >
          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Titre"
              className="form-input"
              value={editing.titre}
              onChange={(e) => setEditing({ ...editing, titre: e.target.value })}
            />
            <input
              placeholder="Sous-titre"
              className="form-input"
              value={editing.sous_titre || ''}
              onChange={(e) => setEditing({ ...editing, sous_titre: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description"
            className="form-input resize-none"
            rows={3}
            value={editing.description || ''}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
          />
          <div className="grid md:grid-cols-3 gap-3">
            <input
              placeholder="Prix (ex: 29,90 €)"
              className="form-input"
              value={editing.prix || ''}
              onChange={(e) => setEditing({ ...editing, prix: e.target.value })}
            />
            <input
              placeholder="Ancien prix"
              className="form-input"
              value={editing.ancien_prix || ''}
              onChange={(e) => setEditing({ ...editing, ancien_prix: e.target.value })}
            />
            <input
              placeholder="Badge (ex: Disponible)"
              className="form-input"
              value={editing.badge || ''}
              onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
            />
          </div>
          <input
            placeholder="URL de l'image"
            className="form-input"
            value={editing.image_url || ''}
            onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
          />
          <textarea
            placeholder="Inclusions / caractéristiques (une par ligne)"
            className="form-input resize-none"
            rows={4}
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
          />
          <div className="grid md:grid-cols-3 gap-3 items-center">
            <input
              type="number"
              placeholder="Ordre"
              className="form-input"
              value={editing.ordre}
              onChange={(e) => setEditing({ ...editing, ordre: parseInt(e.target.value) || 0 })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.actif}
                onChange={(e) => setEditing({ ...editing, actif: e.target.checked })}
              />
              Actif
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              />
              Mis en avant
            </label>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="btn-gold text-sm">
              Enregistrer
            </button>
            <button onClick={() => setEditing(null)} className="btn-outline text-sm">
              Annuler
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-[#f4efe4]/60">Chargement...</p>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border p-4 flex items-center justify-between gap-4 flex-wrap"
              style={{ background: 'rgba(18, 48, 30, 0.4)', borderColor: 'rgba(196, 154, 60, 0.2)' }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold">{item.titre}</p>
                  {item.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-forest/60 border border-gold/20">{item.badge}</span>}
                  {item.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">★ Mis en avant</span>}
                  {!item.actif && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">Inactif</span>}
                </div>
                {item.prix && <p className="text-sm text-gold">{item.prix} {item.ancien_prix && <span className="text-[#f4efe4]/30 line-through ml-1">{item.ancien_prix}</span>}</p>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => toggleActive(item)} className="btn-outline text-xs">
                  {item.actif ? 'Désactiver' : 'Activer'}
                </button>
                <button onClick={() => startEdit(item)} className="btn-outline text-xs">
                  Modifier
                </button>
                <button onClick={() => remove(item.id)} className="text-xs px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-[#f4efe4]/50 text-center py-8">Aucun contenu pour ce type.</p>}
        </div>
      )}
    </div>
  )
}

export default function AdminContentsPage() {
  return (
    <Suspense fallback={<p className="text-[#f4efe4]/60">Chargement...</p>}>
      <ContentsInner />
    </Suspense>
  )
}
