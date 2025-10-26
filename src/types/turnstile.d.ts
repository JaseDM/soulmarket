// src/types/turnstile.d.ts
export {};

type TurnstileTheme = "auto" | "light" | "dark";
type TurnstileSize = "normal" | "compact" | "invisible";
type TurnstileRetry = "auto" | "never";

interface TurnstileRenderOptions {
  sitekey: string;
  theme?: TurnstileTheme;
  size?: TurnstileSize;
  callback?: (token: string) => void;
  "error-callback"?: (errorCode: string) => void;
  "timeout-callback"?: () => void;
  "expired-callback"?: () => void;
  action?: string;
  cdata?: string;
  tabindex?: number;
  retry?: TurnstileRetry;
  retryInterval?: number;
  // Permite opciones futuras sin usar `any`
  [key: string]: unknown;
}

interface TurnstileAPI {
  /**
   * Renderiza un widget y devuelve su widgetId.
   * `container`: id del elemento o el propio HTMLElement.
   */
  render(container: string | HTMLElement, options?: TurnstileRenderOptions): string;
  /** Resetea el widget (por id) o todos si se omite. */
  reset(widgetId?: string): void;
  /** Elimina el widget del DOM. */
  remove(widgetId?: string): void;
  /** Ejecuta un widget invisible. */
  execute(widgetId?: string, options?: { action?: string; [key: string]: unknown }): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}