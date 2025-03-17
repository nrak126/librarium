import { NextResponse } from 'next/server';
import { db } from '@/src/lib/firebaseAdmin';

export async function GET(
  request: Request,
  { params }: { params: { isbn: string } }
) {
  try {
    const { isbn } = params;

    const docRef = db.collection('books').doc(isbn);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const book = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}