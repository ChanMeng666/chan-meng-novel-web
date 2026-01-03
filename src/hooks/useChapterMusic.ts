import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/stores';
import { chapters } from '@/data/chapters';
import { getMusicByChapterId } from '@/data/music-config';

export const useChapterMusic = (currentPage: number) => {
  const { setCurrentTrack, setIsPlaying, autoPlay } = useAudioStore();
  const previousChapterId = useRef<string | null>(null);

  useEffect(() => {
    // 找到当前页所属的章节
    const currentChapter = chapters.find(
      ch => currentPage >= ch.startPage && currentPage <= ch.endPage
    );

    if (!currentChapter) return;

    // 如果章节发生变化
    if (currentChapter.id !== previousChapterId.current) {
      previousChapterId.current = currentChapter.id;

      // 查找该章节的音乐
      const track = getMusicByChapterId(currentChapter.id);

      if (track) {
        setCurrentTrack(track);
        if (autoPlay) {
          setIsPlaying(true);
        }
      } else {
        // 如果该章节没有音乐，停止播放
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    }
  }, [currentPage, setCurrentTrack, setIsPlaying, autoPlay]);
};
