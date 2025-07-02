"use client";

import { Book } from "@/src/types/book";
import { useCallback, useEffect, useState } from "react";
import { Btns } from "../../components/Btns";
import LoadingBrown from "@/src/components/LoadingBrown";
import styles from "./BookEdit.module.scss";
import authorIcon from "@/public/author.svg";
import publisherIcon from "@/public/publisher.svg";
import heic2any from "heic2any";
import Image from "next/image";
import { BookCard } from "@/src/components/book/BookCard";

export const BookEdit = ({ isbn }: { isbn: string }) => {
  const [book, setBook] = useState<Book | null>();
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  // メインのフェッチ関数（サーバーAPIでGoogle→楽天→Geminiの順で取得）
  const fetchBookData = useCallback(async (isbn: string) => {
    try {
      const res = await fetch(`/api/books/bookInfo?isbn=${isbn}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.isbn) {
          return data;
        }
      }
      return null;
    } catch {
      // console.error("AI書誌APIエラー(fetch):", error);
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
          }
        } catch {
          // console.error("エラー:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isbn, fetchBookData]);

  if (loading) {
    return <LoadingBrown />;
  }

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
        } catch {
          // console.error("HEIC変換エラー:", conversionError);
          alert("HEICファイルの変換に失敗しました。");
          return;
        }
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("isbn", isbn);

      const response = await fetch("/api/strage/storeBookThumbnail", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("サムネイルアップロード成功:", data);

        // 本の情報を更新（サムネイルURLを反映）
        if (book) {
          setBook({
            ...book,
            thumbnail: data.data?.signedUrl || data.signedUrl,
          });
        }
      } else {
        const errorData = await response.json();
        // console.error("サムネイルアップロード失敗:", errorData);
        alert(`アップロードに失敗しました: ${errorData.error}`);
      }
    } catch {
      // console.error("サムネイルアップロードエラー:", error);
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setUploadLoading(false);
    }
  };

  // if (notFound) {
  //   return (
  //     <div className={styles.body}>
  //       <p className={styles.errorMessage}>
  //         指定されたISBN（{isbn}）<br />
  //         の本が見つかりませんでした。
  //       </p>
  //       <div className={styles.Btn}>
  //         <Btn text="ホームに戻る" bgColor="#E2999B" onClick={handleConfirm} />
  //       </div>
  //     </div>
  //   );
  // }

  if (loading) {
    return <LoadingBrown />;
  }

  if (!book) {
    const emptyBook: Book = {
      isbn: isbn,
      title: "",
      author: "",
      publisher: "",
      description: "",
      thumbnail: "",
      createdAt: "",
      stock: 1,
      available: 1,
      tags: [],
      loan_count: 0,
    };
    setBook(emptyBook);

    return;
  }

  return (
    <div>
      <div>
        <form>
          <div className={styles.BookInfo}>
            <input
              className={styles.Title}
              type="text"
              value={book?.title || "タイトル"}
              required
              onChange={(e) => {
                setBook((prev) => {
                  if (!prev) return null;
                  return { ...prev, title: e.target.value };
                });
              }}
            />

            <BookCard
              book={book}
              className={styles.card}
              width={150}
              height={200}
            />

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
                accept="image/jpeg, image/png, image/webp, image/gif, image/heic"
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

            {/* 著者情報 */}
            <div className={styles.Author}>
              <div className={styles.AuthorLabel}>
                <Image
                  src={authorIcon}
                  alt="著者アイコン"
                  width={127}
                  height={130}
                  className={styles.icon}
                />
                <input
                  className={styles.AuthorName}
                  value={book?.author || "著者はなし"}
                  type="text"
                  onChange={(e) => {
                    setBook((prev) => {
                      if (!prev) return null;
                      return { ...prev, author: e.target.value };
                    });
                  }}
                />
              </div>

              <div className={styles.publisherLabel}>
                <Image
                  src={publisherIcon}
                  alt="出版社アイコン"
                  width={127}
                  height={130}
                  className={styles.icon}
                />
                <input
                  className={styles.AuthorName}
                  value={book?.publisher || "出版社はなし"}
                  type="text"
                  onChange={(e) => {
                    setBook((prev) => {
                      if (!prev) return null;
                      return { ...prev, publisher: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Btns book={book} />
          </div>
        </form>
      </div>
    </div>
  );
};
