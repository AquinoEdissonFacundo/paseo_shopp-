'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className='relative overflow-hidden min-h-[85vh] sm:min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32'>
      {/* Background Image with overlay equilibrado */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat scale-110'
          style={{
            backgroundImage: `url("/fondo.jpg")`,
            // Un poco de blur pero manteniendo la escena luminosa
            filter: 'blur(2px) brightness(0.8)',
          }}
        />

        {/* Overlay usando la paleta, un poco más oscuro para enfocar el texto */}
        <div className='absolute inset-0 bg-gradient-to-b from-[#172026]/85 via-[#172026]/45 to-[#172026]/20' />
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(95,205,217,0.18),transparent_55%)]' />
      </div>

      <div className='container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 w-full'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='mx-auto max-w-5xl text-center px-2 sm:px-4 md:px-6'
        >
          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className='text-5xl xs:text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-[1.1] sm:leading-tight drop-shadow-[0_0_25px_#56565691]'
            style={{
              backgroundImage:
                'linear-gradient(rgb(23, 32, 38) 0%, rgb(20, 184, 166) 58%, rgb(23, 32, 38) 100%)',
              backgroundSize: '200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              backgroundPosition: '52.0333% center',
            }}
          >
            <motion.span
              className='inline-block bg-clip-text text-transparent drop-shadow-[0_0_25px_#56565691] shine-text'
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(23, 32, 38, 1) 0%, rgba(20, 184, 166, 1) 58%, rgba(23, 32, 38, 1) 100%), linear-gradient(90deg, transparent 0%, rgba(20, 184, 166, 0.9) 30%, rgba(20, 184, 166, 1) 50%, rgba(20, 184, 166, 0.9) 70%, transparent 100%)',
                backgroundSize: '100% 100%, 200% 100%',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Paseo Shopp
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='text-white drop-shadow-xl font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
            >
              Todo en un solo lugar
            </motion.span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className='mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 text-pretty leading-relaxed font-medium max-w-2xl mx-auto px-2 sm:px-4 drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] mb-6 sm:mb-8 md:mb-10 lg:mb-12'
          >
            Celulares, perfumes, accesorios y regalos. Comprá fácil y recibí tu
            pedido directo por WhatsApp.
          </motion.p>

          {/* Botón principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='flex justify-center items-center mb-4 sm:mb-6 md:mb-8 px-2'
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className='w-full max-w-xs sm:max-w-none sm:w-auto'
            >
              <Button
                asChild
                size='lg'
                className='w-full sm:w-auto text-sm sm:text-base md:text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300'
              >
                <Link
                  href='/productos'
                  className='flex items-center justify-center gap-2 sm:gap-3'
                >
                  <span>Ver Catálogo</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className='text-xl sm:text-2xl'
                  >
                    →
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Texto informativo al final - Estilo stronmuebles */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className='text-xs sm:text-sm md:text-base text-white/70 px-2 sm:px-4'
          >
            ⚡ Explora nuestro catálogo o consulta directamente • Respuesta en
            menos de 2 horas
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
