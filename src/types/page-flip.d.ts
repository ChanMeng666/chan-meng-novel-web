declare module 'page-flip' {
  export class PageFlip {
    flipNext(): void;
    flipPrev(): void;
    turnToPage(pageNum: number): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
  }
}
