'use client'

import { useRef, useState, DragEvent } from 'react'

export default function ImageUpload({
  value,
  onChange,
}: {
  value?: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  async function uploadFile(file: File) {
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Seules les images sont acceptées')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo trop lourde, max 5 Mo')
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const result = await new Promise<{ url?: string; error?: string }>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/admin/upload')
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
        }
        xhr.onload = () => {
          try {
            resolve(JSON.parse(xhr.responseText))
          } catch {
            reject(new Error('Réponse invalide'))
          }
        }
        xhr.onerror = () => reject(new Error('Erreur réseau'))
        xhr.send(formData)
      })

      if (result.error) {
        setError(result.error)
      } else if (result.url) {
        onChange(result.url)
      }
    } catch {
      setError("Erreur lors de l'upload")
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div>
      <label className="block text-sm text-[#f4efe4]/70 mb-2">Photo</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed p-4 flex flex-col items-center gap-3 text-center transition-colors ${
          dragOver ? 'border-gold bg-gold/5' : 'border-white/15'
        }`}
      >
        {value && (
          <img src={value} alt="Aperçu" className="w-full max-w-xs h-32 object-cover rounded-lg border border-gold/20" />
        )}

        {uploading ? (
          <div className="w-full max-w-xs">
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gold transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-[#f4efe4]/60 mt-1">Envoi en cours... {progress}%</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[#f4efe4]/60">Glissez une image ici, ou</p>
            <button type="button" onClick={() => inputRef.current?.click()} className="btn-outline text-sm">
              Choisir une photo
            </button>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) uploadFile(file)
          }}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  )
}
