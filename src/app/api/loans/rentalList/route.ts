// app/api/loans/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// GET: loansのリストを取得する
export async function GET() {
  try {
    const { data, error } = await supabase.from("loans").select(`
        *,
        books(*),
        users(*)
      `);

    if (error) {
      throw error;
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching loans:", error);
    return NextResponse.error();
  }
}
