// app/api/books/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";


// GET: loansのリストを取得する
export async function GET() {
  try {
    const { data, error } = await supabase.from("loans").select("*");
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