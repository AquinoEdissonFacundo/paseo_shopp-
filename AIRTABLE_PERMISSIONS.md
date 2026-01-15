# Solución: Error "You are not authorized to perform this operation"

## 🔴 Problema

Este error ocurre cuando el **API Key** de Airtable no tiene permisos de **escritura** (solo tiene lectura).

## ✅ Solución

### Opción 1: Crear un nuevo Personal Access Token (Recomendado)

1. Ve a tu cuenta de Airtable: https://airtable.com/account
2. En la sección **"Developer"**, busca **"Personal access tokens"**
3. Haz clic en **"Create new token"**
4. Configura el token:
   - **Nombre**: `Paseo Shopp Admin` (o el que prefieras)
   - **Scopes** (permisos):
     - ✅ `data.records:read` - Leer registros
     - ✅ `data.records:write` - Crear/editar registros
     - ✅ `schema.bases:read` - Leer estructura de la base
   - **Access**: Selecciona tu base "Productos"
5. Haz clic en **"Create token"**
6. **Copia el token** (solo se muestra una vez)
7. Actualiza tu `.env.local`:
   ```env
   AIRTABLE_API_KEY=tu_nuevo_token_aqui
   AIRTABLE_BASE_ID=app2oXlyIPOz3VYkK
   ADMIN_PASSWORD=1234
   ```

### Opción 2: Verificar permisos del token actual

Si ya tienes un token, verifica que tenga estos permisos:
- ✅ `data.records:read`
- ✅ `data.records:write`

### Opción 3: Usar API Key de Workspace (si tienes plan de pago)

Si tienes un plan de pago, puedes crear un API Key con permisos específicos:
1. Ve a tu Workspace en Airtable
2. Settings → API
3. Crea un nuevo API Key con permisos de escritura

## 🔍 Verificar que funciona

Después de actualizar el token:

1. Reinicia el servidor:
   ```bash
   pnpm dev
   ```

2. Prueba crear un producto en el panel admin:
   - Ve a `http://localhost:3000/admin`
   - Inicia sesión
   - Haz clic en "Agregar Producto"
   - Completa el formulario y guarda

3. Si funciona, verás el producto en Airtable y en el dashboard

## ⚠️ Importante

- Los **Personal Access Tokens** son más seguros que los API Keys antiguos
- Asegúrate de que el token tenga acceso a la base correcta
- No compartas tu token públicamente
- Si el token se compromete, revócalo y crea uno nuevo

## 📚 Referencia

- [Documentación de Airtable sobre tokens](https://airtable.com/developers/web/guides/personal-access-tokens)
- [Permisos de API de Airtable](https://airtable.com/developers/web/api/scopes)
