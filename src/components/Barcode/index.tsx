"use client";

import React, { useEffect, useRef } from "react";
import Quagga from "quagga";
import styles from "./index.module.scss";

type BarcodeProps = {
  setIsbn: (isbn: string) => void;
};

export const Barcode: React.FC<BarcodeProps> = ({ setIsbn }) => {
  // カメラ映像を表示するためのRef
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // QuaggaJSの初期化
    Quagga.init(
      {
        inputStream: { type: "LiveStream", target: scannerRef.current },
        decoder: {
          readers: ["ean_reader", "code_128_reader"],
          multiple: false, // 複数のバーコードを同時に読み取らないようにする
        },
        locate: true, // バーコード位置を上げる
        locator: {
          patchSize: "medium", // バーコード位置検出の精度を上げる
          halfSample: true, // 精度向上のための半分のサイズでサンプル
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
      const barcode = result.codeResult.code; // スキャンされたバーコード
      if (barcode.startsWith("978") || barcode.startsWith("979")) {
        // ISBNは通常13桁
        setIsbn(barcode);
        Quagga.stop(); // スキャンを止める
      } else {
        Quagga.start();
      }
    });
  }, [setIsbn]);

  return (
    <div className={styles.container}>
      <div ref={scannerRef} className={styles.scanner} />

      <div className={styles.under}>
        <div className={styles.circle}></div>
        <p className={styles.message}>
          借りたい本の裏表紙のバーコードを カメラにかざしてください
        </p>
      </div>
    </div>
  );
};
