# Columnas Necesarias en Airtable

## ✅ Columnas Requeridas

Tu tabla en Airtable necesita estas columnas. Puedes usar nombres en **español** o **inglés**:

### Opción 1: Nombres en Inglés (Recomendado)

| Nombre        | Tipo             | Ejemplo                                  |
| ------------- | ---------------- | ---------------------------------------- |
| `name`        | Single line text | "Samsung Galaxy A54"                     |
| `slug`        | Single line text | "samsung-galaxy-a54"                     |
| `price`       | Number           | 389990                                   |
| `description` | Long text        | "Pantalla Super AMOLED..."               |
| `image`       | Attachment       | [arrastra imagen]                        |
| `category`    | Single select    | celulares, perfumes, accesorios, regalos |
| `stock`       | Number           | 8                                        |

### Opción 2: Nombres en Español (También funciona)

| Nombre        | Tipo             | Ejemplo                                  |
| ------------- | ---------------- | ---------------------------------------- |
| `Nombre`      | Single line text | "Samsung Galaxy A54"                     |
| `slug`        | Single line text | "samsung-galaxy-a54"                     |
| `Precio`      | Number           | 389990                                   |
| `Descripción` | Long text        | "Pantalla Super AMOLED..."               |
| `Imagen`      | Attachment       | [arrastra imagen]                        |
| `Categoría`   | Single select    | celulares, perfumes, accesorios, regalos |
| `Stock`       | Number           | 8                                        |

## 📋 Columnas Opcionales

| Nombre                              | Tipo       | Descripción                |
| ----------------------------------- | ---------- | -------------------------- |
| `images` o `Imágenes`               | Attachment | Imágenes adicionales       |
| `featured` o `Destacado`            | Checkbox   | Marcar si es destacado     |
| `onSale` o `En Oferta`              | Checkbox   | Marcar si está en oferta   |
| `originalPrice` o `Precio Original` | Number     | Precio antes del descuento |

## 🔧 Cómo Crear las Columnas

1. Abre tu base "Productos" en Airtable
2. Haz clic en **"+ Add a field"** (o el ícono "+" a la derecha)
3. Para cada columna:
   - Escribe el nombre exacto (respeta mayúsculas/minúsculas)
   - Selecciona el tipo correcto
   - Guarda

## ⚠️ Importante

- El nombre de las columnas debe ser **exacto** (respeta mayúsculas/minúsculas)
- La columna `category` o `Categoría` debe tener estas opciones:
  - celulares
  - perfumes
  - accesorios
  - regalos
  - muebles
- El `slug` debe ser único para cada producto
- Las imágenes se suben arrastrando archivos a la columna Attachment

## 🧪 Probar

Ejecuta: `pnpm test:airtable` para verificar que todo funcione correctamente.
