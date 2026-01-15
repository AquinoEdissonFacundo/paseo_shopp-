"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return

    let message = "Hola! Quiero hacer este pedido:\n\n"
    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString("es-PY")}\n`
    })
    message += `\n*TOTAL: $${getTotalPrice().toLocaleString("es-PY")}*`

    // Replace with actual Paraguay WhatsApp number (format: 595XXXXXXXXX)
    const whatsappNumber = "595XXXXXXXXX"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (cart.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-lg text-muted-foreground mb-8">Explorá nuestro catálogo y encontrá lo que buscás</p>
          <Button asChild size="lg">
            <Link href="/productos">Ver productos</Link>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Tu Carrito</h1>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/producto/${item.slug}`}
                      className="font-semibold hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-lg font-bold text-primary mt-1">${item.price.toLocaleString("es-PY")}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stock disponible: {item.stock} {item.stock === 1 ? "unidad" : "unidades"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-3xl font-bold text-primary">${getTotalPrice().toLocaleString("es-PY")}</span>
            </div>
            <Button onClick={handleSendWhatsApp} size="lg" className="w-full text-lg h-14">
              Enviar pedido por WhatsApp
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Te redirigiremos a WhatsApp para confirmar tu pedido
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
