import { useEffect, RefObject } from 'react';
import { PageFlip } from 'page-flip';

interface BookRef {
  pageFlip: () => PageFlip;
}

export const useKeyboardNav = (bookRef: RefObject<BookRef | null>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!bookRef.current) return;

      const pageFlip = bookRef.current.pageFlip();

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          pageFlip.flipNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          pageFlip.flipPrev();
          break;
        case 'Home':
          e.preventDefault();
          pageFlip.turnToPage(0);
          break;
        case 'End':
          e.preventDefault();
          pageFlip.turnToPage(pageFlip.getPageCount() - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookRef]);
};
