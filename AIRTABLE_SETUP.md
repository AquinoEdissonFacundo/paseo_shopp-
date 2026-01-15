# Configuración de Airtable - Guía Paso a Paso

## 📋 Pasos para configurar Airtable

### 1. Crear cuenta en Airtable
1. Ve a [airtable.com](https://airtable.com) y crea una cuenta gratuita
2. Elige el plan **"Free"** (no necesitas el plan de pago)
3. El plan gratuito incluye:
   - 1,200 registros por base
   - 2GB de espacio para imágenes
   - 1,000 requests de API por mes

### 2. Crear la base de datos "Productos"

#### Paso 2.1: Crear nueva base
1. En el dashboard de Airtable, haz clic en **"+ Add a base"** o **"Start from scratch"**
2. Nombra la base: **"Productos"**
3. Haz clic en **"Create base"**

#### Paso 2.2: Renombrar la tabla (opcional)
1. Por defecto la tabla se llama "Table 1"
2. Haz clic derecho en "Table 1" → **"Rename"**
3. Cámbiala a **"Productos"** (o déjala como está y actualiza `TABLE_NAME` en `lib/airtable.ts`)

### 3. Crear las columnas en Airtable

Para cada columna, haz clic en **"+ Add a field"** (o el ícono "+" a la derecha de las columnas):

#### Columna 1: `name`
- **Tipo**: Single line text
- **Nombre**: `name`
- ✅ Listo

#### Columna 2: `slug`
- **Tipo**: Single line text  
- **Nombre**: `slug`
- ✅ Listo

#### Columna 3: `price`
- **Tipo**: Number
- **Nombre**: `price`
- **Formato**: Integer (sin decimales)
- ✅ Listo

#### Columna 4: `description`
- **Tipo**: Long text
- **Nombre**: `description`
- ✅ Listo

#### Columna 5: `image`
- **Tipo**: Attachment
- **Nombre**: `image`
- ✅ Listo

#### Columna 6: `images` (opcional)
- **Tipo**: Attachment
- **Nombre**: `images`
- ✅ Listo

#### Columna 7: `category`
- **Tipo**: Single select
- **Nombre**: `category`
- **Opciones**: 
  - celulares
  - perfumes
  - accesorios
  - regalos
- ✅ Listo

#### Columna 8: `stock`
- **Tipo**: Number
- **Nombre**: `stock`
- **Formato**: Integer
- ✅ Listo

#### Columna 9: `featured`
- **Tipo**: Checkbox
- **Nombre**: `featured`
- ✅ Listo

#### Columna 10: `onSale`
- **Tipo**: Checkbox
- **Nombre**: `onSale`
- ✅ Listo

#### Columna 11: `originalPrice`
- **Tipo**: Number
- **Nombre**: `originalPrice`
- **Formato**: Integer
- ✅ Listo

**Resumen de columnas:**
| Nombre | Tipo | Requerido |
|--------|------|-----------|
| name | Single line text | ✅ |
| slug | Single line text | ✅ |
| price | Number | ✅ |
| description | Long text | ✅ |
| image | Attachment | ✅ |
| images | Attachment | ❌ |
| category | Single select | ✅ |
| stock | Number | ✅ |
| featured | Checkbox | ❌ |
| onSale | Checkbox | ❌ |
| originalPrice | Number | ❌ |

### 4. Obtener las credenciales de API

#### 🔑 Paso 4.1: Obtener Base ID

**Método 1 (Recomendado):**
1. Abre tu base "Productos" en Airtable
2. Ve a [airtable.com/api](https://airtable.com/api)
3. En la lista de bases, busca y haz clic en **"Productos"**
4. En la parte superior de la página verás una URL como:
   ```
   https://api.airtable.com/v0/appXXXXXXXXXXXXXX/Productos
   ```
5. El **Base ID** es la parte `appXXXXXXXXXXXXXX` 
   - Copia solo esa parte (ejemplo: `appAbc123Def456`)

**Método 2 (Alternativo):**
1. Abre tu base "Productos"
2. En la URL del navegador verás algo como: `airtable.com/appXXXXXXXXXXXXXX/...`
3. El Base ID es la parte después de `/app` y antes del siguiente `/`

#### 🔐 Paso 4.2: Obtener API Key

1. Ve a tu perfil:
   - Haz clic en tu foto/avatar (esquina superior derecha)
   - Selecciona **"Account"**
   - O ve directamente a [airtable.com/account](https://airtable.com/account)

2. En el menú lateral, busca **"Developer options"** o **"Personal access tokens"**

3. Haz clic en **"Create new token"** o **"Generate token"**

4. Configura el token:
   - **Name**: `Paseo Shopp` (o el nombre que quieras)
   - **Scopes**: 
     - ✅ **OBLIGATORIO**: `data.records:read` (para leer productos)
     - ✅ **OBLIGATORIO**: `data.records:write` (para crear/editar/eliminar productos desde el panel admin)
     - ✅ Opcional: `schema.bases:read` (para leer la estructura)
   - **Access**: Selecciona tu base "Productos"
   
   ⚠️ **IMPORTANTE**: Sin `data.records:write` no podrás usar el panel de administración.

5. Haz clic en **"Create token"**

6. ⚠️ **IMPORTANTE**: Copia el token inmediatamente (solo se muestra una vez)
   - Si lo pierdes, tendrás que crear uno nuevo

**Ejemplo de cómo se ven:**
```
Base ID: appAbc123Def456Ghi789
API Key: patXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 5. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
AIRTABLE_API_KEY=tu_api_key_aqui
AIRTABLE_BASE_ID=tu_base_id_aqui
```

**IMPORTANTE**: 
- No subas el archivo `.env.local` a GitHub (ya está en `.gitignore`)
- En Vercel, agrega estas variables en Settings → Environment Variables

### 6. Subir productos

1. Abre tu base de datos en Airtable
2. Agrega productos manualmente:
   - Arrastra imágenes a la columna `image`
   - Completa todos los campos
   - El `slug` debe ser único y en minúsculas (ej: "samsung-galaxy-a54")
3. Los productos aparecerán automáticamente en tu sitio web

### 7. Verificar que funciona

1. Reinicia el servidor de desarrollo: `pnpm dev`
2. Visita `/productos` en tu sitio
3. Deberías ver los productos desde Airtable

## Notas importantes

- Si no configuras Airtable, la app usará los productos estáticos por defecto
- El plan gratuito tiene límite de 1,200 productos
- Las imágenes se almacenan en Airtable (2GB gratis)
- Los cambios en Airtable se reflejan en el sitio (puede tomar unos segundos)

## Solución de problemas

**Error: "Invalid API key"**
- Verifica que copiaste correctamente el API key
- Asegúrate de que el token tenga permisos de lectura

**Error: "Base not found"**
- Verifica que el Base ID sea correcto
- Asegúrate de que la tabla se llame "Productos" (o actualiza `TABLE_NAME`)

**No aparecen productos**
- Verifica que hay productos en Airtable
- Revisa la consola del navegador para ver errores
- Asegúrate de que las columnas tengan los nombres correctos
