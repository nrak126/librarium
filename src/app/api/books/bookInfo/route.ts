import { NextRequest, NextResponse } from "next/server";

import axios from "axios";
import { IndustryIdentifier } from "@/src/types/book"; // IndustryIdentifier 型をインポート
import { console } from "inspector";

// Google Books API
async function fetchFromGoogle(isbn: string) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${isbn}&startIndex=0&maxResults=1&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
    );

    // ISBN-13 の一致確認
    const isMatched = response.data.items.some(
      (item: {
        volumeInfo: {
          industryIdentifiers: IndustryIdentifier[];
        };
      }) =>
        item.volumeInfo?.industryIdentifiers?.some(
          (identifier: IndustryIdentifier) =>
            identifier.type === "ISBN_13" && identifier.identifier === isbn
        )
    );

    if (
      response.data &&
      response.data.items &&
      response.data.items.length > 0 &&
      isMatched
    ) {
      const volumeInfo = response.data.items[0].volumeInfo;

      return {
        isbn: isbn,
        created_at: new Date().toISOString(),
        title: volumeInfo.title || "タイトル不明",
        thumbnail: volumeInfo.imageLinks?.thumbnail || "",
        description: volumeInfo.description || "説明がありません",
        author: volumeInfo.authors
          ? volumeInfo.authors.join(", ")
          : "著者情報がありません",
        stock: 1,
        available: 1,
        tags: [],
        publisher: volumeInfo.publisher || "出版会社情報がありません",
      };
    }
  } catch {
    return null;
  }
}

// 楽天Books API
async function fetchFromRakuten(isbn: string) {
  console.log("Google Booksからのデータに失敗:");
  try {
    const response = await axios.get(
      `https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&isbn=${isbn}&applicationId=${process.env.NEXT_PUBLIC_RAKUTEN_BOOKS_APP_ID}`
    );
    if (response.data?.Items && response.data.Items.length > 0) {
      const item = response.data.Items[0].Item;
      return {
        isbn: isbn,
        created_at: new Date().toISOString(),
        title: item.title || "タイトル不明",
        thumbnail:
          item.largeImageUrl || item.mediumImageUrl || item.smallImageUrl || "",
        description: item.itemCaption || "説明がありません",
        author: item.author || "著者情報がありません",
        stock: 1,
        available: 1,
        tags: [],
        publisher: item.publisherName || "出版会社情報がありません",
      };
    }
    return null;
  } catch {
    return null;
  }
}

// openBD APIから本の情報を取得する関数
async function fetchFromOpenBD(isbn: string) {
  console.log("楽天からの取得に失敗");
  const thumbnail = "";
  console.log("openBDからの取得中:");
  try {
    const response = await axios.get(
      `https://api.openbd.jp/v1/get?isbn=${isbn}&pretty`
    );

    if (response.data && response.data[0] && response.data[0].summary) {
      const summary = response.data[0].summary;

      let detail = "説明がありません";
      try {
        if (response.data[0].onix?.CollateralDetail?.TextContent?.[0]?.Text) {
          detail = response.data[0].onix.CollateralDetail.TextContent[0].Text;
        }
      } catch (e) {
        console.log("onixデータが取得できませんでした:", e);
      }

      // if (!summary.cover) {
      //   const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      //   const prompt = `
      //           # 指示
      //           あなたは書籍情報をJSON形式で返すAPIとして振る舞ってください。
      //           指定されたISBNコードの書籍情報を、以下のルールに厳密に従ってJSONオブジェクトとして出力してください。

      //           # 全体ルール
      //           1.  出力はJSONオブジェクトのみとし、他のテキスト（挨拶、説明、マークダウンの\`\`\`jsonなど）は絶対に含めないでください。
      //           thumbnailには、書籍の表紙画像のURLを設定してください。
      //           # 情報が見つからない場合のルール
      //           書籍情報の一部が見つからない場合は、以下のデフォルト値を必ず使用してください。
      //           - "thumbnail": ""
      //           # 入力ISBN
      //           ${isbn}
      //           `;
      //   try {
      //     const result = await model.generateContent(prompt);
      //     const text = result.response.text();
      //     const json = JSON.parse(text.replace(/```json|```/g, "").trim());
      //     thumbnail = json.thumbnail;
      //     console.log("Geminiからのサムネイル取得:");
      //   } catch (error) {
      //     console.error("Gemini API error:", error);
      //     return null;
      //   }
      // }

      return {
        isbn: isbn,
        title: summary.title || "タイトル不明",
        author: summary.author || "著者情報がありません",
        description:
          summary.series || summary.volume || detail || "説明がありません",
        thumbnail: summary.cover || thumbnail,
        publisher: summary.publisher || "出版会社情報がありません",
        stock: 1,
        available: 1,
        tags: [],
        created_at: new Date().toISOString(),
      };
    }
    return null;
  } catch (error) {
    console.log("openBD APIエラー:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const isbn = request.nextUrl.searchParams.get("isbn");
  if (!isbn) {
    return NextResponse.json({ error: "ISBN is required" }, { status: 400 });
  }

  let bookInfo = await fetchFromGoogle(isbn);

  if (!bookInfo) {
    console.log("楽天からの取得中:");
    bookInfo = await fetchFromRakuten(isbn);
  }
  if (!bookInfo) {
    console.log("楽天からの取得失敗\nopenBDからの取得中:");
    bookInfo = await fetchFromOpenBD(isbn);
  }

  // ここで最終的なbookInfoをチェック
  if (bookInfo) {
    // 成功した場合
    return NextResponse.json(bookInfo);
  } else {
    // すべての手段を試しても見つからなかった場合
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
}
