import React from 'react';
import { Button } from '@/components/ui/button';
import { ChapterNav } from './ChapterNav';
import { PageSlider } from './PageSlider';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface NavigationBarProps {
  onGoToPage: (page: number) => void;
  onGoToChapter: (chapterId: string) => void;
  totalPages: number;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onGoToPage,
  onGoToChapter,
  totalPages,
}) => {
  return (
    <nav className="nav-bar">
      {/* 首页按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onGoToPage(0)}
        title="返回封面"
      >
        <Home className="w-5 h-5" />
      </Button>

      {/* 上一页 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
          window.dispatchEvent(event);
        }}
        title="上一页 (← 或 PageUp)"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* 页面滑块 */}
      <PageSlider
        onGoToPage={onGoToPage}
        totalPages={totalPages}
      />

      {/* 下一页 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
          window.dispatchEvent(event);
        }}
        title="下一页 (→ 或 PageDown)"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* 章节导航 */}
      <ChapterNav onSelectChapter={onGoToChapter} />
    </nav>
  );
};
