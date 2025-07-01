// app/api/loans/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

// GET: loansのリストを取得する
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const uid = searchParams.get("uid") || "";
	if(!uid) {
		return NextResponse.json([]);
	}

	try {
		const { data, error } = await supabase
			.from("loans")
			.select(
				`
				*,
				books(*),
			`
			).eq("uid", uid)
			.order("rental_date", { ascending: false });

		if (error) {
			throw error;
		}
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching loans:", error);
		return NextResponse.error();
	}
}