import { Chapter } from '@/types';

export const chapters: Chapter[] = [
  {
    id: 'preface',
    title: '序言',
    subtitle: '写在前面的话',
    startPage: 1,
    endPage: 2,
  },
  {
    id: 'chapter-1',
    title: '第一章：童年时光',
    subtitle: '那些无忧无虑的日子',
    startPage: 3,
    endPage: 6,
    music: {
      id: 'music-main',
      title: '战士阿花',
      src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
    },
  },
  {
    id: 'chapter-2',
    title: '第二章：青春岁月',
    subtitle: '成长的足迹',
    startPage: 7,
    endPage: 10,
    music: {
      id: 'music-main',
      title: '战士阿花',
      src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
    },
  },
  {
    id: 'chapter-3',
    title: '第三章：人生转折',
    subtitle: '那些改变命运的时刻',
    startPage: 11,
    endPage: 14,
    music: {
      id: 'music-main',
      title: '战士阿花',
      src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
    },
  },
  // 你可以根据需要添加更多章节
];

// 获取章节通过页码
export function getChapterByPage(pageNumber: number): Chapter | undefined {
  return chapters.find(
    ch => pageNumber >= ch.startPage && pageNumber <= ch.endPage
  );
}

// 获取章节通过ID
export function getChapterById(id: string): Chapter | undefined {
  return chapters.find(ch => ch.id === id);
}
