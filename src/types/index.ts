// 章节类型
export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  startPage: number;
  endPage: number;
  music?: MusicTrack;
}

// 音乐类型
export type MusicType = 'audio' | 'spotify';

export interface MusicTrack {
  id: string;
  title: string;
  type?: MusicType;           // 默认 'audio'
  src?: string;               // 直接音频 URL
  spotifyTrackId?: string;    // Spotify 曲目 ID
  externalUrl?: string;       // 外部链接
  chapterId?: string;
}

// 页面布局类型
export type PageLayout =
  | 'text-only'
  | 'image-full'
  | 'text-image-split'
  | 'two-column';

// 内容块类型
export type ContentBlockType = 'heading' | 'paragraph' | 'quote' | 'poem';

// 内容块
export interface ContentBlock {
  type: ContentBlockType;
  text: string;
  style?: Record<string, string>;
}

// 图片数据
export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

// 页面数据
export interface PageData {
  id: string;
  chapterId: string;
  content: ContentBlock[];
  images?: ImageData[];
  layout?: PageLayout;
  density?: 'soft' | 'hard'; // 翻页效果：软页/硬页
}

// 书籍状态
export interface BookState {
  currentPage: number;
  currentChapter: string;
  totalPages: number;
  isFlipping: boolean;
  setCurrentPage: (page: number) => void;
  setCurrentChapter: (chapterId: string) => void;
  setTotalPages: (total: number) => void;
  setIsFlipping: (flipping: boolean) => void;
}

// 音频状态
export interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTrack: MusicTrack | null;
  autoPlay: boolean;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setCurrentTrack: (track: MusicTrack | null) => void;
  setAutoPlay: (auto: boolean) => void;
}
