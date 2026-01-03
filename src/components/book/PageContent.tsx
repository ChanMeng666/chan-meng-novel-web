import React from 'react';
import { ContentBlock, ImageData, PageLayout } from '@/types';

interface PageContentProps {
  content: ContentBlock[];
  images?: ImageData[];
  layout?: PageLayout;
}

export const PageContent: React.FC<PageContentProps> = ({
  content,
  images = [],
  layout = 'text-only'
}) => {
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return (
          <h2
            key={index}
            className="content-heading"
          >
            {block.text}
          </h2>
        );
      case 'paragraph':
        return (
          <p
            key={index}
            className="content-paragraph"
          >
            {block.text}
          </p>
        );
      case 'quote':
        return (
          <blockquote
            key={index}
            className="content-quote"
          >
            {block.text}
          </blockquote>
        );
      case 'poem':
        return (
          <div
            key={index}
            className="whitespace-pre-line text-center my-4 text-gray-700 italic"
          >
            {block.text}
          </div>
        );
      default:
        return null;
    }
  };

  // 全图布局
  if (layout === 'image-full') {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        {images[0] && (
          <figure className="text-center flex-1 flex flex-col items-center justify-center">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="content-image"
              onError={(e) => {
                // 图片加载失败时显示占位图
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=400&h=300&fit=crop';
              }}
            />
            {images[0].caption && (
              <figcaption className="content-caption">
                {images[0].caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    );
  }

  // 上文下图布局
  if (layout === 'text-image-split') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          {content.map(renderContentBlock)}
        </div>
        {images[0] && (
          <div className="mt-4 flex flex-col items-center">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="max-h-48 object-contain rounded shadow"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=400&h=300&fit=crop';
              }}
            />
            {images[0].caption && (
              <p className="content-caption">{images[0].caption}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 双栏布局
  if (layout === 'two-column') {
    const midPoint = Math.ceil(content.length / 2);
    const leftContent = content.slice(0, midPoint);
    const rightContent = content.slice(midPoint);

    return (
      <div className="h-full grid grid-cols-2 gap-4">
        <div className="overflow-hidden">
          {leftContent.map(renderContentBlock)}
        </div>
        <div className="overflow-hidden">
          {rightContent.map(renderContentBlock)}
        </div>
      </div>
    );
  }

  // 默认纯文字布局
  return (
    <div className="h-full overflow-hidden">
      {content.map(renderContentBlock)}
    </div>
  );
};
