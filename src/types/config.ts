// ============ 书籍配置类型 ============

export interface BookConfig {
  book: BookInfo;
  theme: ThemeConfig;
  features?: FeaturesConfig;
}

export interface BookInfo {
  title: string;
  subtitle?: string;
  author: string;
  year?: number;
  backCover?: {
    quote?: string;
    copyright?: string;
  };
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts?: ThemeFonts;
}

export interface ThemeColors {
  cover: string;
  coverGradient: string;
  coverText: string;
  paper: string;
  text: string;
  accent: string;
  background: string;
  backgroundGradient: string;
}

export interface ThemeFonts {
  serif?: string;
  sans?: string;
}

export interface FeaturesConfig {
  music?: {
    enabled?: boolean;
    autoPlay?: boolean;
    showExternalLink?: boolean;
  };
  navigation?: {
    showPageSlider?: boolean;
    showChapterNav?: boolean;
    keyboardNav?: boolean;
  };
}

// ============ 内容配置类型 ============

export interface ContentConfig {
  music: Record<string, MusicTrackConfig>;
  chapters: ChapterConfig[];
  pages: PageConfig[];
}

export type MusicType = 'audio' | 'spotify';

export interface MusicTrackConfig {
  id: string;
  title: string;
  type?: MusicType;           // 默认 'audio'
  src?: string;               // 直接音频 URL（type: 'audio' 时必填）
  spotifyTrackId?: string;    // Spotify 曲目 ID（type: 'spotify' 时必填）
  externalUrl?: string;       // 外部链接
}

export interface ChapterConfig {
  id: string;
  title: string;
  subtitle?: string;
  musicId?: string;
}

export interface PageConfig {
  chapterId: string;
  layout?: PageLayout;
  density?: 'soft' | 'hard';
  content: ContentBlock[];
  images?: ImageData[];
}

export type PageLayout =
  | 'text-only'
  | 'image-full'
  | 'text-image-split'
  | 'two-column';

export type ContentBlockType = 'heading' | 'paragraph' | 'quote' | 'poem';

export interface ContentBlock {
  type: ContentBlockType;
  text: string;
  style?: Record<string, string>;
}

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

// ============ 运行时处理后的类型 ============

export interface ProcessedChapter extends ChapterConfig {
  startPage: number;
  endPage: number;
  music?: MusicTrackConfig;
}

export interface ProcessedPage extends PageConfig {
  id: string;
  pageNumber: number;
}
