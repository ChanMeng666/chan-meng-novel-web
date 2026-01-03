import { create } from 'zustand';
import { BookState } from '@/types';

export const useBookStore = create<BookState>((set) => ({
  currentPage: 0,
  currentChapter: 'preface',
  totalPages: 0,
  isFlipping: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
  setTotalPages: (total) => set({ totalPages: total }),
  setIsFlipping: (flipping) => set({ isFlipping: flipping }),
}));
