// src/utils/fileUtils.ts
export const convertHeicToJpeg = async (file: File): Promise<File> => {
  if (file.type !== "image/heic") {
    return file; // HEICでなければそのまま返す
  }

  // 動的インポートでクライアントサイドのみで実行
  const heic2any = (await import("heic2any")).default;

  const convertedBlob = (await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.8,
  })) as Blob;

  const fileName = file.name.replace(/\.heic$/i, ".jpg");
  return new File([convertedBlob], fileName, {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
};

export const uploadBookThumbnail: (
  file: File,
  isbn: string
) => Promise<string> = async (file: File, isbn: string) => {
  console.log(
    "[Client] Starting uploadBookThumbnail for ISBN:",
    isbn,
    "file:",
    file.name
  );
  const formData = new FormData();
  formData.append("file", file);
  formData.append("isbn", isbn);

  console.log(
    "[Client] Making POST request to /api/strage/changeBookThumbnail"
  );
  const response = await fetch("/api/strage/changeBookThumbnail", {
    method: "POST",
    body: formData,
  });

  console.log("[Client] Response status:", response.status, "ok:", response.ok);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("[Client] Upload failed:", errorData);
    throw new Error(errorData.error || "アップロードに失敗しました");
  }

  const data = await response.json();
  console.log("[Client] Upload successful:", data);
  return data.data?.signedUrl || data.signedUrl;
};

export const uploadUserIcon = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uid", userId);

  const response = await fetch("/api/strage/changeUserIcon", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "アップロードに失敗しました");
  }

  const data = await response.json();
  return data.data?.signedUrl || (data.signedUrl as string);
};
