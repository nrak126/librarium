import heic2any from "heic2any";

// src/utils/fileUtils.ts
export const convertHeicToJpeg = async (file: File): Promise<File> => {
  if (file.type !== "image/heic") {
    return file; // HEICでなければそのまま返す
  }
  
  const convertedBlob = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.8,
  }) as Blob;

  const fileName = file.name.replace(/\.heic$/i, ".jpg");
  return new File([convertedBlob], fileName, {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
};

export const uploadBookThumbnail: (file: File, isbn: string) => Promise<string> = async (file: File, isbn: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("isbn", isbn);

  const response = await fetch("/api/strage/changeBookThumbnail", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'アップロードに失敗しました');
  }

  const data = await response.json();
  return data.data?.signedUrl || data.signedUrl;
};

export const uploadUserIcon = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uid", userId);

  const response = await fetch("/api/strage/storeUserIcon", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'アップロードに失敗しました');
  }

  const data = await response.json();
  return data.data?.signedUrl || data.signedUrl as string;
};