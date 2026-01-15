import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { FloatingCart } from "@/components/floating-cart"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getProductBySlug } from "@/lib/products"
import { notFound } from "next/navigation"

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
      <Footer />
      <FloatingCart />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
