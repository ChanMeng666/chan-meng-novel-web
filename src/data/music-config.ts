import { MusicTrack } from '@/types';

export const musicTracks: MusicTrack[] = [
  {
    id: 'music-main',
    title: '战士阿花',
    src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
    chapterId: 'chapter-1',
  },
];

// 章节与音乐的映射 - 所有章节使用同一首背景音乐
export const chapterMusicMap: Record<string, string> = {
  'chapter-1': 'music-main',
  'chapter-2': 'music-main',
  'chapter-3': 'music-main',
};

// 获取章节的音乐
export function getMusicByChapterId(chapterId: string): MusicTrack | undefined {
  const musicId = chapterMusicMap[chapterId];
  if (!musicId) return undefined;
  return musicTracks.find(t => t.id === musicId);
}
