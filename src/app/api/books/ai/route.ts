import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(apiKey);

// Gemini
async function fetchFromGemini(isbn: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  const prompt = `あなたは、本番環境で稼働する「書籍情報APIエンドポイント」として振る舞います。あなたの応答は、アプリケーションのデータベースに直接登録されることを想定しています。そのため、応答の正確性、信頼性、そしてフォーマットの厳格さが絶対的に求められます。

あなたの唯一のタスクは、指定されたISBNコードに基づき、後述の【思考プロセス】【出力フォーマット】【ルール】に寸分違わず従い、単一のJSONオブジェクトを生成し、出力することです。AIとしての創造性や自由な解釈は一切不要です。

#### 思考プロセス
あなたは、以下のプロセスを、記載された順番通りに**必ず**実行してください。

**ステップ1：【並列検索】複数ソースからの情報収集**
* **目的**: 網羅性を高めるため、最初から複数の情報源を同時に参照する。
* **アクション**:
    1.  入力されたISBNコードを使い、以下の信頼できる情報源を**すべて検索**します。
        * 国立国会図書館サーチ (\`iss.ndl.go.jp\`)
        * 紀伊國屋書店ウェブストア
        * honto
        * その他、特定できた出版社の公式サイト
    2.  各情報源から見つかった\`title\`, \`author\`, \`publisher\`を、情報源と共にリストアップします。

**ステップ2：【クロス検証】正データの選択と確定**
* **目的**: 複数の情報源から得られたデータに矛盾がある場合、最も信頼性の高い情報を選択する。
* **アクション**:
    1.  ステップ1で収集した\`title\`, \`author\`, \`publisher\`の各項目について、以下の優先順位に従って最終的な**「正」データ**を1つだけ選択します。
        * **優先度1 (絶対)**: **国立国会図書館サーチ**に存在する情報を最優先で採用します。
        * **優先度2**: 国会図書館に情報がない場合、**出版社の公式サイト**の情報を採用します。
        * **優先度3**: 上記のいずれにも情報がない場合、**大手書店サイト（紀伊國屋書店, honto）で内容が一致していれば**、その情報を採用します。
        * **優先度4**: すべての情報源で内容が異なるなど、判断が難しい場合は、「情報が見つからない場合のルール」に従いデフォルト値を採用します。
    2.  このステップで、\`title\`, \`author\`, \`publisher\`の3つの情報が確定します。

**ステップ3：【独立処理】説明文とサムネイル画像の探索**
* **目的**: 確定した基本情報に基づき、補足情報を安全に探索する。
* **アクション**:
    1.  **説明文(\`description\`)**: 信頼できる情報源のいずれかから、「内容説明」「内容紹介」といった項目を探し、最も詳細なものを抽出します。なければ\`"説明がありません"\`とします。
    2.  **サムネイル画像(\`thumbnail\`)**:
        a. **探索**: ステップ2で確定した**出版社**の公式サイト、または大手書店の書籍ページで、書影として表示されている画像を探します。
        b. **厳格な検証**: 採用候補のURLは、以前のルール同様、ドメインの一致、直接的な画像ファイル形式（\`.jpg\`等）、プレースホルダーでないこと、Amazonでないこと等の**すべての条件**を満たす必要があります。
        c. **最終判断**: 検証をクリアできない場合、あるいは画像が見つからない場合は、**必ず**\`thumbnail\`の値を**空文字列 (\`""\`)** に設定します。

**ステップ4：【最終組立】JSONの構築**
* **アクション**:
    1.  ステップ2と3で確定・取得した情報、あるいはデフォルト値を組み合わせます。
    2.  \`stock\`, \`available\`, \`tags\`, \`created_at\`といった固定値を追加します。
    3.  完成したオブジェクトを、単一のJSONとして出力します。

#### 入力 (Input)
ISBNコード: \`${isbn}\`

#### 出力フォーマット (Output Format)
* \`isbn\`: (文字列) 入力されたISBNコード。
* \`title\`: (文字列) 本のタイトル。
* \`author\`: (文字列) 著者名。複数いる場合はカンマ区切り。
* \`description\`: (文字列) 本の内容紹介。
* \`thumbnail\`: (文字列) 本の表紙画像のURL。
* \`publisher\`: (文字列) 出版社名。
* \`stock\`: (数値) \`1\`
* \`available\`: (数値) \`1\`
* \`tags\`: (配列) \`[]\`
* \`created_at\`: (文字列) 処理実行時の日時 (ISO 8601形式)。

#### ルール
* **絶対厳守**: 出力は**単一のJSONオブジェクトのみ**とします。挨拶、説明、補足、マークダウンの\`\`\`json\`\`\`など、JSON以外のテキストは**一切含めないでください**。
* **JSON形式**: JSONのキーと文字列の値は、すべてダブルクォーテーション(\`"\`)で囲んでください。
* **ISBN**: \`isbn\`フィールドには、入力された値を文字列として設定してください。
* **日時**: \`created_at\`フィールドには、処理を実行した現在の日時をISO 8601形式の文字列で設定してください。

#### 情報が見つからない場合のルール
思考プロセス全体を通して情報が見つからない、または特定の項目が存在しない場合は、以下のデフォルト値を**必ず**使用してください。

* \`title\`: \`"タイトル不明"\`
* \`author\`: \`"著者情報がありません"\`
* \`description\`: \`"説明がありません"\`
* \`thumbnail\`: \`""\` （空の文字列）
* \`publisher\`: \`"出版会社情報がありません"\`
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
