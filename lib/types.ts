export interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  slug: string
  images?: string[]
  featured?: boolean
  onSale?: boolean
  originalPrice?: number
  stock: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Category {
  slug: string
  name: string
  icon: string
  image?: string
  description: string
}
