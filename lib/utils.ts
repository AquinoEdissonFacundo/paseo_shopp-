import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatear precio (todos usan Gs - guaraníes de Paraguay)
export function formatPrice(price: number): string {
  return `Gs ${price.toLocaleString('es-PY')}`
}
