import type { BookConfig } from '@/types/config';

/**
 * 书籍配置文件
 *
 * 在这里配置您的电子书基本信息和主题样式。
 * Book Configuration File
 * Configure your e-book information and theme here.
 */
export const bookConfig: BookConfig = {
  // ============ 书籍基本信息 (Book Information) ============
  book: {
    // 书名 (Book title)
    title: "Chan's Novel",

    // 副标题 (Subtitle, optional)
    subtitle: '一段人生的记忆',

    // 作者名 (Author name)
    author: 'Chan Meng',

    // 出版年份，默认为当前年份 (Publication year, defaults to current year)
    year: 2024,

    // 封底信息 (Back cover information)
    backCover: {
      // 结语引言 (Closing quote)
      quote: '"人生如书，每一页都值得珍藏。"',

      // 版权声明 (Copyright notice)
      copyright: 'All Rights Reserved',
    },
  },

  // ============ 主题配色 (Theme Colors) ============
  theme: {
    colors: {
      // 封面主色 (Cover main color)
      cover: '#8B4513',

      // 封面渐变色 (Cover gradient color)
      coverGradient: '#654321',

      // 封面文字颜色 (Cover text color)
      coverText: '#F5DEB3',

      // 纸张背景色 (Paper background color)
      paper: '#FDF5E6',

      // 正文颜色 (Text color)
      text: '#2C1810',

      // 强调色 (Accent color for decorations)
      accent: '#D4A574',

      // 页面背景主色 (Page background main color)
      background: '#2C1810',

      // 页面背景渐变色 (Page background gradient color)
      backgroundGradient: '#4A3728',
    },

    // 字体配置 (Font configuration, optional)
    fonts: {
      // 衬线字体，用于正文 (Serif font for body text)
      serif: '"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif',

      // 无衬线字体，用于UI (Sans-serif font for UI)
      sans: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", sans-serif',
    },
  },

  // ============ 功能配置 (Features Configuration) ============
  features: {
    // 音乐播放器 (Music player)
    music: {
      // 是否启用音乐功能 (Enable music feature)
      enabled: true,

      // 是否自动播放（注意：大多数浏览器会阻止自动播放）
      // Auto-play (Note: most browsers block auto-play)
      autoPlay: false,

      // 是否显示外部链接按钮 (Show external link button)
      showExternalLink: true,
    },

    // 导航功能 (Navigation)
    navigation: {
      // 是否显示页码滑块 (Show page slider)
      showPageSlider: true,

      // 是否显示章节导航 (Show chapter navigation)
      showChapterNav: true,

      // 是否启用键盘导航 (Enable keyboard navigation)
      keyboardNav: true,
    },
  },
};
