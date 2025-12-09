import "@emotion/react";
import type { AppTheme } from "./styles/theme";

declare module "@emotion/react" {
  // расширяем базовую Theme формой твоей темы
  export type Theme = AppTheme
}