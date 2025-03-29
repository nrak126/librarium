import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";
import { Book } from "@/src/types";

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ isbn: string }> }
) {
  try {
    let { available } = await request.json();
    const { isbn } = await params;

    available = available - 1;

    const { data, error } = await supabase
      .from("books")
      .update(available)
      .eq("isbn", isbn);
    if (error) {
      throw error;
    }

    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
