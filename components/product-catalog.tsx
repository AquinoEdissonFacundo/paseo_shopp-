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
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl w-full">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-balance text-center px-2">Catálogo Completo</h1>

        <div className="mb-4 sm:mb-6 md:mb-8 space-y-3 sm:space-y-4">
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
              className="pl-9 sm:pl-10 h-10 sm:h-11 md:h-12 text-sm sm:text-base md:text-lg bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-2 flex-wrap justify-center sm:justify-start"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={selectedCategory === "todas" ? "default" : "outline"}
                onClick={() => setSelectedCategory("todas")}
                size="sm"
                className={`text-xs sm:text-sm ${selectedCategory === "todas" ? "shadow-lg" : "bg-background/80 backdrop-blur-sm"}`}
              >
                Todas
              </Button>
            </motion.div>
            {categories.map((category, index) => {
              const getCategoryIcon = (slug: string) => {
                switch (slug) {
                  case "celulares":
                    return <Smartphone className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  case "perfumes":
                    return <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  case "accesorios":
                    return <Headphones className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  case "regalos":
                    return <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
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
                    size="sm"
                    className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm ${selectedCategory === category.slug ? "shadow-lg" : "bg-background/80 backdrop-blur-sm"}`}
                  >
                    {getCategoryIcon(category.slug)}
                    <span className="hidden xs:inline">{category.name}</span>
                    <span className="xs:hidden">{category.name.substring(0, 3)}</span>
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
            className="text-center py-8 sm:py-12"
          >
            <p className="text-lg sm:text-xl text-muted-foreground">No se encontraron productos</p>
          </motion.div>
        ) : (
          <>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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
