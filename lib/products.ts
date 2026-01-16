import type { Product, Category } from "./types"
import {
  getProductsFromAirtable,
  getProductBySlugFromAirtable,
  getProductsByCategoryFromAirtable,
  getFeaturedProductsFromAirtable,
} from "./airtable"

// Categorías (se mantienen estáticas por ahora)
export const categories: Category[] = [
  {
    slug: "celulares",
    name: "Celulares",
    icon: "📱",
    image: "/samsung-galaxy-a54-black.jpg",
    description: "Los mejores smartphones del mercado con garantía",
  },
  {
    slug: "perfumes",
    name: "Perfumes",
    icon: "🌸",
    image: "/paco-rabanne-1-million-perfume.jpg",
    description: "Fragancias originales de las mejores marcas",
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    icon: "🎧",
    image: "/jbl-bluetooth-headphones-black.jpg",
    description: "Auriculares, fundas, cargadores y más",
  },
  {
    slug: "regalos",
    name: "Regalos",
    icon: "🎁",
    image: "/miniature-perfume-gift-set.jpg",
    description: "Ideas perfectas para sorprender",
  },
  {
    slug: "muebles",
    name: "Muebles",
    icon: "🪑",
    image: "/muebles.jpg",
    description: "Muebles de calidad para tu hogar",
  },
]

export const products: Product[] = [
  {
    id: 1,
    name: "Samsung Galaxy A54",
    slug: "samsung-galaxy-a54",
    price: 389990,
    description: "Pantalla Super AMOLED de 6.4'', cámara de 50MP, batería de 5000mAh. Rendimiento excepcional.",
    image: "/samsung-galaxy-a54-black.jpg",
    images: ["/samsung-galaxy-a54-front.jpg", "/samsung-galaxy-a54-back.jpg", "/samsung-galaxy-a54-side.jpg"],
    category: "celulares",
    featured: true,
    onSale: true,
    originalPrice: 429990,
    stock: 8,
  },
  {
    id: 2,
    name: "Xiaomi Redmi Note 13",
    slug: "xiaomi-redmi-note-13",
    price: 299990,
    description: "Procesador Snapdragon, cámara de 108MP, carga rápida de 33W. Calidad y precio increíbles.",
    image: "/xiaomi-redmi-note-13-blue.jpg",
    images: ["/xiaomi-redmi-note-13-front.jpg", "/xiaomi-redmi-note-13-back.jpg"],
    category: "celulares",
    featured: true,
    stock: 12,
  },
  {
    id: 3,
    name: "Perfume Paco Rabanne 1 Million",
    slug: "paco-rabanne-1-million",
    price: 89990,
    description: "Eau de Toilette 100ml. Fragancia masculina intensa y elegante. Original importado.",
    image: "/paco-rabanne-1-million-perfume.jpg",
    images: ["/paco-rabanne-1-million-bottle.jpg", "/paco-rabanne-1-million-box.jpg"],
    category: "perfumes",
    featured: true,
    stock: 15,
  },
  {
    id: 4,
    name: "Carolina Herrera Good Girl",
    slug: "carolina-herrera-good-girl",
    price: 129990,
    description: "Eau de Parfum 80ml. Fragancia femenina sensual y sofisticada. 100% original.",
    image: "/carolina-herrera-good-girl-perfume.jpg",
    category: "perfumes",
    onSale: true,
    originalPrice: 149990,
    stock: 10,
  },
  {
    id: 5,
    name: "Auriculares Bluetooth JBL",
    slug: "auriculares-jbl-tune-510bt",
    price: 45990,
    description: "JBL Tune 510BT - Sonido puro, batería de 40hs, conexión inalámbrica. Comodidad garantizada.",
    image: "/jbl-bluetooth-headphones-black.jpg",
    category: "accesorios",
    stock: 20,
  },
  {
    id: 6,
    name: "Funda Protectora Premium",
    slug: "funda-protectora-premium",
    price: 8990,
    description: "Funda de silicona con refuerzo en esquinas. Compatible con múltiples modelos.",
    image: "/premium-phone-case-black.jpg",
    category: "accesorios",
    stock: 35,
  },
  {
    id: 7,
    name: "Power Bank 20000mAh",
    slug: "power-bank-20000mah",
    price: 24990,
    description: "Carga rápida, doble USB, indicador LED. Nunca te quedes sin batería.",
    image: "/power-bank-portable-charger.jpg",
    category: "accesorios",
    featured: true,
    stock: 18,
  },
  {
    id: 8,
    name: "Set de Perfumes Miniatura",
    slug: "set-perfumes-miniatura",
    price: 34990,
    description: "Pack de 5 perfumes en miniatura de marcas premium. Regalo ideal.",
    image: "/miniature-perfume-gift-set.jpg",
    category: "regalos",
    stock: 12,
  },
  {
    id: 9,
    name: "Smartwatch Deportivo",
    slug: "smartwatch-deportivo",
    price: 69990,
    description: "Monitor cardíaco, GPS, resistente al agua. Tu compañero fitness perfecto.",
    image: "/placeholder.svg?height=400&width=400",
    category: "regalos",
    stock: 7,
  },
  {
    id: 10,
    name: "Motorola Edge 40",
    slug: "motorola-edge-40",
    price: 349990,
    description: "Pantalla OLED de 6.55'', cámara de 50MP con OIS, carga inalámbrica. Tecnología de punta.",
    image: "/placeholder.svg?height=400&width=400",
    category: "celulares",
    stock: 5,
  },
  {
    id: 11,
    name: "Dior Sauvage EDT",
    slug: "dior-sauvage-edt",
    price: 119990,
    description: "Eau de Toilette 100ml. La fragancia masculina más icónica. Original garantizado.",
    image: "/placeholder.svg?height=400&width=400",
    category: "perfumes",
    featured: true,
    stock: 9,
  },
  {
    id: 12,
    name: "Cargador Inalámbrico Fast",
    slug: "cargador-inalambrico-fast",
    price: 15990,
    description: "Carga inalámbrica rápida de 15W. Compatible con iPhone y Android.",
    image: "/placeholder.svg?height=400&width=400",
    category: "accesorios",
    stock: 25,
  },
]

// Funciones que usan Airtable (con fallback a datos estáticos)
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  // Si hay API key de Airtable configurada, usar Airtable
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    const product = await getProductBySlugFromAirtable(slug)
    if (product) return product
  }
  // Fallback a datos estáticos
  return products.find((p) => p.slug === slug)
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  // Si hay API key de Airtable configurada, usar Airtable
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    const airtableProducts = await getProductsByCategoryFromAirtable(categorySlug)
    if (airtableProducts.length > 0) return airtableProducts
  }
  // Fallback a datos estáticos
  return products.filter((p) => p.category === categorySlug)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  // Si hay API key de Airtable configurada, usar Airtable
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    const airtableProducts = await getFeaturedProductsFromAirtable()
    if (airtableProducts.length > 0) return airtableProducts
  }
  // Fallback a datos estáticos
  return products.filter((p) => p.featured)
}

// Función para obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  // Si hay API key de Airtable configurada, usar Airtable
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
    const airtableProducts = await getProductsFromAirtable()
    if (airtableProducts.length > 0) return airtableProducts
  }
  // Fallback a datos estáticos
  return products
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
