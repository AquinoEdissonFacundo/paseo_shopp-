"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const faqs = [
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, realizamos envíos a todo el territorio paraguayo. Al coordinar por WhatsApp te confirmamos costos y tiempos de entrega.",
  },
  {
    question: "¿Los productos son originales?",
    answer:
      "Todos nuestros productos son 100% originales y cuentan con garantía del fabricante o del importador autorizado.",
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Aceptamos efectivo, transferencia bancaria, billeteras electrónicas y tarjetas de crédito/débito según el producto.",
  },
  {
    question: "¿Puedo retirar en el local?",
    answer:
      "Sí, podés comprar online y retirar en nuestro local en España casi San Martín, Asunción, en el horario de atención.",
  },
]

export function FAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-background relative">
      <div className="container mx-auto max-w-4xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance text-foreground">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground">
            Respondemos las dudas más comunes para que compres con total tranquilidad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

