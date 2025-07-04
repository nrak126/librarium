import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/src/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabaseAdmin = createSupabaseAdmin();

    // FormDataからファイルとISBNを取得
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const isbn = formData.get("isbn") as string;

    // バリデーション
    if (!file) {
      return NextResponse.json(
        { error: "ファイルが必要です" },
        { status: 400 }
      );
    }

    if (!isbn) {
      return NextResponse.json({ error: "ISBNが必要です" }, { status: 400 });
    }

    // ファイルタイプの検証（画像のみ許可、HEICも追加）
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/heic",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "画像ファイルのみアップロード可能です（JPEG, PNG, WebP, GIF, HEIC）",
        },
        { status: 400 }
      );
    }

    // ファイルサイズの制限（5MB）
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "ファイルサイズが大きすぎます（最大5MB）" },
        { status: 400 }
      );
    }

    // ファイル名
    const fileName = `${isbn}`;

    // 既存のファイルがある場合は削除
    try {
      const { data: existingFiles, error: listError } =
        await supabaseAdmin.storage.from("book-thumbnails").list("", {
          search: fileName,
        });

      if (!listError && existingFiles && existingFiles.length > 0) {
        console.log("既存のファイルを発見、削除します:", fileName);
        const { error: deleteError } = await supabaseAdmin.storage
          .from("book-thumbnails")
          .remove([fileName]);

        if (deleteError) {
          console.warn("既存ファイルの削除に失敗:", deleteError);
        } else {
          console.log("既存ファイルを削除しました:", fileName);
        }
      }
    } catch (deleteCheckError) {
      console.warn("既存ファイルのチェック中にエラー:", deleteCheckError);
    }

    // ファイルをArrayBufferに変換
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    // Supabaseストレージにファイルをアップロード
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("book-thumbnails") // バケット名
      .upload(fileName, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("ストレージアップロードエラー:", uploadError);

      // バケットが存在するかチェック
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      console.log("利用可能なバケット:", buckets);

      return NextResponse.json(
        {
          error: "ファイルのアップロードに失敗しました",
          details: uploadError.message,
        },
        { status: 500 }
      );
    }

    console.log("アップロード成功:", uploadData);

    // アップロードされたファイルの公開URLを取得
    const { data: urlData } = supabaseAdmin.storage
      .from("book-thumbnails")
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    console.log("Generated public URL:", publicUrl);
    console.log("File name:", fileName);

    // 代替手段：サインドURLも生成してみる
    const { data: signedUrlData } = await supabaseAdmin.storage
      .from("book-thumbnails")
      .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1年間有効

    console.log("Signed URL:", signedUrlData?.signedUrl);

    // URLが正しく生成されているか確認
    if (!publicUrl) {
      console.error("公開URLの生成に失敗しました");
      return NextResponse.json(
        { error: "公開URLの生成に失敗しました" },
        { status: 500 }
      );
    }

    // 本の存在確認
    const { data: existingBook, error: bookFetchError } = await supabaseAdmin
      .from("books")
      .select("isbn, thumbnail")
      .eq("isbn", isbn)
      .single();

    // もしすでに登録済みの本なら、本のサムネイルURLを更新する
    if (existingBook && !bookFetchError) {
      const { error: updateError } = await supabaseAdmin
        .from("books")
        .update({ thumbnail: signedUrlData?.signedUrl })
        .eq("isbn", isbn)
        .select();

      if (updateError) {
        console.error("本の更新エラー:", updateError);

        // アップロードしたファイルを削除（ロールバック）
        await supabaseAdmin.storage.from("book-thumbnails").remove([fileName]);

        return NextResponse.json(
          { error: "本の情報更新に失敗しました" },
          { status: 500 }
        );
      }
    }

    const { data: updatedData } = await supabaseAdmin
      .from("books")
      .select("*")
      .eq("isbn", isbn)
      .single();

    return NextResponse.json(
      {
        message: "サムネイルが正常にアップロードされました",
        thumbnailUrl: publicUrl, // 直接thumbnailUrlとして返す
        signedUrl: signedUrlData?.signedUrl, // サインドURLも返す
        data: {
          isbn,
          thumbnailUrl: publicUrl,
          signedUrl: signedUrlData?.signedUrl,
          fileName,
          fileSize: file.size,
          contentType: file.type,
          updatedBook: updatedData,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('サムネイルアップロードエラー:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// ストレージの設定情報を取得するGETエンドポイント
export async function GET() {
  try {
    // ストレージバケットの情報を返す
    return NextResponse.json({
      message: 'Book thumbnail upload API',
      supportedFormats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'],
      maxFileSize: '5MB',
      usage: {
        method: 'POST',
        contentType: 'multipart/form-data',
        fields: {
          file: 'Image file to upload',
          isbn: 'ISBN of the book to update'
        }
      },
      example: {
        curl: `curl -X POST -F "file=@thumbnail.jpg" -F "isbn=9781234567890" ${process.env.NEXT_PUBLIC_BASE_URL}/api/strage/postBookThumbnail`
      }
    });
  } catch {
    return NextResponse.json(
      { error: 'API情報の取得に失敗しました' },
      { status: 500 }
    );
  }
}