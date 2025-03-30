import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("loans")
      .select("*")
      .eq("id", id);
    if (error) {
      throw error;
    }
    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching loan:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}