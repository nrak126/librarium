// TODO: まだちゃんと書いてないから使わない。あとで使うかもしれない

import { Book } from "./book";
import { LoanWithBook } from "./loan";

// 共通のAPIレスポンス型
export interface ApiResponse<T = any> {
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

export interface BookThumbnailUploadResponse extends ApiResponse<{
  isbn: string;
  thumbnailUrl: string;
  signedUrl: string;
  fileName: string;
  fileSize: number;
  contentType: string;
  updatedBook?: Book;
}> {}

// 書籍情報取得
export interface BookInfoResponse extends ApiResponse<Book> {}

// 貸出履歴
export interface LoanHistoryResponse extends ApiResponse<LoanWithBook[]> {}

// ユーザーアイコンアップロード
export interface UserIconUploadResponse extends ApiResponse<{
  iconUrl: string;
  signedUrl: string;
}> {}