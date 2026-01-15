import { NextResponse } from "next/server"
import {
  getProductByIdFromAirtable,
  updateProductInAirtable,
  deleteProductInAirtable,
} from "@/lib/airtable"

// GET - Obtener un producto por ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await getProductByIdFromAirtable(id)

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// PUT - Actualizar un producto
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const productData = await request.json()

    // El id puede ser un record ID de Airtable (recXXX) o un slug
    const product = await updateProductInAirtable(id, productData)

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Error al actualizar el producto" },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar un producto
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // El id puede ser un record ID de Airtable (recXXX) o un slug
    await deleteProductInAirtable(id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Error al eliminar el producto" },
      { status: 500 }
    )
  }
}
