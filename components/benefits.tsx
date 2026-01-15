"use client"

import { MessageCircle, Truck, Store } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Benefits() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const benefits = [
    {
      icon: MessageCircle,
      title: "Atención por WhatsApp",
      description: "Te asesoramos en tiempo real",
    },
    {
      icon: Truck,
      title: "Envíos a todo Paraguay",
      description: "Recibí tu pedido donde estés",
    },
    {
      icon: Store,
      title: "Local físico",
      description: "Visitanos y conocé nuestros productos",
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl w-full">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center gap-3 sm:gap-4 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all shadow-lg group-hover:shadow-xl group-hover:shadow-primary/15"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:scale-110 transition-transform" />
                </motion.div>
                <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors px-2">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xs px-2">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
