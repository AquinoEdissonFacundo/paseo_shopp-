import Airtable from 'airtable';
import type { Product } from './types';

// Configuración de Airtable
// Solo inicializar si tenemos las credenciales
let base: any = null;

if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
  base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID);
}

const TABLE_NAME = 'Productos';

// Tipos para Airtable
interface AirtableProduct {
  id: string;
  fields: {
    name: string;
    price: number;
    description: string;
    image?: Array<{ url: string }>;
    images?: Array<{ url: string }>;
    category: string;
    slug: string;
    featured?: boolean;
    onSale?: boolean;
    originalPrice?: number;
    stock: number;
  };
}

// Función para transformar productos de Airtable al formato de la app
// Soporta diferentes nombres de columnas (en español o inglés)
function transformAirtableProduct(record: AirtableProduct) {
  const fields = record.fields as any;

  // Mapeo flexible de nombres de columnas
  const getName = () =>
    fields.name ||
    fields.Nombre ||
    fields['Nombre del Producto'] ||
    'Sin nombre';
  const getSlug = () => {
    if (fields.slug) return fields.slug;
    const name = getName();
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };
  const getPrice = () => fields.price || fields.Precio || fields.precio || 0;
  const getDescription = () =>
    fields.description || fields.Descripción || fields.descripcion || '';
  const getImage = () => {
    const img = fields.image || fields.Imagen || fields.imagen;
    if (Array.isArray(img) && img[0]?.url) return img[0].url;
    if (typeof img === 'string') return img;
    return '/placeholder.jpg';
  };
  const getImages = () => {
    const imgs = fields.images || fields.Imágenes || fields.imagenes;
    // Si existe columna `images`/`Imágenes`, usarla
    if (Array.isArray(imgs) && imgs.length > 0) {
      return imgs.map((img: any) => img?.url || img).filter(Boolean);
    }
    // Si no, usar imágenes adicionales de la columna principal `image`
    const main = fields.image || fields.Imagen || fields.imagen;
    if (Array.isArray(main) && main.length > 1) {
      return main
        .slice(1)
        .map((img: any) => img?.url || img)
        .filter(Boolean);
    }
    return [];
  };
  const getCategory = () => {
    const cat = fields.category || fields.Categoría || fields.categoria;
    if (typeof cat === 'string') {
      return cat.toLowerCase().trim();
    }
    return 'otros';
  };
  const getStock = () => fields.stock || fields.Stock || fields.stock || 0;
  const getFeatured = () =>
    fields.featured || fields.Destacado || fields.destacado || false;
  const getOnSale = () =>
    fields.onSale || fields['En Oferta'] || fields.enOferta || false;
  const getOriginalPrice = () =>
    fields.originalPrice || fields['Precio Original'] || fields.precioOriginal;

  return {
    // Usamos siempre el ID real de Airtable para que sea estable
    // y evitar diferencias entre el render del servidor y del cliente.
    id: record.id,
    name: getName(),
    slug: getSlug(),
    price: getPrice(),
    description: getDescription(),
    image: getImage(),
    images: getImages(),
    category: getCategory(),
    featured: getFeatured(),
    onSale: getOnSale(),
    originalPrice: getOriginalPrice(),
    stock: getStock(),
    airtableId: record.id, // Guardar el ID de Airtable para poder actualizar/eliminar
  };
}

// Obtener todos los productos
export async function getProductsFromAirtable() {
  if (!base) {
    console.warn(
      'Airtable no está configurado. Verifica AIRTABLE_API_KEY y AIRTABLE_BASE_ID en .env.local'
    );
    return [];
  }

  try {
    const records = await base(TABLE_NAME).select().all();
    return records.map((record: any) => {
      const transformed = transformAirtableProduct(record as any);
      // Guardar el ID de Airtable para poder actualizar/eliminar
      return { ...transformed, airtableId: record.id };
    });
  } catch (error) {
    console.error('Error fetching products from Airtable:', error);
    // Fallback a productos estáticos si hay error
    return [];
  }
}

// Obtener un producto por slug
export async function getProductBySlugFromAirtable(slug: string) {
  if (!base) {
    return null;
  }

  try {
    // Intentar con diferentes nombres de columna
    const formulas = [`{slug} = "${slug}"`, `{Slug} = "${slug}"`];

    for (const formula of formulas) {
      const records = await base(TABLE_NAME)
        .select({ filterByFormula: formula })
        .firstPage();

      if (records.length > 0) {
        return transformAirtableProduct(records[0] as any);
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching product from Airtable:', error);
    return null;
  }
}

// Obtener productos por categoría
export async function getProductsByCategoryFromAirtable(categorySlug: string) {
  if (!base) {
    return [];
  }

  try {
    // Intentar con diferentes nombres de columna
    const formulas = [
      `LOWER({category}) = "${categorySlug.toLowerCase()}"`,
      `LOWER({Categoría}) = "${categorySlug.toLowerCase()}"`,
      `LOWER({categoria}) = "${categorySlug.toLowerCase()}"`,
    ];

    for (const formula of formulas) {
      try {
        const records = await base(TABLE_NAME)
          .select({ filterByFormula: formula })
          .all();

        if (records.length > 0) {
          return records.map((record) =>
            transformAirtableProduct(record as any)
          );
        }
      } catch (e) {
        // Continuar con el siguiente nombre
        continue;
      }
    }

    return [];
  } catch (error) {
    console.error('Error fetching products by category from Airtable:', error);
    return [];
  }
}

// Obtener productos destacados
export async function getFeaturedProductsFromAirtable() {
  if (!base) {
    return [];
  }

  try {
    // Intentar con diferentes nombres de columna
    const formulas = [
      '{featured} = TRUE()',
      '{Destacado} = TRUE()',
      '{destacado} = TRUE()',
    ];

    for (const formula of formulas) {
      try {
        const records = await base(TABLE_NAME)
          .select({ filterByFormula: formula })
          .all();

        if (records.length > 0) {
          return records.map((record: any) =>
            transformAirtableProduct(record as any)
          );
        }
      } catch (e) {
        // Continuar con el siguiente nombre
        continue;
      }
    }

    return [];
  } catch (error) {
    console.error('Error fetching featured products from Airtable:', error);
    return [];
  }
}

// Crear un nuevo producto
export async function createProductInAirtable(product: Omit<Product, 'id'>) {
  if (!base) {
    throw new Error(
      'Airtable no está configurado. Verifica AIRTABLE_API_KEY y AIRTABLE_BASE_ID en .env.local'
    );
  }

  try {
    const fields: any = {
      name: product.name,
      slug: product.slug,
      price: product.price,
      description: product.description,
      // Normalizar categoría al enviar: convertir a minúsculas para coincidir con cómo se leen
      // Esto asegura consistencia entre lectura y escritura
      category: product.category.toLowerCase().trim(),
      stock: product.stock || 0,
    };

    // Manejar imágenes: todas en la columna principal `image` (Airtable soporta múltiples attachments)
    const allImageUrls = [product.image, ...(product.images || [])].filter(
      Boolean
    );

    if (allImageUrls.length > 0) {
      fields.image = allImageUrls.map((url) => ({ url }));
    }

    if (product.featured !== undefined) fields.featured = product.featured;
    if (product.onSale !== undefined) fields.onSale = product.onSale;
    if (product.originalPrice !== undefined)
      fields.originalPrice = product.originalPrice;

    const record = await base(TABLE_NAME).create(fields);
    const transformed = transformAirtableProduct(record as any);
    return { ...transformed, airtableId: record.id };
  } catch (error) {
    console.error('Error creating product in Airtable:', error);
    throw error;
  }
}

// Actualizar un producto
export async function updateProductInAirtable(
  id: string,
  product: Partial<Product>
) {
  if (!base) {
    throw new Error(
      'Airtable no está configurado. Verifica AIRTABLE_API_KEY y AIRTABLE_BASE_ID en .env.local'
    );
  }

  try {
    // Buscar el producto primero para obtener el record ID de Airtable
    let recordId = id;

    // Si el ID no es un record ID de Airtable, buscar por slug
    if (!id.startsWith('rec')) {
      const records = await base(TABLE_NAME)
        .select({ filterByFormula: `{slug} = "${id}"` })
        .firstPage();

      if (records.length === 0) {
        throw new Error('Producto no encontrado');
      }
      recordId = records[0].id;
    }

    const fields: any = {};
    if (product.name !== undefined) fields.name = product.name;
    if (product.slug !== undefined) fields.slug = product.slug;
    if (product.price !== undefined) fields.price = product.price;
    if (product.description !== undefined)
      fields.description = product.description;
    if (product.image !== undefined || product.images !== undefined) {
      const allImageUrls = [product.image, ...(product.images || [])].filter(
        Boolean
      );
      fields.image = allImageUrls.map((url) => ({ url }));
    }
    if (product.category !== undefined) {
      // Normalizar categoría al enviar: convertir a minúsculas para coincidir con cómo se leen
      fields.category = product.category.toLowerCase().trim();
    }
    if (product.stock !== undefined) fields.stock = product.stock;
    if (product.featured !== undefined) fields.featured = product.featured;
    if (product.onSale !== undefined) fields.onSale = product.onSale;
    if (product.originalPrice !== undefined) {
      fields.originalPrice = product.originalPrice;
    }

    const record = await base(TABLE_NAME).update(recordId, fields);
    const transformed = transformAirtableProduct(record as any);
    return { ...transformed, airtableId: record.id };
  } catch (error) {
    console.error('Error updating product in Airtable:', error);
    throw error;
  }
}

// Eliminar un producto
export async function deleteProductInAirtable(id: string) {
  if (!base) {
    throw new Error(
      'Airtable no está configurado. Verifica AIRTABLE_API_KEY y AIRTABLE_BASE_ID en .env.local'
    );
  }

  try {
    let recordId = id;

    // Si el ID no es un record ID de Airtable, buscar por slug
    if (!id.startsWith('rec')) {
      const records = await base(TABLE_NAME)
        .select({ filterByFormula: `{slug} = "${id}"` })
        .firstPage();

      if (records.length === 0) {
        throw new Error('Producto no encontrado');
      }
      recordId = records[0].id;
    }

    await base(TABLE_NAME).destroy(recordId);
    return true;
  } catch (error) {
    console.error('Error deleting product in Airtable:', error);
    throw error;
  }
}

// Obtener producto por ID de Airtable
export async function getProductByIdFromAirtable(id: string) {
  if (!base) {
    return null;
  }

  try {
    let recordId = id;

    // Si el ID no es un record ID de Airtable, buscar por slug
    if (!id.startsWith('rec')) {
      const records = await base(TABLE_NAME)
        .select({ filterByFormula: `{slug} = "${id}"` })
        .firstPage();

      if (records.length === 0) {
        return null;
      }
      recordId = records[0].id;
    }

    const record = await base(TABLE_NAME).find(recordId);
    const transformed = transformAirtableProduct(record as any);
    return { ...transformed, airtableId: record.id };
  } catch (error) {
    console.error('Error fetching product by ID from Airtable:', error);
    return null;
  }
}
