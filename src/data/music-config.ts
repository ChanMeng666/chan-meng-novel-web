import { MusicTrack } from '@/types';

export const musicTracks: MusicTrack[] = [
  {
    id: 'music-1',
    title: '童年回忆',
    src: '/assets/music/chapter1-bgm.mp3',
    chapterId: 'chapter-1',
  },
  {
    id: 'music-2',
    title: '青春无悔',
    src: '/assets/music/chapter2-bgm.mp3',
    chapterId: 'chapter-2',
  },
  // 你可以根据需要添加更多音乐
];

// 章节与音乐的映射
export const chapterMusicMap: Record<string, string> = {
  'chapter-1': 'music-1',
  'chapter-2': 'music-2',
};

// 获取章节的音乐
export function getMusicByChapterId(chapterId: string): MusicTrack | undefined {
  const musicId = chapterMusicMap[chapterId];
  if (!musicId) return undefined;
  return musicTracks.find(t => t.id === musicId);
}
