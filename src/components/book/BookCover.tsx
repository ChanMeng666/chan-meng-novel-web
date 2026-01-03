import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  type: 'front' | 'back';
}

export const BookCover = forwardRef<HTMLDivElement, BookCoverProps>(
  ({ type }, ref) => {
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
            Chan's novel
          </h1>

          {/* 副标题 */}
          <p className="book-cover-subtitle">
            一段人生的记忆
          </p>

          {/* 装饰线 */}
          <div className="w-32 h-0.5 bg-amber-200/50 my-6" />

          {/* 作者 */}
          <p className="book-cover-author">
            Chan Meng 著
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
        <p className="text-lg italic opacity-80 max-w-xs text-center">
          "人生如书，每一页都值得珍藏。"
        </p>

        <div className="w-24 h-0.5 bg-amber-200/30 my-8" />

        {/* 版权信息 */}
        <div className="text-sm opacity-60 text-center">
          <p>Chan's novel</p>
          <p className="mt-2">© {new Date().getFullYear()} Chan Meng</p>
          <p className="mt-1">All Rights Reserved</p>
        </div>
      </div>
    );
  }
);

BookCover.displayName = 'BookCover';
