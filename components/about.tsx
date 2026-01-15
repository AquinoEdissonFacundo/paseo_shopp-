import { Store, Truck, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function About() {
  const features = [
    {
      icon: Store,
      title: "Calidad Garantizada",
      description: "Seleccionamos cuidadosamente cada producto para asegurar la mejor calidad.",
    },
    {
      icon: Truck,
      title: "Envío Rápido",
      description: "Coordinamos la entrega de manera rápida y segura a todo el país.",
    },
    {
      icon: Heart,
      title: "Atención Personalizada",
      description: "Estamos para ayudarte en cada paso de tu compra.",
    },
  ]

  return (
    <section id="sobre-nosotros" className="py-16 md:py-24">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground md:text-4xl">¿Por qué Paseo Shopp?</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Nos dedicamos a brindarte la mejor experiencia de compra
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
