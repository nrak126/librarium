import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

// Gemini
async function fetchFromGemini(...answers: number[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `
あなたは、ユーザーからの10個の質問回答に基づき、最適な技術分野を推薦するAIです。

# 制約条件
- 応答はJSON形式以外を絶対に返さないでください。
- 以下の技術分野リストから、最も適しているものを**1つだけ**選んでください。
- 推薦理由は200字以内で、簡潔に記述してください。

# 技術分野リスト
- Web
- モバイルアプリ
- バックエンド
- 組み込み
- デザイン
- CG・ゲーム
- 電子工作
- インフラ
- セキュリティ

# JSONフォーマット
{
  "recommendation": "（ここに推薦技術を1つ記述）",
  "reason": "（ここに200字以内の推薦理由を記述）"
}

# ユーザーの回答
1. 新しいアイデアや技術に挑戦することにワクワクしますか？ 5
2. 些細なことでも見た目にこだわらないと気が済まない時がある 3
3. 問題を一度に解決するのではなく、段階的に進める方が得意ですか？ 2
4. 自分の作ったものを、多くの人に使ってもらいたいと思うことが多いですか？ 5
5. 物事を構造的に、システム的に考えることに興味がありますか？ 2
6. 細かい作業をすることが好きですか？ 1
7. 複数の人と協力して目標を達成することにやりがいを感じますか？ 4
8. 長期間続けて深く学び、専門知識を積み上げていくことが楽しいですか？ 3
9. 最終的な目標を意識して、計画的に物事を進めることが得意ですか？ 4
10. 自分の創造性やアイデアを表現することに喜びを感じますか？ 4
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const json = JSON.parse(text.replace(/```json|```/g, "").trim());
    return json;
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const answers = Array.from({ length: 9 }, (_, i) =>
    Number(request.nextUrl.searchParams.get(`no${i + 1}`))
  );

  if (answers.some((v) => isNaN(v))) {
    return NextResponse.json(
      { error: "全ての回答(no1〜no10)が必要です" },
      { status: 400 }
    );
  }

  const bookRec = await fetchFromGemini(...answers);

  // ここで最終的なbookInfoをチェック
  if (bookRec) {
    // 成功した場合
    return NextResponse.json(bookRec);
  } else {
    // 見つからなかった場合
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
}
