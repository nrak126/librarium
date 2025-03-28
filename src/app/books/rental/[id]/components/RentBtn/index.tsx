'use client';

import { Btn } from "@/src/components/book/Btn";

import { supabase } from "@/src/lib/supabase";

export function RentBtn({isbn}: {isbn: string}) {
	const handleRent = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      // ここでエラーハンドリング（エラーメッセージ表示とか）
      throw error;
    }
    
    const { user } = data;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/rental`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isbn: isbn, uid: user.id }),
      }
    );

    if (!res.ok) {
      // ここでエラーハンドリング（エラーメッセージ表示とか）
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  };

	return (
		<div>
			<Btn text="借りる" bgColor="#99C6E2" onClick={handleRent} />
		</div>
	);
}