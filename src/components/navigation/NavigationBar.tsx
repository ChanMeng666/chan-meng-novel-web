import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, BookOpen, ChevronUp } from 'lucide-react';
import { getChapters } from '@/lib/config-loader';
import { useBookStore } from '@/stores';
import { cn } from '@/lib/utils';

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
  const [showChapters, setShowChapters] = useState(false);
  const { currentPage, currentChapter } = useBookStore();
  const chapters = getChapters();

  // 当前显示的页码
  const displayPage = Math.max(1, currentPage - 1);

  const handlePrev = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(event);
  };

  const handleNext = () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* 主导航栏 - 精简浮动样式 */}
      <nav
        className={cn(
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-40",
          "flex items-center gap-1",
          "bg-black/30 backdrop-blur-sm",
          "rounded-full px-2 py-1.5",
          "border border-white/10",
          "transition-all duration-300",
          "hover:bg-black/40"
        )}
      >
        {/* 首页 */}
        <button
          onClick={() => onGoToPage(0)}
          className={cn(
            "w-7 h-7 rounded-full",
            "flex items-center justify-center",
            "text-white/70 hover:text-white",
            "transition-colors"
          )}
          title="返回封面"
        >
          <Home className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/20" />

        {/* 上一页 */}
        <button
          onClick={handlePrev}
          className={cn(
            "w-7 h-7 rounded-full",
            "flex items-center justify-center",
            "text-white/70 hover:text-white",
            "transition-colors"
          )}
          title="上一页"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* 页码显示 */}
        <span className="text-white/80 text-xs px-2 min-w-[4rem] text-center">
          {displayPage} / {totalPages}
        </span>

        {/* 下一页 */}
        <button
          onClick={handleNext}
          className={cn(
            "w-7 h-7 rounded-full",
            "flex items-center justify-center",
            "text-white/70 hover:text-white",
            "transition-colors"
          )}
          title="下一页"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-4 bg-white/20" />

        {/* 章节菜单按钮 */}
        <button
          onClick={() => setShowChapters(!showChapters)}
          className={cn(
            "w-7 h-7 rounded-full",
            "flex items-center justify-center",
            "text-white/70 hover:text-white",
            "transition-colors",
            showChapters && "text-amber-400"
          )}
          title="章节目录"
        >
          <BookOpen className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* 章节选择弹窗 */}
      {showChapters && (
        <>
          {/* 遮罩层 */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowChapters(false)}
          />

          {/* 章节列表 */}
          <div
            className={cn(
              "fixed bottom-16 left-1/2 -translate-x-1/2 z-40",
              "bg-black/80 backdrop-blur-md",
              "rounded-lg border border-white/10",
              "max-h-64 overflow-y-auto",
              "min-w-[200px] max-w-[280px]",
              "shadow-xl"
            )}
          >
            <div className="p-2">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => {
                    onGoToChapter(chapter.id);
                    setShowChapters(false);
                  }}
                  className={cn(
                    "w-full px-3 py-2 text-left rounded",
                    "text-white/80 hover:text-white",
                    "hover:bg-white/10 transition-colors",
                    "text-sm",
                    chapter.id === currentChapter && "bg-amber-600/30 text-amber-300"
                  )}
                >
                  <div className="font-medium truncate">{chapter.title}</div>
                  {chapter.subtitle && (
                    <div className="text-xs text-white/50 truncate mt-0.5">
                      {chapter.subtitle}
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* 关闭提示 */}
            <button
              onClick={() => setShowChapters(false)}
              className={cn(
                "w-full py-2 border-t border-white/10",
                "text-white/50 hover:text-white/80",
                "text-xs flex items-center justify-center gap-1",
                "transition-colors"
              )}
            >
              <ChevronUp className="w-3 h-3" />
              收起
            </button>
          </div>
        </>
      )}
    </>
  );
};
