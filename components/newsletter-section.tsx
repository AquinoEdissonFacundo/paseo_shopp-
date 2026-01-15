"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se podría integrar con email marketing en el futuro
    setEmail("")
    alert("¡Gracias! Te avisaremos de nuestras próximas ofertas.")
  }

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-border/60">
      <div className="container mx-auto max-w-4xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-balance">
            Recibí ofertas y novedades
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground px-2">
            Suscribite para enterarte primero de lanzamientos, descuentos y promociones especiales.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto"
        >
          <Input
            type="email"
            placeholder="Tu email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 sm:h-12 text-sm sm:text-base bg-background/80 backdrop-blur-sm"
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base">
            Quiero recibir ofertas
          </Button>
        </motion.form>
      </div>
    </section>
  )
}

