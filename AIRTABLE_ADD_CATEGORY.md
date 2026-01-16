# Cómo Agregar la Categoría "Muebles" en Airtable

## 🔧 Pasos para Agregar la Nueva Categoría

Si recibes el error **"Insufficient permissions to create new select option 'muebles'"**, necesitas agregar manualmente la opción "muebles" en Airtable.

### Opción 1: Desde la Configuración del Campo (Recomendado)

1. **Abre tu base de datos en Airtable**

   - Ve a [airtable.com](https://airtable.com)
   - Abre la base "Productos"

2. **Edita el campo `category`**

   - Haz clic en el encabezado de la columna `category` (o `Categoría` si usas español)
   - Selecciona **"Customize field type"** o haz clic en el ícono de configuración ⚙️

3. **Agrega la nueva opción**

   - En la sección **"Options"** o **"Opciones"**, verás la lista de categorías existentes
   - Haz clic en **"+ Add option"** o escribe "muebles" en el campo de búsqueda
   - Presiona Enter o haz clic en "Add"

4. **Guarda los cambios**
   - Haz clic en **"Save"** o **"Guardar"**

### Opción 2: Desde un Registro Existente

1. **Abre cualquier registro de producto**
2. **Haz clic en el campo `category`**
3. **Escribe "muebles"** en el campo de búsqueda
4. **Airtable te preguntará si quieres crear una nueva opción**
5. **Haz clic en "Create new option"** o **"Crear nueva opción"**

### ✅ Verificar que Funcionó

1. Intenta crear un nuevo producto desde el panel de administración
2. Selecciona "Muebles" en el campo de categoría
3. Debería funcionar sin errores

## 📝 Nota Importante

- Asegúrate de tener permisos de **editor** o **admin** en la base de Airtable
- Si no tienes permisos, contacta al administrador de la base
- El nombre puede ser **"Muebles"** (con mayúscula) o **"muebles"** (minúsculas) - el código normalizará automáticamente
- Si todas tus categorías están con mayúscula (Celulares, Perfumes, etc.), usa **"Muebles"** para mantener consistencia
