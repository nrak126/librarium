"use client";

import { Book } from "@/src/types/book";
import { useCallback, useEffect, useState } from "react";
import { Btns } from "../../components/Btns";
import LoadingBrown from "@/src/components/LoadingBrown";
import styles from "./BookEdit.module.scss";
import authorIcon from "@/public/author.svg";
import publisherIcon from "@/public/publisher.svg";
import Image from "next/image";
import { BookCard } from "@/src/components/book/BookCard";
import { convertHeicToJpeg, uploadBookThumbnail } from "@/src/utils/fileUtils";
import { Btn } from "@/src/components/book/Btn";

export const BookEdit = ({ isbn }: { isbn: string }) => {
  const [book, setBook] = useState<Book | null>();
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleClick = () => {
    alert("タイトルとサムネイルを入力してください");
  };

  const handleBack = () => {
    window.history.back();
  };

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
          } else {
            // 書籍が見つからない場合は空の書籍を作成
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
          }
        } catch {
          // エラー時も空の書籍を作成
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
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isbn, fetchBookData]);

  if (loading) {
    return <LoadingBrown />;
  }

  if (!book) {
    return <div>書籍データを読み込めませんでした。</div>;
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);

    try {
      // HEICファイルの場合はJPEGに変換（動的インポート使用）
      const fileToUpload = await convertHeicToJpeg(file);

      const thumbnailUrl = await uploadBookThumbnail(fileToUpload, isbn);
      if (thumbnailUrl) {
        setBook((prev) => {
          if (!prev) return null;
          return { ...prev, thumbnail: thumbnailUrl };
        });
      }
    } catch {
      alert("アップロード中にエラーが発生しました。");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className={styles.BookInfo}>
          <input
            className={styles.title}
            type="text"
            value={book?.title || ""}
            placeholder="タイトルを入力"
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

          <div>
            <input
              className={styles.uploadInput}
              id="thumbnail-upload"
              type="file"
              accept="image/jpeg, image/png, image/webp, image/gif, image/heic"
              onChange={handleFileChange}
              disabled={uploadLoading}
            />
            <label htmlFor="thumbnail-upload" className={styles.uploadBtn}>
              ファイルを選択
            </label>
            {uploadLoading && <p>⏳ アップロード中...</p>}
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
                value={book?.author || ""}
                placeholder="著者を入力"
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
                value={book?.publisher || ""}
                type="text"
                placeholder="出版社を入力"
                onChange={(e) => {
                  setBook((prev) => {
                    if (!prev) return null;
                    return { ...prev, publisher: e.target.value };
                  });
                }}
              />
            </div>
          </div>
          <textarea
            className={styles.description}
            value={book?.description || ""}
            placeholder="詳細を入力してください"
            onChange={(e) => {
              setBook((prev) => {
                if (!prev) return null;
                return { ...prev, description: e.target.value };
              });
            }}
          />
          {book?.title && book?.thumbnail ? (
            <Btns book={book} isUploading={uploadLoading} />
          ) : (
            <>
              <div className={styles.errorBtn}>
                <Btn text="戻る" bgColor="#99C6E2" onClick={handleBack} />
                <Btn text="確認" bgColor="#E2999B" onClick={handleClick} />
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
};
