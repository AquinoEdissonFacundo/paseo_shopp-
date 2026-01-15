"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    location: "Asunción",
    text: "Compré un celular y llegó en perfectas condiciones el mismo día. La atención por WhatsApp es excelente.",
  },
  {
    name: "Javier López",
    location: "Ciudad del Este",
    text: "Muy buenos precios y productos originales. Me ayudaron a elegir el perfume ideal para un regalo.",
  },
  {
    name: "Carolina Romero",
    location: "Encarnación",
    text: "Me encantó la experiencia de compra. Todo el proceso fue rápido y seguro, súper recomendados.",
  },
]

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  })

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      {/* Fondo fuerte, respetando la paleta */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#172026] via-[#027373] to-background" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(95,205,217,0.6),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,rgba(4,191,173,0.6),transparent_55%)]" />
      <div className="container mx-auto max-w-7xl relative w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance text-white px-2 drop-shadow-lg">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto px-2">
            Opiniones reales de personas que ya compraron en Paseo Shopp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="h-full border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
                <CardContent className="p-6 sm:p-7 flex flex-col h-full">
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                    “{t.text}”
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/60 flex flex-col items-start">
                    <span className="font-semibold text-foreground">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.location}, Paraguay</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

