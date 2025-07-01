declare module 'heic2any' {
  interface HeicToAnyOptions {
    blob: Blob;
    toType?: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
    quality?: number;
    multiple?: boolean;
  }

  function heic2any(options: HeicToAnyOptions): Promise<Blob | Blob[]>;
  
  export default heic2any;
}
