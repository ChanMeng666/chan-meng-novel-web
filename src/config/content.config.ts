import type { ContentConfig, ChapterConfig, PageConfig, MusicTrackConfig } from '@/types/config';

/**
 * 内容配置文件
 *
 * 在这里配置您的电子书内容：音乐、章节和页面。
 * Content Configuration File
 * Configure your e-book content: music, chapters, and pages.
 */

// ============ 音乐定义 (Music Definitions) ============
// 在这里定义所有的背景音乐，然后在章节中通过 musicId 引用
// Define all background music here, then reference by musicId in chapters
const music: Record<string, MusicTrackConfig> = {
  'main-theme': {
    id: 'main-theme',
    title: '战士阿花',
    src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
    externalUrl: 'https://suno.com/song/7cd0994c-c606-4135-bdd0-2f9f8fb617d3',
  },
  // 添加更多音乐示例 (Add more music example):
  // 'peaceful-melody': {
  //   id: 'peaceful-melody',
  //   title: '宁静旋律',
  //   src: 'https://example.com/music.mp3',
  //   externalUrl: 'https://example.com/music-page',
  // },
};

// ============ 章节定义 (Chapter Definitions) ============
// 定义书籍的章节结构，页码范围会自动计算
// Define book chapters, page ranges are calculated automatically
const chapters: ChapterConfig[] = [
  {
    id: 'preface',
    title: '序言',
    subtitle: '写在前面的话',
    // 序言不设置音乐 (No music for preface)
    musicId: undefined,
  },
  {
    id: 'chapter-1',
    title: '第一章：童年时光',
    subtitle: '那些无忧无虑的日子',
    musicId: 'main-theme',
  },
  {
    id: 'chapter-2',
    title: '第二章：青春岁月',
    subtitle: '成长的足迹',
    musicId: 'main-theme',
  },
  {
    id: 'chapter-3',
    title: '第三章：人生转折',
    subtitle: '那些改变命运的时刻',
    musicId: 'main-theme',
  },
];

// ============ 页面内容 (Page Contents) ============
// 按顺序定义每一页的内容，通过 chapterId 关联到章节
// Define each page in order, link to chapters via chapterId
const pages: PageConfig[] = [
  // -------- 序言 (Preface) --------
  {
    chapterId: 'preface',
    layout: 'text-only',
    density: 'soft',
    content: [
      { type: 'heading', text: '序言' },
      {
        type: 'paragraph',
        text: '这本书记录了我人生旅途中的点点滴滴。从童年的欢声笑语，到青春的意气风发，再到人生的起起落落，每一段经历都是我生命中珍贵的财富。',
      },
      {
        type: 'paragraph',
        text: '我希望通过这些文字和照片，与你分享我的故事，也许能给你带来一些启发和感动。',
      },
    ],
  },
  {
    chapterId: 'preface',
    layout: 'text-only',
    content: [
      {
        type: 'paragraph',
        text: '感谢一路走来陪伴我的家人和朋友，是你们让我的人生如此丰富多彩。',
      },
      {
        type: 'quote',
        text: '"人生就像一本书，每一页都值得细细品味。"',
      },
      {
        type: 'paragraph',
        text: '愿你在阅读这本书的过程中，能感受到生命的美好与力量。',
      },
    ],
  },

  // -------- 第一章：童年时光 (Chapter 1) --------
  {
    chapterId: 'chapter-1',
    layout: 'text-only',
    density: 'hard',
    content: [
      { type: 'heading', text: '第一章' },
      { type: 'heading', text: '童年时光' },
      {
        type: 'paragraph',
        text: '那些无忧无虑的日子，是我记忆中最温暖的篇章。',
      },
    ],
  },
  {
    chapterId: 'chapter-1',
    layout: 'text-image-split',
    content: [
      {
        type: 'paragraph',
        text: '我出生在一个普通而温馨的家庭。父母虽然工作繁忙，但总会抽出时间陪伴我成长。每天放学后，我都会和小伙伴们在院子里玩耍，直到夕阳西下。',
      },
      {
        type: 'paragraph',
        text: '那时候的日子简单而快乐，没有太多的烦恼，只有无尽的好奇心和对世界的探索。',
      },
    ],
    images: [
      {
        src: '/assets/images/chapter1/childhood-home.jpg',
        alt: '童年老家',
        caption: '我童年时期的老家',
      },
    ],
  },
  {
    chapterId: 'chapter-1',
    layout: 'image-full',
    content: [],
    images: [
      {
        src: '/assets/images/chapter1/family-photo.jpg',
        alt: '全家福',
        caption: '珍贵的全家福照片',
      },
    ],
  },
  {
    chapterId: 'chapter-1',
    layout: 'text-only',
    content: [
      {
        type: 'paragraph',
        text: '童年的时光总是过得飞快。转眼间，我已经长大成人，但那些美好的记忆永远留在我的心中。',
      },
      {
        type: 'quote',
        text: '"童年是人生最纯真的时光，那些欢笑和泪水，都是成长的印记。"',
      },
    ],
  },

  // -------- 第二章：青春岁月 (Chapter 2) --------
  {
    chapterId: 'chapter-2',
    layout: 'text-only',
    density: 'hard',
    content: [
      { type: 'heading', text: '第二章' },
      { type: 'heading', text: '青春岁月' },
      {
        type: 'paragraph',
        text: '成长的足迹，记录着我青春的点点滴滴。',
      },
    ],
  },
  {
    chapterId: 'chapter-2',
    layout: 'text-only',
    content: [
      {
        type: 'paragraph',
        text: '青春期是人生中最充满活力和梦想的时期。那时的我，对未来充满了无限的憧憬和期待。',
      },
      {
        type: 'paragraph',
        text: '在学校里，我认识了许多志同道合的朋友，我们一起学习、一起玩耍、一起追逐梦想。',
      },
    ],
  },
  {
    chapterId: 'chapter-2',
    layout: 'text-image-split',
    content: [
      {
        type: 'paragraph',
        text: '那些在教室里埋头苦读的日子，那些在操场上挥洒汗水的时刻，都成为了我青春最美好的回忆。',
      },
    ],
    images: [
      {
        src: '/assets/images/chapter2/school-days.jpg',
        alt: '校园时光',
        caption: '青涩的校园时光',
      },
    ],
  },
  {
    chapterId: 'chapter-2',
    layout: 'text-only',
    content: [
      {
        type: 'paragraph',
        text: '青春虽然短暂，但它给予我的勇气和力量，将伴随我一生。',
      },
      {
        type: 'quote',
        text: '"青春不是年华，而是心境；青春不是桃面、丹唇、柔膝，而是深沉的意志、恢弘的想象、炙热的感情。"',
      },
    ],
  },

  // -------- 第三章：人生转折 (Chapter 3) --------
  {
    chapterId: 'chapter-3',
    layout: 'text-only',
    density: 'hard',
    content: [
      { type: 'heading', text: '第三章' },
      { type: 'heading', text: '人生转折' },
      {
        type: 'paragraph',
        text: '那些改变命运的时刻，塑造了今天的我。',
      },
    ],
  },
  {
    chapterId: 'chapter-3',
    layout: 'text-only',
    content: [
      {
        type: 'paragraph',
        text: '人生总会遇到一些转折点，它们或大或小，但都会对我们的人生轨迹产生深远的影响。',
      },
      {
        type: 'paragraph',
        text: '我也不例外。在人生的旅途中，我经历了许多重要的转折，它们让我学会了成长，学会了坚强。',
      },
    ],
  },
  {
    chapterId: 'chapter-3',
    layout: 'text-image-split',
    content: [
      {
        type: 'paragraph',
        text: '回首往事，我感谢那些困难和挑战，因为正是它们让我变得更加成熟和睿智。',
      },
    ],
    images: [
      {
        src: '/assets/images/chapter3/turning-point.jpg',
        alt: '人生转折',
        caption: '人生重要时刻的纪念',
      },
    ],
  },
  {
    chapterId: 'chapter-3',
    layout: 'text-only',
    content: [
      {
        type: 'paragraph',
        text: '未完待续...',
      },
      {
        type: 'quote',
        text: '"人生没有白走的路，每一步都算数。"',
      },
      {
        type: 'paragraph',
        text: '感谢你阅读到这里，更多精彩内容，敬请期待。',
      },
    ],
  },
];

// ============ 导出配置 (Export Configuration) ============
export const contentConfig: ContentConfig = {
  music,
  chapters,
  pages,
};
