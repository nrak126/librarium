// app/api/books/route.ts
import { NextResponse } from "next/server";
import type { Book } from "@/src/types/book";
import { supabase } from "@/src/lib/supabase";

// GET: クエリで 'の' を含む本を検索
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const keyword = searchParams.get("search");

	try {
		let query = supabase.from("books").select("*").order("loanCount", { ascending: false }).limit(10);

		if (keyword) {
			query = query.or(
				`title.ilike.%${keyword}%,author.ilike.%${keyword}%,description.ilike.%${keyword}%,publisher.ilike.%${keyword}%`
			);
		}

		const { data, error }: { data: Book[] | null, error: any } = await query;

		if (error) {
			console.error("Supabase error:", error);
			// 認証エラーの場合は空配列を返す
			if (error.message.includes("session") || error.message.includes("auth")) {
				return NextResponse.json([]);
			}
			throw error;
		}

		return NextResponse.json(data || []);
	} catch (error) {
		console.error("Error fetching books:", error);
		// エラー時は空配列を返す（開発時）
		return NextResponse.json([]);
	}
}
