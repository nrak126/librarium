import { supabase } from "@/src/lib/supabase";
import { NextResponse } from "next/server";
import { Book } from "@/src/types/book";
import { Loan } from "@/src/types";

// POST: 貸し出し履歴を登録する
export async function POST(request: Request) {
  try {
    const { isbn, uid, loanPeriod } = await request.json();

    const {
      data: book,
      error: bookFetchError,
    }: { data: Book | null; error: Error | null } = await supabase
      .from("books")
      .select("*")
      .eq("isbn", isbn)
      .single();
    if (bookFetchError || !book) {
      throw bookFetchError || new Error("Book not found");
    }

    const { error: bookError } = await supabase
      .from("books")
      .update({
        available: book.available - 1,
        loanCount: book.loanCount + 1,
      })
      .eq("isbn", isbn);
    if (bookError) {
      throw bookError;
    }

    const { data, error: loanError }: { data: Loan[] | null; error: Error | null } =
      await supabase
        .from("loans")
        .insert({
          isbn: isbn,
          uid: uid,
          return_date: new Date(loanPeriod).toISOString(),
        })
        .select("*");
    if (loanError) {
      throw loanError;
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating loan:", error);
    return NextResponse.error();
  }
}
// ✅ GET: 貸出中のデータを取得（rental一覧として利用）
export async function GET() {
  try {
    const { data, error } = await supabase.from("loans").select(`
        id,
        isReturned,
        return_date,
        books (
          title,
          thumbnail
        ),
        users (
          name,
          studentId,
          icon
        )
      `);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching rental data:", error);
    return NextResponse.error();
  }
}
