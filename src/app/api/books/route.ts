// app/api/books/route.ts
import { NextResponse } from "next/server";
import type { Book } from "@/src/types/book";
import { supabase } from "@/src/lib/supabase";


// GET: クエリで 'の' を含む本を検索
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("search");

  try {
    let query = supabase.from("books").select("*");

    if (keyword) {
      query = query.or(
        `title.ilike.%${keyword}%,author.ilike.%${keyword}%,description.ilike.%${keyword}%,publisher.ilike.%${keyword}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.error();
  }
}

// POST: 新しい本を登録する
export async function POST(request: Request) {
  try {
    const book: Book = await request.json();
    const { data, error } = await supabase
      .from("books")
      .insert(book)
      .select("*");
    if (error) {
      throw error;
    }
    console.log("Created book:", data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.error();
  }
}

// PUT: 本の情報を更新する
// export async function PUT(request: Request) {
// }

// DELETE: 本を削除する
// export async function DELETE(request: Request) {
// }