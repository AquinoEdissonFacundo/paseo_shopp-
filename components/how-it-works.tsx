'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag, MessageCircle, Truck } from 'lucide-react';

export function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const steps = [
    {
      icon: ShoppingBag,
      title: 'Elegí tus productos',
      description:
        'Explorá el catálogo por categorías y agregá al carrito lo que más te guste.',
      badge: 'Paso 1',
    },
    {
      icon: MessageCircle,
      title: 'Confirmamos por WhatsApp',
      description:
        'Coordinamos tu pedido, forma de pago y envío de manera rápida y clara.',
      badge: 'Paso 2',
    },
    {
      icon: Truck,
      title: 'Recibí en todo Paraguay',
      description:
        'Enviamos tu compra a domicilio o la retirás en el local, como prefieras.',
      badge: 'Paso 3',
    },
  ];

  return (
    <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6'>
      <div className='container mx-auto max-w-7xl w-full'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className='text-center mb-10 sm:mb-12'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-balance text-foreground px-2'>
            ¿Cómo funciona Paseo Shopp?
          </h2>
          <p className='mt-3 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2'>
            Comprar online en Paraguay nunca fue tan fácil. Seguimos tres pasos
            simples para que recibas tus productos sin complicaciones.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className='relative h-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all overflow-hidden'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 opacity-0 hover:opacity-100 transition-opacity duration-300' />
                <div className='relative z-10 p-6 sm:p-7 flex flex-col gap-4'>
                  <div className='flex items-center justify-between gap-3'>
                    <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary'>
                      <span className='inline-block h-1.5 w-1.5 rounded-full bg-primary' />
                      {step.badge}
                    </div>
                    <div className='h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-primary/15 via-accent/15 to-primary/5 flex items-center justify-center shadow-md'>
                      <Icon className='h-5 w-5 sm:h-6 sm:w-6 text-primary' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <h3 className='text-xl sm:text-2xl md:text-3xl font-semibold text-foreground text-left'>
                      {step.title}
                    </h3>
                    <p className='text-base sm:text-lg text-muted-foreground text-left leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
