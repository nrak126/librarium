'use server';

import { createSupabaseAdmin } from '@/src/lib/supabase';

export async function updateBookStock(isbn: string, stock: number, available: number) {
  try {
    const supabaseAdmin = createSupabaseAdmin();
    
    const { data, error } = await supabaseAdmin
      .from("books")
      .update({ stock, available })
      .eq("isbn", isbn)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`本の更新に失敗しました: ${error.message}`);
    }

    console.log("Updated book:", data);
    return { success: true, book: data };
    
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}
