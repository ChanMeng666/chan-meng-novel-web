import { forwardRef } from 'react';
import { PageContent } from './PageContent';
import { cn } from '@/lib/utils';
import { PageData } from '@/types';

interface BookPageProps {
  pageData: PageData;
  pageNumber: number;
  isLeft: boolean;
}

// 必须使用 forwardRef，react-pageflip 需要访问 DOM 元素
export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  ({ pageData, pageNumber, isLeft }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "book-page",
          "relative w-full h-full",
          "bg-book-paper",
          isLeft ? "page-left" : "page-right"
        )}
        data-density={pageData.density || "soft"}
      >
        {/* 页面内容区域 */}
        <div className={cn(
          "page-inner",
          "absolute inset-0"
        )}>
          {/* 页面内容 */}
          <PageContent
            content={pageData.content}
            images={pageData.images}
            layout={pageData.layout}
          />

          {/* 页码 */}
          <div className={cn(
            "page-number",
            isLeft ? "left" : "right"
          )}>
            {pageNumber}
          </div>
        </div>

        {/* 书脊阴影效果 */}
        <div className={cn(
          "book-spine-shadow",
          isLeft ? "left" : "right"
        )} />
      </div>
    );
  }
);

BookPage.displayName = 'BookPage';
