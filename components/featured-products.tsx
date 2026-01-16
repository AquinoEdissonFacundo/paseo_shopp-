"use client"

import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import type { Product } from "@/lib/types"

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/admin/products")
        const data = await res.json()

        if (data.success && Array.isArray(data.products)) {
          const featured = data.products.filter((p: Product) => p.featured)
          setFeaturedProducts(featured)
        } else {
          console.error("Error loading featured products:", data.error || "Unknown error")
        }
      } catch (error) {
        console.error("Error fetching featured products:", error)
      }
    }

    loadProducts()
  }, [])

  return (
    <section className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Mismo fondo fuerte que otras secciones principales */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#172026] via-[#027373] to-background" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(95,205,217,0.5),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,rgba(4,191,173,0.5),transparent_55%)]" />
      <div className="container mx-auto max-w-7xl relative w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-3 sm:gap-4"
        >
          <div className="flex-1 text-center sm:text-left w-full sm:w-auto">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent px-2 drop-shadow-lg">
              Productos Destacados
            </h2>
            <div className="h-1 w-12 xs:w-16 sm:w-20 bg-gradient-to-r from-primary to-accent mt-2 rounded-full mx-auto sm:mx-0" />
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:flex">
            <Button asChild variant="outline" className="bg-background/80 backdrop-blur-sm border-2">
              <Link href="/productos">Ver todo</Link>
            </Button>
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {featuredProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 sm:mt-8 flex justify-center md:hidden"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" size="lg" className="w-full max-w-xs sm:max-w-sm bg-background/80 backdrop-blur-sm border-2">
              <Link href="/productos">Ver todos los productos</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
