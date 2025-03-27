import { NextResponse } from 'next/server';
import { supabase } from "@/src/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ isbn: string }> }
) {
  try {
    const { isbn } = await params;

    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("isbn", isbn);
    if (error) {
      throw error;
    }
    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}