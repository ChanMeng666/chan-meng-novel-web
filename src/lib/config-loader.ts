import { bookConfig } from '@/config/book.config';
import { contentConfig } from '@/config/content.config';
import type {
  BookConfig,
  ProcessedChapter,
  ProcessedPage,
  MusicTrackConfig,
} from '@/types/config';

// 处理后的章节（包含页码范围）
let processedChapters: ProcessedChapter[] | null = null;

// 处理后的页面（包含自动生成的 ID 和页码）
let processedPages: ProcessedPage[] | null = null;

/**
 * 初始化并处理配置
 * - 自动计算章节的 startPage/endPage
 * - 自动生成页面 ID 和页码
 * - 解析章节音乐引用
 */
export function initializeConfig(): void {
  const { chapters, pages, music } = contentConfig;

  // 1. 处理页面：添加 ID 和页码
  processedPages = pages.map((page, index) => ({
    ...page,
    id: `page-${index + 1}`,
    pageNumber: index + 1,
  }));

  // 2. 处理章节：计算页码范围，解析音乐
  processedChapters = chapters.map((chapter) => {
    const chapterPages = processedPages!.filter(
      (p) => p.chapterId === chapter.id
    );
    const startPage =
      chapterPages.length > 0 ? chapterPages[0].pageNumber : 0;
    const endPage =
      chapterPages.length > 0
        ? chapterPages[chapterPages.length - 1].pageNumber
        : 0;

    return {
      ...chapter,
      startPage,
      endPage,
      music: chapter.musicId ? music[chapter.musicId] : undefined,
    };
  });
}

// ============ 访问器函数 ============

/**
 * 获取书籍配置
 */
export function getBookConfig(): BookConfig {
  return bookConfig;
}

/**
 * 获取所有章节（已处理，包含页码范围）
 */
export function getChapters(): ProcessedChapter[] {
  if (!processedChapters) initializeConfig();
  return processedChapters!;
}

/**
 * 获取所有页面（已处理，包含页码）
 */
export function getPages(): ProcessedPage[] {
  if (!processedPages) initializeConfig();
  return processedPages!;
}

/**
 * 获取书籍总页数（包含封面、目录、封底）
 */
export function getTotalBookPages(): number {
  // 封面(1) + 目录(1) + 内容页 + 封底(1)
  return getPages().length + 3;
}

/**
 * 根据页码获取章节
 */
export function getChapterByPage(
  pageNumber: number
): ProcessedChapter | undefined {
  return getChapters().find(
    (ch) => pageNumber >= ch.startPage && pageNumber <= ch.endPage
  );
}

/**
 * 根据章节 ID 获取章节
 */
export function getChapterById(id: string): ProcessedChapter | undefined {
  return getChapters().find((ch) => ch.id === id);
}

/**
 * 根据章节 ID 获取音乐
 */
export function getMusicByChapterId(
  chapterId: string
): MusicTrackConfig | undefined {
  const chapter = getChapters().find((ch) => ch.id === chapterId);
  return chapter?.music;
}

/**
 * 获取默认音乐（第一个定义的音乐）
 */
export function getDefaultMusic(): MusicTrackConfig | undefined {
  const musicKeys = Object.keys(contentConfig.music);
  return musicKeys.length > 0 ? contentConfig.music[musicKeys[0]] : undefined;
}

/**
 * 获取所有音乐列表
 */
export function getAllMusic(): MusicTrackConfig[] {
  return Object.values(contentConfig.music);
}
