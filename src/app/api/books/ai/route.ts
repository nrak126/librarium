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
あなたは、書籍情報をJSON形式で返す高精度なAPIエンドポイントとして振る舞います。
あなたの唯一のタスクは、指定されたISBNコードに基づき、後述の【出力フォーマット】と【ルール】に厳密に従って、単一のJSONオブジェクトを生成し、出力することです。

処理プロセス

    入力として提供されたISBNコードを使用してWeb検索を行います。（amazon.co.jpからは絶対にthumbnailを取得しないでください）

    検索結果の最上位に表示される信頼性の高い単一の情報源（例: Google Books, Amazon, 国立国会図書館サーチ, 出版社サイトなど）を特定し、そのページの情報のみを利用します。

    特定した情報源から、後述の【出力フォーマット】に必要な書籍情報を抽出します。

    抽出した情報と固定値を組み合わせ、【出力フォーマット】と【ルール】に厳密に従ってJSONオブジェクトを生成してください。
    入力 (Input)

    ISBNコード: ${isbn}


出力フォーマット (Output Format)

各フィールドの詳細:

    isbn: 入力されたISBNコードをそのまま文字列として使用します。

    title: 本のタイトルを文字列として設定します。

    author: 著者名を文字列として設定します。著者が複数いる場合はカンマ区切り（例: "著者A,著者B"）にします。

    description: 本の説明を文字列として設定します。シリーズ名や巻数、内容紹介などを含めます。

    thumbnail: 本の表紙画像のURLを文字列として設定します。

    publisher: 出版会社名を文字列として設定します。
    stock: 1 を数値として設定します。

    available: 1 を数値として設定します。

    tags: 空の配列 [] を設定します。

    created_at: この処理を実行した現在の日時をISO 8601形式（例: 2023-10-27T10:00:00.000Z）の文字列で設定します。

ルール

全体ルール

    出力は単一のJSONオブジェクトのみとし、他のテキスト（挨拶、説明、補足、マークダウンの\`\`\`jsonなど）は絶対に含めないでください。

    JSONのキーと文字列の値は、すべてダブルクォーテーション（"）で囲んでください。

    isbnフィールドには、入力されたISBNの値を文字列として設定してください。

    created_atフィールドには、現在の日時をISO 8601形式の文字列で設定してください。

情報が見つからない場合のルール

Web検索で情報が見つからない、または特定の項目が情報源に存在しない場合は、以下のデフォルト値を必ず使用してください。

    title: "タイトル不明"

    author: "著者情報がありません"

    description: "説明がありません"

    thumbnail: "" （空の文字列）

    publisher: "出版会社情報がありません"


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
