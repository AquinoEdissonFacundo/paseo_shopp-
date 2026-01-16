'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const brands = [
  { name: 'Samsung', src: '/samsung.png' },
  { name: 'Apple', src: '/iphone.png' },
  { name: 'New Balance', src: '/newbalance.png' },
  { name: 'Nike', src: '/nike.png' },
  { name: 'Jordan', src: '/jordan.png' },
  { name: 'Vans', src: '/vans.png' },
];

// Duplicamos las marcas para un loop infinito perfecto
const duplicatedBrands = [...brands, ...brands];

export function BrandsStrip() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className='py-8 sm:py-10 px-4 sm:px-6 bg-background/80 border-y border-border/60'>
      <div className='container mx-auto max-w-7xl w-full'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6'
        >
          <p className='text-xs sm:text-sm md:text-base text-muted-foreground text-center md:text-left max-w-sm'>
            Trabajamos con marcas originales y reconocidas para garantizarte
            calidad en cada compra.
          </p>
          <div className='flex-1 w-full md:w-auto overflow-hidden relative'>
            {/* Gradiente izquierdo */}
            <div className='absolute left-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-background/80 via-background/60 to-transparent' />
            {/* Gradiente derecho */}
            <div className='absolute right-0 top-0 bottom-0 w-20 sm:w-24 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-background/80 via-background/60 to-transparent' />
            <div className='marquee-wrapper overflow-hidden flex'>
              <div className='marquee-content flex gap-6 sm:gap-8 md:gap-10'>
                {duplicatedBrands.map((brand, index) => (
                  <div
                    key={`${brand.name}-${index}`}
                    className='marquee-item shrink-0 flex items-center justify-center'
                  >
                    <div className='relative h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-28'>
                      <Image
                        src={brand.src}
                        alt={brand.name}
                        fill
                        sizes='120px'
                        className='object-contain'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
