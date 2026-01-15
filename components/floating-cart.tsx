"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart } from "lucide-react"

export function FloatingCart() {
  const { cart } = useCart()
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (itemCount === 0) return null

  return (
    <Link href="/carrito" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <Button size="lg" className="rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg relative transition-transform hover:scale-110">
        <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
        <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0 flex items-center justify-center text-xs sm:text-sm">
          {itemCount}
        </Badge>
      </Button>
    </Link>
  )
}
