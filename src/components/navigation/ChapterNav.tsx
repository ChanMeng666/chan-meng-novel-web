import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { getChapters } from '@/lib/config-loader';
import { useBookStore } from '@/stores';
import { cn } from '@/lib/utils';

interface ChapterNavProps {
  onSelectChapter: (chapterId: string) => void;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({ onSelectChapter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentChapter } = useBookStore();
  const chapters = getChapters();

  const currentChapterData = chapters.find(ch => ch.id === currentChapter);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline max-w-32 truncate">
          {currentChapterData?.title || '目录'}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </Button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className={cn(
          "absolute bottom-full left-0 mb-2",
          "bg-white rounded-lg shadow-lg",
          "border border-gray-200",
          "min-w-64 max-h-80 overflow-y-auto",
          "slide-up"
        )}>
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                onSelectChapter(chapter.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left",
                "hover:bg-amber-50 transition-colors",
                "border-b border-gray-100 last:border-0",
                chapter.id === currentChapter && "bg-amber-100"
              )}
            >
              <div className="font-medium text-gray-800">{chapter.title}</div>
              {chapter.subtitle && (
                <div className="text-sm text-gray-500 mt-0.5">
                  {chapter.subtitle}
                </div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                第 {chapter.startPage} - {chapter.endPage} 页
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
