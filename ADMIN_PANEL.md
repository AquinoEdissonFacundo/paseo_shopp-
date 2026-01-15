# Panel de Administración

## 🎯 ¿Qué es?

Un panel web simple y fácil de usar para que tu cliente pueda gestionar productos sin necesidad de usar Airtable directamente.

## 🔐 Acceso

1. Ve a: `https://tudominio.com/admin`
2. Ingresa la contraseña configurada en `.env.local`

## 📝 Configuración

Agrega esta variable a tu archivo `.env.local`:

```env
ADMIN_PASSWORD=tu_contraseña_segura_aqui
```

**⚠️ IMPORTANTE:** Cambia la contraseña por defecto (`admin123`) por una contraseña segura.

## ✨ Funcionalidades

### ✅ Ver todos los productos
- Lista visual de todos los productos
- Estadísticas rápidas (total, destacados, en oferta)

### ➕ Agregar productos
- Formulario simple con todos los campos necesarios
- Generación automática de slug desde el nombre
- Validación de campos requeridos

### ✏️ Editar productos
- Click en "Editar" en cualquier producto
- Modifica cualquier campo
- Guarda los cambios

### 🗑️ Eliminar productos
- Click en "Eliminar" en cualquier producto
- Confirmación antes de eliminar
- Eliminación permanente

## 📋 Campos del Formulario

- **Nombre del Producto** (requerido)
- **Slug** (se genera automáticamente, pero puedes editarlo)
- **Precio** (en guaraníes, requerido)
- **Stock** (cantidad disponible, requerido)
- **Descripción** (requerido)
- **URL de la Imagen** (requerido)
- **Categoría** (requerido): Celulares, Perfumes, Accesorios, Regalos
- **Producto destacado** (opcional)
- **En oferta** (opcional)
- **Precio Original** (si está en oferta)

## 🖼️ Imágenes

### Opción 1: URL Externa
Pega la URL completa de la imagen (ej: `https://ejemplo.com/imagen.jpg`)

### Opción 2: Desde Airtable
1. Sube la imagen a Airtable en la columna `image`
2. Haz clic derecho en la imagen
3. Copia la URL
4. Pégala en el formulario

## 🔒 Seguridad

- Autenticación simple con contraseña
- Sesión guardada en el navegador
- Protección de rutas API (en producción, considera agregar más seguridad)

## 🚀 Próximas Mejoras

- [ ] Subida directa de imágenes
- [ ] Vista previa de imágenes
- [ ] Búsqueda y filtros
- [ ] Ordenamiento de productos
- [ ] Historial de cambios
- [ ] Autenticación más robusta (JWT, OAuth)

## 📱 Responsive

El panel funciona perfectamente en:
- 💻 Desktop
- 📱 Tablet
- 📱 Móvil

## 🆘 Solución de Problemas

### "No puedo iniciar sesión"
- Verifica que `ADMIN_PASSWORD` esté configurado en `.env.local`
- Reinicia el servidor después de cambiar la contraseña

### "Error al guardar producto"
- Verifica que todas las columnas requeridas existan en Airtable
- Revisa la consola del navegador para más detalles

### "You are not authorized to perform this operation"
- ⚠️ Tu API key de Airtable no tiene permisos de escritura
- Ve a [AIRTABLE_PERMISSIONS.md](./AIRTABLE_PERMISSIONS.md) para la solución
- Crea un nuevo token con `data.records:write` habilitado

### "No se ven los productos"
- Verifica que `AIRTABLE_API_KEY` y `AIRTABLE_BASE_ID` estén configurados
- Ejecuta `pnpm test:airtable` para verificar la conexión
