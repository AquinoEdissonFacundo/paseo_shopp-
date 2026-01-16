"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"
import { ShoppingCart, MessageCircle, ChevronLeft } from "lucide-react"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Asegurar al menos una imagen (Airtable puede devolver images: [] pero image principal sí existe)
  const images =
    product.images && product.images.length > 0 ? product.images : [product.image]

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  const handleWhatsAppInquiry = () => {
    const message = `Hola! Me interesa este producto: ${product.name} - $${product.price.toLocaleString("es-PY")}`
    // Replace with actual Paraguay WhatsApp number (format: 595XXXXXXXXX)
    const whatsappNumber = "595XXXXXXXXX"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <Link
          href="/productos"
          className="inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground mb-4 sm:mb-6 md:mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.onSale && (
                <Badge className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-destructive text-xs sm:text-sm">
                  Oferta
                </Badge>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden bg-muted border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} vista ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance">{product.name}</h1>
              <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6 flex-wrap">
                <span className="text-4xl sm:text-5xl md:text-6xl font-bold">${product.price.toLocaleString("es-PY")}</span>
                {product.onSale && product.originalPrice && (
                  <span className="text-xl sm:text-2xl text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString("es-PY")}
                  </span>
                )}
              </div>
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-medium">Stock disponible:</span> {product.stock} {product.stock === 1 ? "unidad" : "unidades"}
                </p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6">
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full text-base sm:text-lg h-12 sm:h-14"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {product.stock === 0 ? "Sin stock" : "Agregar al carrito"}
              </Button>
              <Button
                onClick={handleWhatsAppInquiry}
                variant="outline"
                size="lg"
                className="w-full text-base sm:text-lg h-12 sm:h-14 bg-transparent"
              >
                <svg
                  className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Consultar por WhatsApp
              </Button>
            </div>

            <div className="pt-4 sm:pt-6 border-t space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <p>✓ Envíos a todo Paraguay</p>
              <p>✓ Atención personalizada por WhatsApp</p>
              <p>✓ Productos originales con garantía</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
