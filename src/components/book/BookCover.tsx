import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { getBookConfig } from '@/lib/config-loader';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  type: 'front' | 'back';
}

export const BookCover = forwardRef<HTMLDivElement, BookCoverProps>(
  ({ type }, ref) => {
    const { book } = getBookConfig();

    if (type === 'front') {
      return (
        <div
          ref={ref}
          className={cn("book-cover", "book-page")}
          data-density="hard"
        >
          {/* 装饰图案 */}
          <div className="absolute inset-4 border-2 border-amber-200/30 rounded-lg pointer-events-none" />
          <div className="absolute inset-8 border border-amber-200/20 rounded-lg pointer-events-none" />

          {/* 书籍图标 */}
          <BookOpen className="w-16 h-16 mb-6 opacity-80" />

          {/* 标题 */}
          <h1 className="book-cover-title font-serif">
            {book.title}
          </h1>

          {/* 副标题 */}
          {book.subtitle && (
            <p className="book-cover-subtitle">
              {book.subtitle}
            </p>
          )}

          {/* 装饰线 */}
          <div className="w-32 h-0.5 bg-amber-200/50 my-6" />

          {/* 作者 */}
          <p className="book-cover-author">
            {book.author} 著
          </p>
        </div>
      );
    }

    // 封底
    return (
      <div
        ref={ref}
        className={cn("book-cover", "book-back-cover", "book-page")}
        data-density="hard"
      >
        {/* 装饰边框 */}
        <div className="absolute inset-4 border border-amber-200/20 rounded-lg pointer-events-none" />

        {/* 结语 */}
        {book.backCover?.quote && (
          <p className="text-lg italic opacity-80 max-w-xs text-center">
            {book.backCover.quote}
          </p>
        )}

        <div className="w-24 h-0.5 bg-amber-200/30 my-8" />

        {/* 版权信息 */}
        <div className="text-sm opacity-60 text-center">
          <p>{book.title}</p>
          <p className="mt-2">© {book.year || new Date().getFullYear()} {book.author}</p>
          {book.backCover?.copyright && (
            <p className="mt-1">{book.backCover.copyright}</p>
          )}
        </div>
      </div>
    );
  }
);

BookCover.displayName = 'BookCover';
