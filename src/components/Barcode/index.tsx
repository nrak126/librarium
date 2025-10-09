"use client";

import React, { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
import styles from "./index.module.scss";
import { usePathname } from "next/navigation";
import { Btn } from "../book/Btn";
import { useRouter } from "next/navigation";

type BarcodeProps = {
  setIsbn: (isbn: string) => void;
  text: string;
};

export const Barcode: React.FC<BarcodeProps> = ({ setIsbn, text }) => {
  // カメラ映像を表示するためのRef
  const scannerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const inputBufferRef = useRef<string>(""); // キーボード入力バッファ
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // タイマー
  const [isMobile, setIsMobile] = useState(false); // モバイルかどうかの判定

  const pathname = usePathname();

  const isAuth =
    pathname === "/books/add/barcode" ||
    pathname.startsWith("/books/add/barcode/");

  // 全角数字を半角数字に変換する関数
  const toHalfWidth = (str: string): string => {
    return str.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    );
  };

  // ISBNを検証・セットする関数
  const validateAndSetIsbn = (isbn: string) => {
    const normalizedIsbn = toHalfWidth(isbn).replace(/\s/g, ""); // 全角→半角、スペース除去
    if (
      (normalizedIsbn.startsWith("978") || normalizedIsbn.startsWith("979")) &&
      normalizedIsbn.length === 13
    ) {
      setIsbn(normalizedIsbn);
      inputBufferRef.current = ""; // バッファクリア
      if (isMobile) {
        Quagga.stop(); // モバイルの場合のみカメラスキャンを止める
      }
    }
  };

  // キーボードイベントハンドラー
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      // Enterキーでバッファをチェック
      if (inputBufferRef.current) {
        validateAndSetIsbn(inputBufferRef.current);
      }
      inputBufferRef.current = "";
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else if (e.key.length === 1) {
      // 文字キー（数字など）
      inputBufferRef.current += e.key;
      // タイマーをリセット
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (inputBufferRef.current) {
          validateAndSetIsbn(inputBufferRef.current);
        }
        inputBufferRef.current = "";
      }, 500); // 500ms経過で自動チェック
    }
  };

  const handleClick = () => {
    // 手入力で登録ボタンがクリックされたときの処理
    router.push("9784048917"); // ここは適切なISBNに変更してください
  };

  useEffect(() => {
    // デバイス判定（画面幅が768px以下をモバイルとする）
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // スクロール無効化
    document.body.style.overflow = "hidden";

    // キーボードイベントリスナーを追加
    document.addEventListener("keydown", handleKeyDown);

    // モバイルの場合のみQuaggaJSの初期化
    if (isMobile) {
      Quagga.init(
        {
          inputStream: { type: "LiveStream", target: scannerRef.current },
          decoder: {
            readers: ["ean_reader", "code_128_reader"],
            multiple: false,
          },
          locate: true,
          locator: {
            patchSize: "medium",
            halfSample: true,
          },
        },
        (err: Error | null) => {
          if (err) {
            console.error("Quaggaエラー:", err);
            return;
          }
          Quagga.start();
        }
      );

      // バーコードが検出されたとき
      Quagga.onDetected((result: Quagga.QuaggaResult) => {
        const barcode = result.codeResult.code;
        validateAndSetIsbn(barcode); // 共通の検証関数を使用
      });
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", checkMobile);
      if (isMobile) {
        Quagga.stop();
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [setIsbn, isMobile]);

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        {isMobile ? (
          // モバイル: カメラスキャン表示
          <div ref={scannerRef} className={styles.scanner} />
        ) : (
          // PC: バーコードアイコンとメッセージ表示
          <div className={styles.scanMessage}>
            <div className={styles.barcodeIcon}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <path d="M8 7v10" />
                <path d="M12 7v10" />
                <path d="M16 7v10" />
              </svg>
            </div>
            <p className={styles.scanText}>バーコードをスキャンしてください</p>
          </div>
        )}
        <div className={styles.under}>
          <div className={styles.circle}>
            <p className={styles.message}>{text}</p>
            <div className={styles.btnContainer}>
              {isAuth && (
                <>
                  <div className={styles.handInput}>
                    <p className={styles.text}>
                      バーコードがない場合は手入力で登録を選択してください
                    </p>
                    <div className={styles.Btn}>
                      <Btn
                        text="手入力で登録"
                        bgColor="#E2999B"
                        onClick={handleClick}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
