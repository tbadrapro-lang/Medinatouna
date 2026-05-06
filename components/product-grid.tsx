"use client"

import Image from "next/image"
import { Plus, Flame } from "lucide-react"
import { useState } from "react"
import type { Product, Category } from "@/app/data/products"
import { CATEGORY_LABELS } from "@/app/data/products"
import { useCart } from "@/app/context/cart-context"

function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false)
  if (errored) {
    return (
      <div className="w-full h-full flex items-center justify-center text-5xl select-none">
        🍔
      </div>
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized
      onError={() => setErrored(true)}
    />
  )
}

interface ProductGridProps {
  products: Product[]
  activeCategory: Category | "all"
  searchQuery: string
}

export default function ProductGrid({ products, activeCategory, searchQuery }: ProductGridProps) {
  const { addToCart } = useCart()
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set())

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory
    const q = searchQuery.toLowerCase()
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  const handleAdd = (product: Product, asMenu = false) => {
    addToCart(product, asMenu)
    setAddedIds((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 1200)
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 font-semibold text-lg">Aucun produit trouvé</p>
      </div>
    )
  }

  // Group by category when showing "all"
  const grouped: Record<string, Product[]> =
    activeCategory === "all"
      ? filtered.reduce<Record<string, Product[]>>((acc, p) => {
          acc[p.category] = acc[p.category] ? [...acc[p.category], p] : [p]
          return acc
        }, {})
      : { [activeCategory]: filtered }

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([cat, prods]) => (
        <div key={cat}>
          {activeCategory === "all" && (
            <h2 className="text-white font-black uppercase tracking-wider text-xl mb-5 flex items-center gap-2">
              {CATEGORY_LABELS[cat as Category]}
              <span className="text-gray-600 text-sm font-normal">({prods.length})</span>
            </h2>
          )}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {prods.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                added={addedIds.has(product.id)}
                onAdd={handleAdd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProductCard({
  product,
  added,
  onAdd,
}: {
  product: Product
  added: boolean
  onAdd: (p: Product, asMenu?: boolean) => void
}) {
  return (
    <div className="group bg-[#1a1a1a] border border-[#2a2a2a] hover:border-red-800/60 rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.12)] hover:scale-[1.02]">
      {/* Image */}
      <div className="relative h-40 bg-[#111111] overflow-hidden">
        <ProductImage
          src={product.image}
          alt={product.name}
        />
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {product.isHalal && (
            <span className="bg-green-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              HALAL
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Flame className="w-2.5 h-2.5" /> Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-black uppercase tracking-wide text-sm mb-1 group-hover:text-red-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Prices */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-white font-bold text-base">
              {product.price.toFixed(2).replace(".", ",")}€
            </p>
            {product.menuPrice && (
              <p className="text-amber-500 text-xs font-medium">
                Menu : {product.menuPrice.toFixed(2).replace(".", ",")}€
              </p>
            )}
          </div>

          <div className="flex gap-1.5 flex-wrap justify-end">
            {product.menuPrice && (
              <button
                onClick={() => onAdd(product, true)}
                className="text-[10px] font-bold uppercase bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 border border-amber-600/30 px-2 py-1.5 rounded-lg transition-colors"
                aria-label={`Ajouter ${product.name} en menu`}
              >
                + Menu
              </button>
            )}
            <button
              onClick={() => onAdd(product, false)}
              className={`flex items-center gap-1 text-xs font-bold uppercase px-3 py-1.5 rounded-lg transition-all ${
                added
                  ? "bg-green-600 text-white scale-95"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-900/40"
              }`}
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <Plus className="w-3.5 h-3.5" />
              {added ? "Ajouté !" : "Ajouter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
