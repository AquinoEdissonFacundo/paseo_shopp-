import { MessageCircle, MapPin, Clock, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ContactPage() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-center">Contacto y Ubicación</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center text-balance">
          Visitanos o escribinos, estamos para ayudarte
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-3">Escribinos y te respondemos al instante</p>
                  <Button asChild>
                    <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer">
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Dirección</h3>
                  <p className="text-muted-foreground">
                    España casi San Martín
                    <br />
                    Asunción
                    <br />
                    Paraguay
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Horarios</h3>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 - 20:00
                    <br />
                    Sábados: 10:00 - 18:00
                    <br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4">Redes Sociales</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href="https://instagram.com/paseoshopp" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    @paseoshopp
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href="https://facebook.com/paseoshopp" target="_blank" rel="noopener noreferrer">
                    <Facebook className="mr-2 h-5 w-5" />
                    Paseo Shopp
                  </a>
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-bold text-lg mb-4">Preguntas Frecuentes</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1">¿Hacen envíos?</p>
                    <p className="text-muted-foreground">
                      Sí, enviamos a todo el país a través de correo argentino y transportes privados.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">¿Tienen garantía?</p>
                    <p className="text-muted-foreground">
                      Todos nuestros productos cuentan con garantía oficial del fabricante.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">¿Aceptan cambios?</p>
                    <p className="text-muted-foreground">
                      Sí, tenés 10 días para cambios por talle o color en productos en perfecto estado.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.5!2d-57.6308!3d-25.2637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE1JzQ5LjMiUyA1N8KwMzcnNTAuOSJX!5e0!3m2!1ses!2spy!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Paseo Shopp - España casi San Martín, Asunción, Paraguay"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
