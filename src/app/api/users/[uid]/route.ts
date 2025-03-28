import { NextResponse } from 'next/server';
import { supabase } from "@/src/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uid", uid);
    if (error) {
      throw error;
    }
    return NextResponse.json(data[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}