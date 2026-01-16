"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/products"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function CategoryCards() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(95,205,217,0.05),transparent_50%)]" />
      <div className="container mx-auto max-w-7xl relative w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent px-2">
            Categorías Destacadas
          </h2>
          <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-primary to-accent mt-2 rounded-full mx-auto" />
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/categoria/${category.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="h-full cursor-pointer border-2 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-accent/5 group-hover:to-primary/5 transition-all duration-300" />
                    <CardContent className="flex flex-col items-center justify-center p-2.5 sm:p-3 md:p-4 lg:p-6 text-center gap-2 sm:gap-3 md:gap-4 relative z-10">
                      <motion.div
                        className="relative w-full aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-muted shadow-lg group-hover:shadow-primary/20 transition-all"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <Image
                          src={category.image || "/placeholder.jpg"}
                          alt={category.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                        <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex flex-col items-start gap-1 text-left">
                          <span className="inline-flex items-center rounded-full bg-black/60 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-white/90">
                            {category.slug}
                          </span>
                        </div>
                      </motion.div>
                      <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
