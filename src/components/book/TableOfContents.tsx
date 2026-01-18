import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getChapters } from '@/lib/config-loader';

interface TableOfContentsProps {
  onSelectChapter?: (pageNumber: number) => void;
}

export const TableOfContents = forwardRef<HTMLDivElement, TableOfContentsProps>(
  ({ onSelectChapter }, ref) => {
    const chapters = getChapters();

    return (
      <div
        ref={ref}
        className={cn(
          "book-page toc-page",
          "relative w-full h-full bg-book-paper"
        )}
        data-density="soft"
      >
        <div className="page-inner absolute inset-0">
          {/* 目录标题 */}
          <h2 className="toc-title">目 录</h2>

          {/* 章节列表 */}
          <div className="space-y-1">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="toc-item"
                onClick={() => onSelectChapter?.(chapter.startPage)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSelectChapter?.(chapter.startPage);
                  }
                }}
              >
                <div className="flex flex-col">
                  <span className="toc-chapter-title">{chapter.title}</span>
                  {chapter.subtitle && (
                    <span className="text-sm text-gray-500 mt-0.5">
                      {chapter.subtitle}
                    </span>
                  )}
                </div>
                <span className="toc-page-number">{chapter.startPage}</span>
              </div>
            ))}
          </div>

          {/* 页码 */}
          <div className="page-number right">目录</div>
        </div>

        {/* 书脊阴影 */}
        <div className="book-spine-shadow right" />
      </div>
    );
  }
);

TableOfContents.displayName = 'TableOfContents';
