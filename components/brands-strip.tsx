"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const brands = [
  { name: "Samsung", src: "/samsung-galaxy-a54-logo.png" },
  { name: "Xiaomi", src: "/xiaomi-redmi-note-13-front.jpg" },
  { name: "JBL", src: "/jbl-bluetooth-headphones-black.jpg" },
  { name: "Paco Rabanne", src: "/paco-rabanne-1-million-perfume.jpg" },
]

export function BrandsStrip() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 bg-background/80 border-y border-border/60">
      <div className="container mx-auto max-w-7xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
        >
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center md:text-left max-w-sm">
            Trabajamos con marcas originales y reconocidas para garantizarte calidad en cada compra.
          </p>
          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <div className="relative h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-28">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    fill
                    sizes="120px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

