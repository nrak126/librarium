// app/api/books/route.ts
import { NextResponse } from 'next/server';
import { db, auth } from '@/src/lib/firebaseAdmin'; // Firebase設定
import { DocumentSnapshot } from 'firebase-admin/firestore';
import type { Book } from "@/src/types/book";

// 管理者権限をチェックするヘルパー関数
async function checkAdmin(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = await auth.verifyIdToken(token);
  if (!decodedToken.admin) {
    throw new Error("User is not an admin");
  }
}

// GET: 本のリストを取得する
export async function GET() {
  try {
    const snapshot = await db.collection("books").get();
    const books = snapshot.docs.map((doc: DocumentSnapshot) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.error();
  }
}

// POST: 新しい本を登録する
export async function POST(request: Request) {
  try {
    // await checkAdmin(request);
    const book: Book = await request.json();

    if (!book.title || !book.author || !book.id) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.collection("books").doc(book.id).set(book);

    return NextResponse.json({ id: book.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.error();
  }
}

// PUT: 本の情報を更新する
export async function PUT(request: Request) {
  try {
    await checkAdmin(request);
    const { id, title, author, publisher, genre } = await request.json();
    const bookRef = db.collection('books').doc(id);
    await bookRef.update({
      title,
      author,
      publisher,
      genre,
    });
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.error();
  }
}

// DELETE: 本を削除する
export async function DELETE(request: Request) {
  try {
    await checkAdmin(request);
    const { id } = await request.json();
    const bookRef = db.collection('books').doc(id);
    await bookRef.delete();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.error();
  }
}