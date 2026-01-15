import { products } from "@/lib/products"
import { ProductCard } from "./product-card"

export function ProductGrid() {
  return (
    <section id="productos" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground md:text-4xl">Nuestros Productos</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Descubrí nuestra selección de productos de alta calidad
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
