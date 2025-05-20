// app/api/users/route.ts
import { NextResponse } from "next/server";
import type { User } from "@/src/types";
import { supabase } from "@/src/lib/supabase";


// GET: ユーザーのリストを取得する
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("search");
  try {
    let query = supabase.from("users_view").select("*");
    if (keyword) {
      query = query.or(
        `name.ilike.%${keyword}%,role.ilike.%${keyword}%,studentId.ilike.%${keyword}%,tags_string.ilike.%${keyword}%`
      );
    }
    const { data, error } = await query;
    if (error) {
      throw error;
    }
    // tags_string を削除する処理
    if (data && Array.isArray(data)) {
      data.map((user) => {
        delete user.tags_string;
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.error();
  }
}

// POST: 新しいユーザーを登録する
export async function POST(request: Request) {
  try {
    const user: User = await request.json();
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select("*");
    if (error) {
      throw error;
    }
    console.log("Created user:", data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.error();
  }
}