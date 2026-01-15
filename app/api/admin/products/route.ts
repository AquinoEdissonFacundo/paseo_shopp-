import { NextResponse } from "next/server"
import {
  getProductsFromAirtable,
  createProductInAirtable,
} from "@/lib/airtable"

// GET - Obtener todos los productos
export async function GET() {
  try {
    // Verificar autenticación (simple check)
    // En producción, usarías cookies o JWT

    const products = await getProductsFromAirtable()
    return NextResponse.json({ success: true, products })
  } catch (error: any) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo producto
export async function POST(request: Request) {
  try {
    const productData = await request.json()

    // Validar datos requeridos
    if (!productData.name || !productData.price || !productData.category) {
      return NextResponse.json(
        { success: false, error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    const product = await createProductInAirtable({
      name: productData.name,
      slug: productData.slug || productData.name.toLowerCase().replace(/\s+/g, "-"),
      price: productData.price,
      description: productData.description || "",
      image: productData.image || "/placeholder.jpg",
      images: productData.images || [],
      category: productData.category,
      stock: productData.stock || 0,
      featured: productData.featured || false,
      onSale: productData.onSale || false,
      originalPrice: productData.originalPrice,
    })

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
