export type User = {
  id: string; // ユーザーID (UUID)
  created_at: string; // 作成日時 (ISO 8601形式)
  name: string; // ユーザー名
  role: string; // 役職やユーザーの役割
  tags: string[]; // タグ（配列形式、nullの場合もあり）
  email: string; // メールアドレス
  uid: string; // Firebase AuthのユーザーID (UUID)
};