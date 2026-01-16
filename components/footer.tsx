import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-row flex-wrap gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 justify-center md:justify-between">
          <div className="flex-shrink-0 min-w-[200px] sm:min-w-[250px] md:flex-1 md:max-w-[280px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/logo.jpeg"
                  alt="Paseo Shopp Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-base sm:text-lg font-bold text-foreground">Paseo Shopp</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Tu tienda de confianza con todo lo que necesitás.
            </p>
          </div>

          <div className="flex-shrink-0 min-w-[150px] sm:min-w-[180px] md:flex-1 md:max-w-[200px]">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Navegación</h3>
            <div className="flex flex-col gap-2 text-sm sm:text-base">
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

          <div className="flex-shrink-0 min-w-[150px] sm:min-w-[180px] md:flex-1 md:max-w-[200px]">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Categorías</h3>
            <div className="flex flex-col gap-2 text-sm sm:text-base">
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

          <div className="flex-shrink-0 min-w-[150px] sm:min-w-[180px] md:flex-1 md:max-w-[200px]">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Seguinos</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/paseo_shopp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                style={{
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
                }}
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/paseo_shopp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-[#1877F2] hover:bg-[#166FE5] hover:scale-110 transition-all shadow-md hover:shadow-lg"
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mapa de Google Maps */}
        <div className="mt-8 sm:mt-10 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-center md:text-left">Ubicación</h3>
          <div className="w-full rounded-lg overflow-hidden shadow-lg border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d-57.6308!3d-25.2637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzQ5LjMiUyA1N8KwMzcnNTAuOSJX!5e0!3m2!1ses!2spy!4v1234567890123!5m2!1ses!2spy"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px]"
              title="Ubicación de Paseo Shopp"
            />
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center md:text-left">
            Visitanos en nuestro local físico
          </p>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border">
          <p className="text-center text-sm sm:text-base text-muted-foreground">
            © {new Date().getFullYear()} Paseo Shopp. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
