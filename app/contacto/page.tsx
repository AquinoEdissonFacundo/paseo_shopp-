import { Header } from "@/components/header"
import { ContactPage } from "@/components/contact-page"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { FloatingCart } from "@/components/floating-cart"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function ContactoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ContactPage />
      </main>
      <Footer />
      <FloatingCart />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
