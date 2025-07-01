"use client";

import { Book } from "@/src/types/book";
import { useCallback, useEffect, useState } from "react";
import { BookInfo } from "@/src/components/book/BookInfo";
import { Btns } from "../../components/Btns";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { booksAtom } from "@/src/atoms/atoms";
import LoadingBrown from "@/src/components/LoadingBrown";
import styles from "./BookRegister.module.scss";
import { Btn } from "@/src/components/book/Btn";
import heic2any from "heic2any";

export const BookRegister = ({ isbn }: { isbn: string }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [, setBooks] = useAtom(booksAtom);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const router = useRouter();

  // メインのフェッチ関数（サーバーAPIでGoogle→楽天→Geminiの順で取得）
  const fetchBookData = useCallback(async (isbn: string) => {
    try {
      const res = await fetch(`/api/books/bookInfo?isbn=${isbn}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.isbn) {
          return data;
        }
      } else {
        setNotFound(true);
      }
      return null;
    } catch (error) {
      console.error("AI書誌APIエラー(fetch):", error);
      return null;
    }
  }, []);

  // useEffectを修正
  useEffect(() => {
    if (isbn) {
      (async () => {
        try {
          const fetchedBook = await fetchBookData(isbn);
          if (fetchedBook) {
            setBook(fetchedBook);
          } else {
            setNotFound(true);
          }
        } catch (error) {
          console.error("エラー:", error);
          setNotFound(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isbn, fetchBookData]);

  const BookAdd = async () => {
    if (!book) return;

    try {
      await fetch(`/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      // Atom に新しい本を追加
      setBooks((prevBooks) => {
        const updatedBooks = [...(prevBooks ?? []), book];
        return updatedBooks;
      });

      router.push(`/books/add/${isbn}/check`);
    } catch {
      return <p>本の登録に失敗しました</p>;
    }
  };

  if (loading) {
    return <LoadingBrown />;
  }

  const handleConfirm = () => {
    router.push("/");
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      let fileToUpload = file;

      // HEICファイルの場合はJPEGに変換
      if (file.type === "image/heic") {
        console.log("HEICファイルを検出、JPEG形式に変換中...");

        try {
          const convertedBlob = (await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8,
          })) as Blob;

          // 新しいFileオブジェクトを作成
          const fileName = file.name.replace(/\.heic$/i, ".jpg");
          fileToUpload = new File([convertedBlob], fileName, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          console.log("HEIC変換完了:", fileName);
        } catch (conversionError) {
          console.error("HEIC変換エラー:", conversionError);
          alert("HEICファイルの変換に失敗しました。");
          return;
        }
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("isbn", isbn);

      const response = await fetch("/api/strage/postBookThumbnail", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("サムネイルアップロード成功:", data);
        alert("サムネイルが正常にアップロードされました！");

        // 本の情報を更新（サムネイルURLを反映）
        if (book) {
          setBook({
            ...book,
            thumbnail: data.data?.thumbnailUrl || data.thumbnailUrl,
          });
        }
      } else {
        const errorData = await response.json();
        console.error("サムネイルアップロード失敗:", errorData);
        alert(`アップロードに失敗しました: ${errorData.error}`);
      }
    } catch (error) {
      console.error("サムネイルアップロードエラー:", error);
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setUploadLoading(false);
    }
  };

  if (notFound) {
    return (
      <div className={styles.body}>
        <p className={styles.errorMessage}>
          指定されたISBN（{isbn}）<br />
          の本が見つかりませんでした。
        </p>
        <div className={styles.Btn}>
          <Btn text="ホームに戻る" bgColor="#E2999B" onClick={handleConfirm} />
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingBrown />;
  }

  return (
    <div>
      {book ? (
        <>
          <BookInfo book={book} />
          <Btns BookAdd={BookAdd} />
          <div
            style={{
              margin: "20px 0",
              padding: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <label
              htmlFor="thumbnail-upload"
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              📷 サムネイル画像をアップロード:
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*,.heic"
              onChange={handleFileChange}
              disabled={uploadLoading}
              style={{
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: uploadLoading ? "#f5f5f5" : "white",
              }}
            />
            {uploadLoading && (
              <p
                style={{
                  marginTop: "10px",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                ⏳ アップロード中...
              </p>
            )}
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "8px",
                lineHeight: "1.4",
              }}
            >
              💡 対応形式: JPEG, PNG, WebP, GIF, HEIC (最大5MB)
              <br />※ HEICファイルは自動的にJPEGに変換されます
            </p>
          </div>
        </>
      ) : (
        <p className={styles.errorMessage}>
          本の情報が見つかりませんでした。ISBNを確認してください。
        </p>
      )}
    </div>
  );
};
