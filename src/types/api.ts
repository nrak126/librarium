// TODO: まだちゃんと書いてないから使わない。あとで使うかもしれない

import { Book } from "./book";
import { LoanWithBook } from "./loan";

// 共通のAPIレスポンス型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ファイルアップロード関連
export interface UploadResponse {
  thumbnailUrl: string;
  signedUrl: string;
  fileName: string;
  fileSize: number;
  contentType: string;
}

export type BookThumbnailUploadResponse = ApiResponse<{
  isbn: string;
  thumbnailUrl: string;
  signedUrl: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  updatedBook?: Book;
}>

// 書籍情報取得
export type BookInfoResponse = ApiResponse<Book>

// 貸出履歴
export type LoanHistoryResponse = ApiResponse<LoanWithBook[]>

// ユーザーアイコンアップロード
export type UserIconUploadResponse = ApiResponse<{
  iconUrl: string;
  signedUrl: string;
}>