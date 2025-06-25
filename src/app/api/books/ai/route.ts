import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

// Gemini
async function fetchFromGemini(isbn: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
                # 指示
                あなたは書籍情報をJSON形式で返すAPIとして振る舞ってください。
                指定されたISBNコードの書籍情報を、以下のルールに厳密に従ってJSONオブジェクトとして出力してください。

                # 全体ルール
                1.  出力はJSONオブジェクトのみとし、他のテキスト（挨拶、説明、マークダウンの\`\`\`jsonなど）は絶対に含めないでください。
                2.  'isbn' フィールドには、入力されたISBNの値を文字列として設定してください。
                3.  'created_at' フィールドには、現在の日時をISO 8601形式で設定してください。
             
                # 情報が見つからない場合のルール
                書籍情報の一部が見つからない場合は、以下のデフォルト値を必ず使用してください。
                - "title": "タイトル不明"
                - "thumbnail": ""
                - "description": "説明がありません"
                - "author": "著者情報がありません"
                - "publisher": "出版会社情報がありません"

                # 入力ISBN
                ${isbn}
                `;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text.replace(/```json|```/g, "").trim());
    json.created_at = new Date().toISOString();
    json.stock = 1;
    json.available = 1;
    json.tags = [];
    return json;
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const isbn = request.nextUrl.searchParams.get("isbn");
  if (!isbn) {
    return NextResponse.json({ error: "ISBN is required" }, { status: 400 });
  }

  const bookInfo = await fetchFromGemini(isbn);

  // ここで最終的なbookInfoをチェック
  if (bookInfo) {
    // 成功した場合
    return NextResponse.json(bookInfo);
  } else {
    // 見つからなかった場合
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
}
