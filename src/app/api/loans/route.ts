// app/api/books/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";


// GET: loansのリストを取得する
export async function GET(reqest: Request) {
  try {
    const { searchParams } = new URL(reqest.url);
    const uid = searchParams.get("uid") || "";
    const isbn = searchParams.get("isbn") || "";

    let query = supabase.from("loans").select("*");
    if (uid) query = query.eq("uid", uid);
    if (isbn) query = query.eq("isbn", isbn);

    const { data, error } = await query;
    if (error) {
      throw error;
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching loans:", error);
    return NextResponse.error();
  }
}

// POST: 新しい本を登録する
// export async function POST(request: Request) {
// }

// PUT: 本の情報を更新する
// export async function PUT(request: Request) {
// }

// DELETE: 本を削除する
// export async function DELETE(request: Request) {
// }