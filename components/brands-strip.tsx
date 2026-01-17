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

// Duplicar marcas para el loop infinito
const duplicatedBrands = [...brands, ...brands];

export function BrandsStrip() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee-inner {
            animation: marqueeScroll linear infinite;
          }
        `
      }} />
      <section className='py-12 sm:py-16 px-4 sm:px-6 bg-background border-y border-border/40'>
        <div className='container mx-auto max-w-6xl w-full'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className='flex flex-col items-center gap-6 sm:gap-8'
          >
            <p className='text-sm sm:text-base text-muted-foreground text-center max-w-2xl'>
              Trabajamos con marcas originales y reconocidas para garantizarte
              calidad en cada compra.
            </p>
            <div className='w-full overflow-hidden relative max-w-5xl mx-auto select-none'>
              <div className='absolute left-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent' />
              <div
                className='marquee-inner flex will-change-transform min-w-[200%]'
                style={{ animationDuration: '20s' }}
              >
                <div className='flex items-center gap-8 sm:gap-12 md:gap-16'>
                  {duplicatedBrands.map((brand, index) => (
                    <div
                      key={`${brand.name}-${index}`}
                      className='flex items-center justify-center shrink-0'
                    >
                      <div className='relative h-8 sm:h-10 md:h-12 w-20 sm:w-24 md:w-28'>
                        <Image
                          src={brand.src}
                          alt={brand.name}
                          fill
                          sizes='112px'
                          className='object-contain'
                          draggable={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent' />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
