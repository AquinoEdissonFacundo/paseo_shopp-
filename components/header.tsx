"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function Header() {
  const { totalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-gradient-to-br from-primary via-accent to-primary/80 backdrop-blur-xl supports-[backdrop-filter]:bg-gradient-to-br supports-[backdrop-filter]:from-primary/90 supports-[backdrop-filter]:via-accent/90 supports-[backdrop-filter]:to-primary/70 shadow-lg shadow-primary/20">
      <div className="container flex h-16 sm:h-18 items-center justify-center px-4 sm:px-6 relative">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="absolute left-3 sm:left-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Paseo Shopp Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden sm:inline text-lg sm:text-xl font-bold text-primary-foreground">
              Paseo Shopp
            </span>
          </Link>
        </motion.div>

        <nav className="flex items-center gap-5 lg:gap-8 justify-center">
          {[
            { href: "/", label: "Inicio" },
            { href: "/productos", label: "Productos" },
            { href: "/nosotros", label: "Nosotros" },
            { href: "/contacto", label: "Contacto" },
          ].map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
            return (
              <motion.div 
                key={item.href} 
                whileHover={{ y: -2 }} 
                whileTap={{ y: 0 }} 
                className="hidden md:block"
              >
                <Link
                  href={item.href}
                  className={`text-sm lg:text-base font-semibold relative group px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "text-primary-foreground bg-white/20" 
                      : "text-primary-foreground/85 hover:text-primary-foreground hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 rounded-full" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 absolute right-3 sm:right-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:text-primary-foreground hover:bg-white/25 transition-all duration-200 rounded-lg">
                <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary shadow-lg border-2 border-primary/30"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>
          </motion.div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-primary-foreground hover:bg-white/25 transition-all duration-200 rounded-lg">
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gradient-to-br from-primary via-accent to-primary/80 backdrop-blur-xl">
              <nav className="flex flex-col gap-4 mt-8">
                {[
                  { href: "/", label: "Inicio" },
                  { href: "/productos", label: "Productos" },
                  { href: "/nosotros", label: "Nosotros" },
                  { href: "/contacto", label: "Contacto" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-lg font-semibold transition-all duration-200 block py-3 px-4 rounded-lg ${
                        pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                          ? "text-primary-foreground bg-white/20"
                          : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
