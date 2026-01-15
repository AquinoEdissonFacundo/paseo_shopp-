import { Store, Heart, Truck, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutPage() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-center">Sobre Paseo Shopp</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center text-balance leading-relaxed">
          Tu tienda de confianza con todo lo que necesitás
        </p>

        <div className="prose prose-lg max-w-none mb-12">
          <Card>
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed mb-4">
                En <strong>Paseo Shopp</strong> encontrás los mejores productos de tecnología, perfumería y accesorios,
                todo en un solo lugar.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Desde 2020 trabajamos para ofrecerte la mejor experiencia de compra, con atención personalizada y
                productos 100% originales.
              </p>
              <p className="text-lg leading-relaxed">
                Nuestro local está ubicado en España casi San Martín, Asunción, pero también llegamos a todo Paraguay con
                nuestro servicio de envíos.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">¿Por qué elegirnos?</h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Local físico</h3>
              <p className="text-muted-foreground leading-relaxed">
                Podés visitarnos y ver los productos antes de comprar. Nuestro equipo te asesora personalmente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Productos originales</h3>
              <p className="text-muted-foreground leading-relaxed">
                Todos nuestros productos son 100% originales con garantía oficial del fabricante.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Envíos rápidos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Despachamos tu pedido en 24hs y llegamos a todo el país con los mejores transportes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Atención personalizada</h3>
              <p className="text-muted-foreground leading-relaxed">
                Te asesoramos por WhatsApp en tiempo real. Estamos para ayudarte en lo que necesites.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
