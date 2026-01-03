import { useState, useEffect } from 'react';

interface BookDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

export const useResponsiveBook = (): BookDimensions => {
  const [dimensions, setDimensions] = useState<BookDimensions>({
    width: 450,
    height: 600,
    isMobile: false,
  });

  useEffect(() => {
    const calculateDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;

      // 书籍宽高比约为 3:4
      const aspectRatio = 3 / 4;

      let width: number;
      let height: number;

      if (isMobile) {
        // 移动端：单页显示，最大化占用空间
        width = Math.min(vw - 16, 500);
        height = width / aspectRatio;

        // 确保高度不超过视口（只留很小的边距）
        if (height > vh - 32) {
          height = vh - 32;
          width = height * aspectRatio;
        }
      } else {
        // 桌面端：双页显示，最大化占用空间
        // 导航栏和音乐播放器悬浮在书页上方，无需预留空间
        const maxWidth = Math.min(vw - 32, 1400);
        const maxHeight = vh - 32;

        width = maxWidth / 2;
        height = width / aspectRatio;

        // 如果高度超出，按高度计算
        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        // 确保最小尺寸
        width = Math.max(width, 300);
        height = Math.max(height, 400);
      }

      setDimensions({
        width: Math.round(width),
        height: Math.round(height),
        isMobile,
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  return dimensions;
};
