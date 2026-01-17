'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const testimonials = [
  {
    name: 'María González',
    location: 'Asunción',
    text: 'Compré un celular y llegó en perfectas condiciones el mismo día. La atención por WhatsApp es excelente.',
  },
  {
    name: 'Javier López',
    location: 'Ciudad del Este',
    text: 'Muy buenos precios y productos originales. Me ayudaron a elegir el perfume ideal para un regalo.',
  },
  {
    name: 'Carolina Romero',
    location: 'Encarnación',
    text: 'Me encantó la experiencia de compra. Todo el proceso fue rápido y seguro, súper recomendados.',
  },
  {
    name: 'Roberto Benítez',
    location: 'San Lorenzo',
    text: 'Excelente calidad en los productos. Compré unos audífonos y superaron mis expectativas. Muy profesionales.',
  },
  {
    name: 'Ana Martínez',
    location: 'Luque',
    text: 'La entrega fue súper rápida y el producto llegó perfectamente empaquetado. Definitivamente volveré a comprar.',
  },
  {
    name: 'Diego Fernández',
    location: 'Fernando de la Mora',
    text: 'Encontré el perfume que buscaba hace tiempo. Precio justo y producto original. Muy satisfecho con la compra.',
  },
  {
    name: 'Sofía Ramírez',
    location: 'Lambaré',
    text: 'Compré ropa para toda la familia y todo quedó perfecto. La calidad es excelente y los precios muy accesibles.',
  },
  {
    name: 'Carlos Mendoza',
    location: 'Villa Elisa',
    text: 'Atención al cliente de primera. Me resolvieron todas mis dudas antes de comprar. Producto de calidad garantizada.',
  },
  {
    name: 'Valentina Silva',
    location: 'Mariano Roque Alonso',
    text: 'Mi experiencia fue increíble. Compré un reloj y quedé encantada. La atención personalizada hace la diferencia.',
  },
  {
    name: 'Andrés Cabrera',
    location: 'Capiatá',
    text: 'Productos originales y precios competitivos. La entrega fue puntual y el empaque muy cuidado. Totalmente recomendado.',
  },
  {
    name: 'Lucía Espínola',
    location: 'Itauguá',
    text: 'Compré varios productos y todos llegaron en perfecto estado. El servicio es excelente y muy confiable.',
  },
];

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Duplicar testimonials para el efecto marquee infinito
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className='relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6'>
      {/* Fondo fuerte, respetando la paleta */}
      <div className='absolute inset-0 bg-gradient-to-b from-[#172026] via-[#027373] to-background' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(95,205,217,0.6),transparent_55%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_100%,rgba(4,191,173,0.6),transparent_55%)]' />
      <div className='container mx-auto max-w-7xl relative w-full'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-10 sm:mb-12'
        >
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-balance text-white px-2 drop-shadow-lg'>
            Lo que dicen nuestros clientes
          </h2>
          <p className='mt-3 text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto px-2'>
            Opiniones reales de personas que ya compraron en Paseo Shopp.
          </p>
        </motion.div>

        {/* Marquee Container con dos filas */}
        <div className='relative w-full overflow-hidden min-h-[380px] sm:min-h-[350px] md:min-h-[400px] py-3 sm:py-4'>
          {/* Gradientes laterales para efecto fade suave - se integran con el fondo */}
          <div
            className='absolute left-0 top-0 bottom-0 z-10 pointer-events-none'
            style={{
              width: 'clamp(50px, 12vw, 120px)',
            }}
          />
          <div
            className='absolute right-0 top-0 bottom-0 z-10 pointer-events-none'
            style={{
              width: 'clamp(50px, 12vw, 120px)',
            }}
          />

          {/* Primera fila - se mueve de derecha a izquierda */}
          <div
            className='relative overflow-hidden mb-3 sm:mb-4'
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, black 12%, black 88%, rgba(0,0,0,0.3) 95%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, black 12%, black 88%, rgba(0,0,0,0.3) 95%, transparent 100%)',
            }}
          >
            <motion.div
              className='flex gap-3 sm:gap-4'
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 35,
                  ease: 'linear',
                },
              }}
              style={{ willChange: 'transform' }}
            >
              {duplicatedTestimonials.map((t, index) => (
                <div
                  key={`marquee-1-${index}-${t.name}`}
                  className='w-[260px] sm:w-[280px] md:w-[300px] shrink-0'
                >
                  <div className='border border-border/40 rounded-lg bg-card/60 backdrop-blur-sm p-3 sm:p-4 h-full'>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3'>
                      "{t.text}"
                    </p>
                    <div className='flex items-center gap-2'>
                      <div className='flex flex-col'>
                        <span className='text-xs font-medium text-foreground'>
                          {t.name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {t.location}, Paraguay
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Segunda fila - se mueve de izquierda a derecha */}
          <div
            className='relative overflow-hidden mt-3 sm:mt-4'
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, black 12%, black 88%, rgba(0,0,0,0.3) 95%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, black 12%, black 88%, rgba(0,0,0,0.3) 95%, transparent 100%)',
            }}
          >
            <motion.div
              className='flex gap-3 sm:gap-4'
              animate={{
                x: ['-50%', '0%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 35,
                  ease: 'linear',
                },
              }}
              style={{ willChange: 'transform' }}
            >
              {duplicatedTestimonials.map((t, index) => (
                <div
                  key={`marquee-2-${index}-${t.name}`}
                  className='w-[260px] sm:w-[280px] md:w-[300px] shrink-0'
                >
                  <div className='border border-border/40 rounded-lg bg-card/60 backdrop-blur-sm p-3 sm:p-4 h-full'>
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2 sm:mb-3'>
                      "{t.text}"
                    </p>
                    <div className='flex items-center gap-2'>
                      <div className='flex flex-col'>
                        <span className='text-xs font-medium text-foreground'>
                          {t.name}
                        </span>
                        <span className='text-xs text-muted-foreground'>
                          {t.location}, Paraguay
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
