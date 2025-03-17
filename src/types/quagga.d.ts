// src/types/quagga.d.ts
declare module "quagga" {
  export type QuaggaResult = {
    codeResult: {
      code: string;
    };
  };

  export interface QuaggaConfig {
    inputStream: {
      type: "LiveStream";
      target: HTMLElement | null;
    };
    decoder: {
      readers: string[];
      multiple: boolean;
    };
    locate: boolean;
    locator: {
      patchSize: string;
      halfSample: boolean;
    };
  }

  export function init(config: QuaggaConfig, callback: (err: Error | null) => void): void;
  export function start(): void;
  export function stop(): void;
  export function onDetected(callback: (result: QuaggaResult) => void): void;
}
