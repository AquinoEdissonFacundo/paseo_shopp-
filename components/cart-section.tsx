"use client"

import { Trash2, Plus, Minus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function CartSection() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

  const sendToWhatsApp = () => {
    if (cart.length === 0) return

    let message = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n"

    cart.forEach((item) => {
      message += `• ${item.name}\n`
      message += `  Cantidad: ${item.quantity}\n`
      message += `  Precio: $${(item.price * item.quantity).toLocaleString("es-PY")}\n\n`
    })

    message += `Total: $${totalPrice.toLocaleString("es-PY")}\n\n`
    message += "¿Cuál es la disponibilidad y forma de pago?"

    // Paraguay WhatsApp number
    const whatsappNumber = "595982941780"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    clearCart()
  }

  if (cart.length === 0) {
    return (
      <section id="carrito" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Tu Carrito</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">Tu carrito está vacío</p>
                <p className="mt-2 text-sm text-muted-foreground">¡Agregá productos para comenzar tu pedido!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="carrito" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Tu Carrito</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  Vaciar carrito
                </Button>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toLocaleString("es-PY")} c/u</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Stock: {item.stock} {item.stock === 1 ? "unidad" : "unidades"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-foreground">
                      ${(item.price * item.quantity).toLocaleString("es-PY")}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex-col gap-4 bg-muted/50 p-6">
              <div className="flex w-full items-center justify-between text-lg">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">${totalPrice.toLocaleString("es-PY")}</span>
              </div>
              <Button onClick={sendToWhatsApp} size="lg" className="w-full gap-2 text-base">
                <Send className="h-5 w-5" />
                Enviar Pedido por WhatsApp
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Te redirigiremos a WhatsApp para confirmar tu pedido
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
