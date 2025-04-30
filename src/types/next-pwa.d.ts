// types/next-pwa.d.ts
declare module "next-pwa" {
  import { NextConfig } from "next";
  type PWAOptions = {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    // 必要に応じて拡張
    [key: string]: any;
  };

  function withPWA(options: PWAOptions): (config: NextConfig) => NextConfig;

  export default withPWA;
}
