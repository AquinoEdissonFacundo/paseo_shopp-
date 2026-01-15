import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CategoryCards } from "@/components/category-cards"
import { FeaturedProducts } from "@/components/featured-products"
import { Benefits } from "@/components/benefits"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { FloatingCart } from "@/components/floating-cart"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { BrandsStrip } from "@/components/brands-strip"
import { FAQSection } from "@/components/faq-section"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryCards />
        <HowItWorks />
        <FeaturedProducts />
        <Benefits />
        <Testimonials />
        <BrandsStrip />
        <FAQSection />
        <CallToAction />
      </main>
      <Footer />
      <FloatingCart />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
