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

      // 书籍宽高比约为 2:3（更接近真实书籍比例）
      const aspectRatio = 2 / 3;

      let width: number;
      let height: number;

      if (isMobile) {
        // 移动端：单页显示，几乎占满屏幕
        // 高度优先，留出极小边距
        height = vh - 20;
        width = height * aspectRatio;

        // 如果宽度超出视口，按宽度计算
        if (width > vw - 10) {
          width = vw - 10;
          height = width / aspectRatio;
        }
      } else {
        // 桌面端：双页显示，最大化占用屏幕
        // 高度优先策略：先让高度占满，再计算宽度
        height = vh - 20; // 只留20px边距
        width = height * aspectRatio;

        // 检查双页总宽度是否超出视口
        const totalWidth = width * 2;
        if (totalWidth > vw - 20) {
          // 按宽度限制重新计算
          width = (vw - 20) / 2;
          height = width / aspectRatio;
        }
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
