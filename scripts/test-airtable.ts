/**
 * Script para probar la conexión con Airtable
 * Ejecuta: pnpm test:airtable
 */

import 'dotenv/config'
import Airtable from 'airtable'

const API_KEY = process.env.AIRTABLE_API_KEY
const BASE_ID = process.env.AIRTABLE_BASE_ID

if (!API_KEY || !BASE_ID) {
  console.error('❌ Error: Faltan variables de entorno')
  console.log('\nCrea un archivo .env.local con:')
  console.log('AIRTABLE_API_KEY=tu_api_key')
  console.log('AIRTABLE_BASE_ID=tu_base_id')
  process.exit(1)
}

const base = new Airtable({ apiKey: API_KEY }).base(BASE_ID)

async function testConnection() {
  try {
    console.log('🔍 Probando conexión con Airtable...\n')
    
    // Primero, obtener todas las tablas para ver qué hay
    const tables = await base('Productos').select({ maxRecords: 1 }).firstPage()
    
    if (tables.length === 0) {
      console.log('✅ Conexión exitosa!')
      console.log('⚠️  Pero no hay productos en la tabla "Productos"')
      console.log('\nAgrega productos en Airtable para verlos en el sitio.')
    } else {
      console.log('✅ Conexión exitosa!')
      console.log(`📦 Encontrados ${tables.length} producto(s)\n`)
      
      // Mostrar las columnas disponibles
      const firstRecord = tables[0]
      console.log('📋 Columnas disponibles en tu tabla:')
      console.log('─'.repeat(50))
      Object.keys(firstRecord.fields).forEach((key, index) => {
        const value = firstRecord.fields[key]
        const type = Array.isArray(value) ? 'Array' : typeof value
        console.log(`${index + 1}. ${key} (${type})`)
      })
      console.log('─'.repeat(50))
      
      console.log('\n📝 Primer producto:')
      console.log(JSON.stringify(firstRecord.fields, null, 2))
      
      console.log('\n⚠️  IMPORTANTE: Verifica que tengas estas columnas:')
      console.log('  - name (o Nombre)')
      console.log('  - slug')
      console.log('  - price (o Precio)')
      console.log('  - description (o Descripción)')
      console.log('  - image (o Imagen)')
      console.log('  - category (o Categoría)')
      console.log('  - stock (o Stock)')
    }
  } catch (error: any) {
    console.error('❌ Error de conexión:', error.message)
    
    if (error.message.includes('Could not find table')) {
      console.log('\n💡 Solución:')
      console.log('1. Verifica que la tabla se llame exactamente "Productos"')
      console.log('2. O actualiza TABLE_NAME en lib/airtable.ts')
    } else if (error.message.includes('authentication')) {
      console.log('\n💡 Solución:')
      console.log('1. Verifica que el API_KEY sea correcto')
      console.log('2. Asegúrate de que el token tenga permisos de lectura')
    } else if (error.message.includes('base')) {
      console.log('\n💡 Solución:')
      console.log('1. Verifica que el BASE_ID sea correcto')
      console.log('2. Debe ser algo como: appXXXXXXXXXXXXXX')
    }
  }
}

testConnection()
