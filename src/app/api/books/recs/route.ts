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
あなたは、ユーザーからの15個の質問回答に基づき、最適な技術分野を推薦するAIです。


# 制約条件
- 1が一番そう思う、5が全くそう思わないという5段階評価で回答を受け取ります。
- 応答はJSON形式以外を絶対に返さないでください。
- 以下の技術分野リストから、最も適しているものを**1つだけ**選んでください。
- 推薦理由は200字以内で、簡潔に記述してください。

# 技術分野リスト
- Web
- フロントエンド
- モバイルアプリ
- バックエンド
- 組み込み
- デザイン
- CG
- ゲーム
- 電子工作
- インフラ
- セキュリティ

# JSONフォーマット
{
  "recommendation": "（ここに推薦技術を1つ記述）",
  "reason": "（ここに必ず200字以内の推薦理由を記述）"
}

# ユーザーの回答
1. 友人の相談に乗る時、具体的な解決策を示すより、まず「大変だったね」と気持ちに寄り添うことを大切にする  ${answers[0]}
2.  物事の表面的な部分よりも、「なぜそうなっているのか」という根本的な仕組みや構造を解明したい欲求が強い。${answers[1]}
3.  ミステリー小説を読んだり映画を観たりする時、犯人やトリックを自分なりに推理せずにはいられない。${answers[2]}
4.  誰も見ていなくても、部屋の隅のホコリや、少し曲がった絵画などが気になって直してしまう。${answers[3]}
5.  グループの中では、自然と「みんながルールを守っているか」「危険はないか」を見守る役になっていることが多い。${answers[4]}
6.  まだ誰も見たことのない、SFのような未来の世界や、壮大な物語を空想するのが好きだ。${answers[5]}
7.  知らない人が多いパーティーに参加するのは、楽しいけれど、少し気疲れしてしまうタイプだ。${answers[6]}
8.  壊れた家電や家具があると、つい分解して「どういう仕組みなんだろう」と調べたくなる。${answers[7]}
9.  人を楽しませたり、あっと言わせたりするサプライズを計画するのが大好きだ。${answers[8]}
10. 部屋のインテリアは、機能性だけでなく、色や配置の「美しさ」「心地よさ」に強くこだわる${answers[9]}。
11. 普段の生活の中で、「もっとこうすれば効率的で楽になるのに」と改善点を見つけるのが得意だ。${answers[10]}
12. 多くの物を所有するより、本当に気に入った、質の良いものだけを少しだけ持ちたい。${answers[11]}
13. 次から次へと新しい流行やトレンドが生まれるのを、ワクワクしながら追いかけてしまう。${answers[12]}
14. 言葉にしなくても、相手の表情や仕草から「今、こう感じているんだろうな」と察することができる。${answers[13]}
15. 旅行に行くなら、分刻みの完璧なスケジュールを立てて、その通りに行動できると達成感がある。${answers[14]}

---
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
  const answerParam = request.nextUrl.searchParams.get("answer");
  const answers = answerParam ? answerParam.split(",").map(Number) : [];
  console.log("Get ", answers);

  if (answers.length !== 15 || answers.some((v) => isNaN(v))) {
    return NextResponse.json(
      { error: "全ての回答(10個)が必要です" },
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
