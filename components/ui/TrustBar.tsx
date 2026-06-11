const ITEMS = [
  { value: '⭐ 5,0/5', label: 'sur Google' },
  { value: '👥 +200', label: 'étudiants formés' },
  { value: '🎓 Agréé', label: "par l'État" },
  { value: '🕋 Omra', label: 'incluse' },
]

export default function TrustBar() {
  return (
    <div className="bg-[#0c1d14] border-y border-gold/15 py-4">
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-around gap-6 overflow-x-auto">
        {ITEMS.map((item) => (
          <div key={item.label} className="text-center flex-shrink-0">
            <p className="font-display text-gold">{item.value}</p>
            <p className="text-ivory/50 text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
