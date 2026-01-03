import React from 'react';
import { Slider } from '@/components/ui/slider';
import { useBookStore } from '@/stores';

interface PageSliderProps {
  onGoToPage: (page: number) => void;
  totalPages: number;
}

export const PageSlider: React.FC<PageSliderProps> = ({
  onGoToPage,
  totalPages,
}) => {
  const { currentPage } = useBookStore();

  // 当前显示的页码（减去封面和目录的偏移）
  const displayPage = Math.max(1, currentPage - 1);

  const handleValueChange = (value: number[]) => {
    const page = value[0];
    onGoToPage(page);
  };

  return (
    <div className="flex items-center gap-3 flex-1 max-w-xs">
      <span className="text-sm text-gray-600 whitespace-nowrap">
        {displayPage}
      </span>
      <Slider
        value={[displayPage]}
        onValueChange={handleValueChange}
        max={totalPages}
        step={1}
        className="flex-1"
      />
      <span className="text-sm text-gray-600 whitespace-nowrap">
        {totalPages}
      </span>
    </div>
  );
};
