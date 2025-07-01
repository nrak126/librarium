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
- 1が一番そう思う、5が全くそう思わないという5段階評価で回答を受け取ります。
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
1. ユーザーが直接触れる、見た目や使いやすさを追求することに最も情熱を感じる。  ${answers[0]}
2. 目には見えない裏側で、大規模なデータやリクエストを効率よく処理する仕組み作りに興味がある。 ${answers[1]}
3. ソフトウェアだけでなく、電子回路やセンサーといった物理的な「モノ」と連携させることにワクワクする。 ${answers[2]}
4. 数学や物理学を応用して、リアルな仮想空間やインタラクティブな体験を創り出すことに関心がある。 ${answers[3]}
5. システムの弱点を見つけ出し、攻撃から守るための戦略を考えることに知的なスリルを感じる。 ${answers[4]}
6. スマートフォンの限られた画面や機能を最大限に活かした、快適なアプリ開発に魅力を感じる。 ${answers[5]}
7. サービスを止めずに安定稼働させるための、自動化の仕組みや基盤を構築するのが好きだ。${answers[6]}
8. はんだ付けやブレッドボードでの試作など、自分の手で物理的なプロトタイプを組み立てる作業が好きだ。 ${answers[7]}
9. 機能を作ること以上に、ユーザーが抱える根本的な課題を発見し、解決に導くプロセスを重視する。 ${answers[8]}
10. 作ったものがすぐにインターネットを通じて、多くの人の目に触れたり使われたりすることに喜びを感じる。 ${answers[9]}
11. 新しい機能を追加することよりも、既存のプロセスにある無駄を見つけ出し、より効率的な方法に改善していくことに喜びを感じる。${answers[10]}
12. 現実的な問題解決も大切だが、それ以上に「未来はどうなるか」を空想し、まだ存在しない世界や体験を思い描くのが好きだ。${answers[11]}
13. 人とコミュニケーションを取りながら進める作業よりも、複雑に絡み合ったパズルを一人で解き明かすような、知的な課題に没頭したい。${answers[12]}
14. 多機能で便利なものよりも、機能は少なくても、一つの目的が研ぎ澄まされた、シンプルで美しいものに強く惹かれる。${answers[13]}
15. 物事がスムーズに進むことよりも、予期せぬエラーや困難な状況に直面し、それを乗り越える過程にこそ、成長や面白さを感じる。${answers[14]}
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
