"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { Product } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface ProductFormProps {
  product?: Product | null
  onSuccess: () => void
  onCancel: () => void
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [mainFile, setMainFile] = useState<File | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    image: "",
    category: "",
    stock: "",
    featured: false,
    onSale: false,
    originalPrice: "",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        image: product.image || "",
        category: product.category || "",
        stock: product.stock?.toString() || "",
        featured: product.featured || false,
        onSale: product.onSale || false,
        originalPrice: product.originalPrice?.toString() || "",
      })
    }
  }, [product])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: formData.slug || generateSlug(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = formData.image
      let galleryUrls: string[] = []

      // Si el usuario sube archivos, los subimos a Cloudinary
      const uploadFiles: File[] = []
      if (mainFile) uploadFiles.push(mainFile)
      if (galleryFiles.length > 0) {
        // Limitar a 3 imágenes en total (1 principal + 2 galería) o 3 galería si no hay principal
        const maxGallery = mainFile ? 2 : 3
        uploadFiles.push(...galleryFiles.slice(0, maxGallery))
      }

      if (uploadFiles.length > 0) {
        const uploadForm = new FormData()
        uploadFiles.forEach((file) => uploadForm.append("files", file))

        const uploadRes = await fetch("/api/admin/upload-images", {
          method: "POST",
          body: uploadForm,
        })

        const uploadData = await uploadRes.json()

        if (!uploadData.success || !Array.isArray(uploadData.urls)) {
          throw new Error(uploadData.error || "Error al subir imágenes")
        }

        // Primera imagen = principal, resto = galería
        imageUrl = uploadData.urls[0]
        galleryUrls = uploadData.urls.slice(1)
      }

      const productData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        price: parseInt(formData.price),
        description: formData.description,
        image: imageUrl,
        images: galleryUrls,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        featured: formData.featured,
        onSale: formData.onSale,
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      }

      // Usar airtableId si existe para actualizar
      const productId = product ? ((product as any).airtableId || product.id) : null
      const url = productId
        ? `/api/admin/products/${productId}`
        : "/api/admin/products"
      const method = productId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })

      const data = await response.json()

      if (data.success) {
        onSuccess()
      } else {
        alert(data.error || "Error al guardar el producto")
      }
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Error al guardar el producto")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Producto *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ej: Samsung Galaxy A54"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL) *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="samsung-galaxy-a54"
            required
          />
          <p className="text-xs text-muted-foreground">
            Se genera automáticamente desde el nombre
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio (Guaraníes) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="389990"
            required
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="10"
            required
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descripción detallada del producto..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-file">Imagen principal *</Label>
        {/* Usamos un input nativo para evitar cualquier restricción extra del componente Input */}
        <input
          id="image-file"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null
            setMainFile(file)
          }}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
        />
        {formData.image && !mainFile && (
          <p className="text-xs text-muted-foreground">
            Imagen actual: <span className="break-all">{formData.image}</span>
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Sube una imagen desde tu computadora o celular. Si no subes nada, se usará la URL actual.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gallery">Galería de imágenes (hasta 3)</Label>
        {/* También aquí input nativo para evitar problemas de click */}
        <input
          id="gallery"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || [])
            setGalleryFiles(files.slice(0, 3))
          }}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Opcional: selecciona hasta 3 imágenes adicionales para mostrar en el detalle del producto.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoría *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
          required
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="celulares">Celulares</SelectItem>
            <SelectItem value="perfumes">Perfumes</SelectItem>
            <SelectItem value="accesorios">Accesorios</SelectItem>
            <SelectItem value="regalos">Regalos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, featured: checked === true })
            }
          />
          <Label htmlFor="featured" className="cursor-pointer">
            Producto destacado
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="onSale"
            checked={formData.onSale}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, onSale: checked === true })
            }
          />
          <Label htmlFor="onSale" className="cursor-pointer">
            En oferta
          </Label>
        </div>

        {formData.onSale && (
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Precio Original (si está en oferta)</Label>
            <Input
              id="originalPrice"
              type="number"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              placeholder="429990"
              min="0"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            product ? "Actualizar Producto" : "Agregar Producto"
          )}
        </Button>
      </div>
    </form>
  )
}
