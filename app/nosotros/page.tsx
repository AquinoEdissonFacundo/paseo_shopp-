import { Header } from "@/components/header"
import { AboutPage } from "@/components/about-page"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { FloatingCart } from "@/components/floating-cart"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function NosotrosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
      <FloatingCart />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
