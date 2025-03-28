// app/api/users/route.ts
import { NextResponse } from "next/server";
import type { User } from "@/src/types";
import { supabase } from "@/src/lib/supabase";


// GET: ユーザーのリストを取得する
export async function GET() {
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      throw error;
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