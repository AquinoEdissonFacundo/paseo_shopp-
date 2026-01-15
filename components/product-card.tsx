"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito.`,
    })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/producto/${product.slug}`}>
        <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col hover:-translate-y-1">
          <CardContent className="p-0 relative">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {product.onSale && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="absolute left-2 top-2 bg-gradient-to-r from-destructive to-destructive/80 shadow-lg">
                    Oferta
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 sm:gap-3 p-3 sm:p-4 flex-1 bg-gradient-to-b from-card to-card/95">
            <div className="w-full flex-1">
              <h3 className="font-semibold text-sm sm:text-base text-foreground text-balance leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2 text-pretty">
                {product.description}
              </p>
            </div>
            <div className="flex w-full items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ${product.price.toLocaleString("es-PY")}
                </span>
                {product.onSale && product.originalPrice && (
                  <span className="text-xs sm:text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString("es-PY")}
                  </span>
                )}
                <span className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                  Stock: {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
                </span>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="gap-1.5 sm:gap-2 text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{product.stock === 0 ? "Sin stock" : "Agregar"}</span>
                </Button>
              </motion.div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
