/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  Tawk_API?: {
    hideWidget: () => void;
    showWidget: () => void;
    onLoad?: () => void;
  };
}
