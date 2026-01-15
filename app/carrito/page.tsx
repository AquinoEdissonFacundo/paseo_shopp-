import { Header } from "@/components/header"
import { CartPage } from "@/components/cart-page"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function CarritoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CartPage />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
