import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Paseo Shopp Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-foreground">Paseo Shopp</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu tienda de confianza con todo lo que necesitás.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/productos" className="text-muted-foreground hover:text-foreground transition-colors">
                Productos
              </Link>
              <Link href="/nosotros" className="text-muted-foreground hover:text-foreground transition-colors">
                Nosotros
              </Link>
              <Link href="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categorías</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/categoria/celulares"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Celulares
              </Link>
              <Link
                href="/categoria/perfumes"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Perfumes
              </Link>
              <Link
                href="/categoria/accesorios"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Accesorios
              </Link>
              <Link href="/categoria/regalos" className="text-muted-foreground hover:text-foreground transition-colors">
                Regalos
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Seguinos</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/paseoshopp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/paseoshopp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border">
          <p className="text-center text-xs sm:text-sm text-muted-foreground px-4">
            © {new Date().getFullYear()} Paseo Shopp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
