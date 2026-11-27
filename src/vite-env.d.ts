/// <reference types="vite/client" />

interface Window {
  Tawk_API?: {
    hideWidget?: () => void;
    showWidget?: () => void;
    onLoad?: () => void;
  };
  Tawk_LoadStart?: Date;
}
