import React, { useRef, useCallback, useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { BookPage } from './BookPage';
import { BookCover } from './BookCover';
import { TableOfContents } from './TableOfContents';
import { NavigationBar } from '../navigation/NavigationBar';
import { MusicPlayer } from '../audio/MusicPlayer';
import { useBookStore } from '@/stores';
import { useChapterMusic } from '@/hooks/useChapterMusic';
import { useKeyboardNav } from '@/hooks/useKeyboardNav';
import { useResponsiveBook } from '@/hooks/useResponsiveBook';
import { pages, chapters, getChapterByPage } from '@/data';

interface FlipEvent {
  data: number;
}

export const BookContainer: React.FC = () => {
  const bookRef = useRef<any>(null);
  const { currentPage, setCurrentPage, setCurrentChapter, setTotalPages } = useBookStore();
  const { width, height, isMobile } = useResponsiveBook();

  // 跟踪模式切换的过渡状态
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevIsMobileRef = useRef(isMobile);

  // 自动播放章节背景音乐
  useChapterMusic(currentPage);

  // 键盘导航支持
  useKeyboardNav(bookRef);

  // 初始化总页数
  useEffect(() => {
    // 封面 + 目录 + 内页 + 封底
    setTotalPages(pages.length + 3);
  }, [setTotalPages]);

  // 响应式模式切换时的过渡效果和页码恢复
  useEffect(() => {
    if (prevIsMobileRef.current !== isMobile) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        // 恢复页码位置
        if (bookRef.current && currentPage > 0) {
          bookRef.current.pageFlip()?.turnToPage(currentPage);
        }
        setIsTransitioning(false);
      }, 100);

      prevIsMobileRef.current = isMobile;
      return () => clearTimeout(timer);
    }
  }, [isMobile, currentPage]);

  // 翻页事件处理
  const handleFlip = useCallback((e: FlipEvent) => {
    const pageIndex = e.data;
    setCurrentPage(pageIndex);

    // 计算实际内容页码（减去封面和目录）
    const contentPageIndex = pageIndex - 2;
    if (contentPageIndex >= 0 && contentPageIndex < pages.length) {
      const chapter = getChapterByPage(contentPageIndex + 1);
      if (chapter) {
        setCurrentChapter(chapter.id);
      }
    }
  }, [setCurrentPage, setCurrentChapter]);

  // 跳转到指定页
  const goToPage = useCallback((pageNum: number) => {
    if (bookRef.current) {
      // pageNum 是内容页码，需要加上封面和目录的偏移
      const actualPage = pageNum + 1; // +1 for cover, +1 for TOC but -1 for 0-index
      bookRef.current.pageFlip().turnToPage(actualPage);
    }
  }, []);

  // 跳转到章节
  const goToChapter = useCallback((chapterId: string) => {
    const chapter = chapters.find(ch => ch.id === chapterId);
    if (chapter) {
      goToPage(chapter.startPage);
    }
  }, [goToPage]);

  return (
    <div className="book-container">
      {/* 书架背景 */}
      <div className="bookshelf-background" />

      {/* 翻书组件 */}
      <div className={`book-open ${isTransitioning ? 'transitioning' : ''}`}>
        <HTMLFlipBook
          key={isMobile ? 'mobile' : 'desktop'}
          ref={bookRef}
          width={width}
          height={height}
          size="fixed"
          minWidth={200}
          maxWidth={1200}
          minHeight={300}
          maxHeight={1600}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="book-flipbook"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
        >
          {/* 封面 */}
          <BookCover type="front" />

          {/* 目录页 */}
          <TableOfContents onSelectChapter={goToPage} />

          {/* 内页 */}
          {pages.map((page, index) => (
            <BookPage
              key={page.id}
              pageData={page}
              pageNumber={index + 1}
              isLeft={index % 2 === 0}
            />
          ))}

          {/* 封底 */}
          <BookCover type="back" />
        </HTMLFlipBook>
      </div>

      {/* 导航栏 */}
      <NavigationBar
        onGoToPage={goToPage}
        onGoToChapter={goToChapter}
        totalPages={pages.length}
      />

      {/* 音乐播放器 */}
      <MusicPlayer />
    </div>
  );
};
