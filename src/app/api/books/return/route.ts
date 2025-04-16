import { supabase } from "@/src/lib/supabase";
import { NextResponse } from "next/server";

// POST: 返却処理を行う
export async function POST(request: Request) {
  try {
    const { isbn, uid } = await request.json();
    console.log("isbn:", isbn, uid);

    const { data: book, error: bookFetchError } =  await supabase
    .from("books")
    .select("*")
    .eq("isbn", isbn)
    .single();
      if (bookFetchError) {
        throw bookFetchError;
      }

    const { error: bookError } = await supabase
      .from("books")
      .update({ available: book.available + 1 })
      .eq("isbn", isbn);
    if (bookError) {
      throw bookError;
    }

    const { data, error: loanError } = await supabase
      .from("loans")
      .update({
        isReturned: true,
        return_date: new Date().toISOString(),
      })
      .eq("isbn", isbn)
      .eq("uid", uid);
    if (loanError) {
      throw loanError;
    }
    console.log("Updated loan:", data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating loan:", error);
    return NextResponse.error();
  }
}
