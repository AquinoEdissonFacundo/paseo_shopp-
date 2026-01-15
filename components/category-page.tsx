"use client"

import { ProductCard } from "@/components/product-card"
import { getProductsByCategory } from "@/lib/products"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"
import type { Category } from "@/lib/types"

interface CategoryPageProps {
  category: Category
}

export function CategoryPage({ category }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts() {
      const categoryProducts = await getProductsByCategory(category.slug)
      setProducts(categoryProducts)
    }
    loadProducts()
  }, [category.slug])

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{category.name}</h1>
          <p className="text-xl text-muted-foreground text-balance">{category.description}</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No hay productos disponibles en esta categoría</p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {products.length} {products.length === 1 ? "producto" : "productos"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
