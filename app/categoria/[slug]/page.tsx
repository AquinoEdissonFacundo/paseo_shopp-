import { Header } from "@/components/header"
import { CategoryPage } from "@/components/category-page"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { FloatingCart } from "@/components/floating-cart"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { getCategoryBySlug } from "@/lib/products"
import { notFound } from "next/navigation"

export default async function CategorySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CategoryPage category={category} />
      </main>
      <Footer />
      <FloatingCart />
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}
