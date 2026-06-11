'use client'
import { useState } from 'react'

export default function SafeImage({ src, alt, className, fallbackText = 'مدينة' }:
  { src: string; alt: string; className?: string; fallbackText?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#12301e] to-[#040d08] ${className}`}>
        <span className="font-serif text-4xl text-[#c49a3c]/15 select-none">{fallbackText}</span>
      </div>
    )
  }
  return (
    <img src={src} alt={alt} className={className} loading="lazy"
      onError={() => setFailed(true)} />
  )
}
