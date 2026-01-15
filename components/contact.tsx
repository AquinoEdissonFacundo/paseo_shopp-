import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Contact() {
  return (
    <section id="contacto" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-balance text-foreground md:text-4xl">Visitanos o Contactanos</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">Estamos para ayudarte con lo que necesites</p>
        </div>
        <div className="mx-auto max-w-4xl">
          <Card className="border-border">
            <CardContent className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Información de Contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Nuestro Local</p>
                        <p className="text-sm text-muted-foreground">España casi San Martín, Asunción, Paraguay</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Teléfono</p>
                        <p className="text-sm text-muted-foreground">+595 21 XXX XXXX</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Email</p>
                        <p className="text-sm text-muted-foreground">info@paseoshopp.com.py</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Horarios</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lunes a Viernes:</span>
                      <span className="font-medium text-foreground">10:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábados:</span>
                      <span className="font-medium text-foreground">10:00 - 14:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domingos:</span>
                      <span className="font-medium text-foreground">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Seguinos en Redes</h3>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                      <a href="https://instagram.com/paseoshopp" target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5 text-primary" />
                        <span>@paseoshopp</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                      <a href="https://facebook.com/paseoshopp" target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-5 w-5 text-primary" />
                        <span>Paseo Shopp</span>
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                      <a href="https://wa.me/595XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>WhatsApp</span>
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                    ¿Tenés alguna consulta? No dudes en contactarnos por cualquiera de nuestros canales. ¡Estamos para
                    ayudarte!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
