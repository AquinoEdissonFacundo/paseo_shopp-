import { NextResponse } from 'next/server';
import { uploadImageBuffer } from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No se enviaron archivos' },
        { status: 400 },
      );
    }

    // Limitar a 3 imágenes por seguridad
    const limitedFiles = files.slice(0, 3);

    const uploads = await Promise.all(
      limitedFiles.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await uploadImageBuffer(buffer, 'paseo-shopp/productos');
        return result.secure_url;
      }),
    );

    return NextResponse.json({ success: true, urls: uploads });
  } catch (error: any) {
    console.error('Error subiendo imágenes:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Error al subir las imágenes',
      },
      { status: 500 },
    );
  }
}

