import { bookConfig } from '@/config/book.config';

/**
 * 将主题配置应用到 CSS 变量
 * 在应用启动时调用
 */
export function applyTheme(): void {
  const { colors, fonts } = bookConfig.theme;
  const root = document.documentElement;

  // 应用颜色
  root.style.setProperty('--book-cover-color', colors.cover);
  root.style.setProperty('--book-cover-gradient', colors.coverGradient);
  root.style.setProperty('--book-cover-text', colors.coverText);
  root.style.setProperty('--paper-color', colors.paper);
  root.style.setProperty('--text-color', colors.text);
  root.style.setProperty('--accent-color', colors.accent);
  root.style.setProperty('--bg-color', colors.background);
  root.style.setProperty('--bg-gradient', colors.backgroundGradient);

  // 应用字体（如果配置了）
  if (fonts?.serif) {
    root.style.setProperty('--font-serif', fonts.serif);
  }
  if (fonts?.sans) {
    root.style.setProperty('--font-sans', fonts.sans);
  }
}
