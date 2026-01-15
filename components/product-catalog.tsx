"use client"

import { useState, useMemo, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { categories } from "@/lib/products"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Smartphone, Sparkles, Headphones, Gift } from "lucide-react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/types"

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("todas")
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/admin/products")
        const data = await res.json()

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products)
        } else {
          console.error("Error loading products:", data.error || "Unknown error")
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "todas" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, products])

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-balance text-center px-2">Catálogo Completo</h1>

        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 h-11 sm:h-12 text-sm sm:text-base md:text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 flex-wrap"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={selectedCategory === "todas" ? "default" : "outline"}
                onClick={() => setSelectedCategory("todas")}
                className={selectedCategory === "todas" ? "shadow-lg" : "bg-background/80 backdrop-blur-sm"}
              >
                Todas
              </Button>
            </motion.div>
            {categories.map((category, index) => {
              const getCategoryIcon = (slug: string) => {
                switch (slug) {
                  case "celulares":
                    return <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
                  case "perfumes":
                    return <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  case "accesorios":
                    return <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />
                  case "regalos":
                    return <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
                  default:
                    return null
                }
              }
              
              return (
                <motion.div
                  key={category.slug}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`flex items-center gap-2 ${selectedCategory === category.slug ? "shadow-lg" : "bg-background/80 backdrop-blur-sm"}`}
                  >
                    {getCategoryIcon(category.slug)}
                    {category.name}
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted-foreground">No se encontraron productos</p>
          </motion.div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
