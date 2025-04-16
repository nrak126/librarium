export interface Loan  {
  id: string; // ローンID (UUID)
  created_at: string; // 作成日時 (ISO 8601形式)
  uid: string; // ユーザーID (Firebase AuthのユーザーID, UUID)
  isbn: string; // 本のISBN (文字列)
  rental_date: string; // レンタル日 (ISO 8601形式)
  return_date: string; // 返却日 (ISO 8601形式)
  isReturned: boolean; // ステータス (貸し出し中ならtrue、返却済みならfalse)
};