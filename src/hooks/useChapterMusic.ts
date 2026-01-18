import { useEffect, useRef } from 'react';
import { useAudioStore } from '@/stores';
import { getChapterByPage } from '@/lib/config-loader';

export const useChapterMusic = (currentPage: number) => {
  const { setCurrentTrack, setIsPlaying, autoPlay } = useAudioStore();
  const previousChapterId = useRef<string | null>(null);
  const previousMusicId = useRef<string | null>(null);

  useEffect(() => {
    // 找到当前页所属的章节（使用配置加载器）
    const currentChapter = getChapterByPage(currentPage);

    if (!currentChapter) return;

    // 如果章节发生变化
    if (currentChapter.id !== previousChapterId.current) {
      previousChapterId.current = currentChapter.id;

      const currentMusicId = currentChapter.music?.id || null;

      // 只有当音乐真正变化时才更新（避免相邻章节同一首歌重复加载）
      if (currentMusicId !== previousMusicId.current) {
        previousMusicId.current = currentMusicId;

        if (currentChapter.music) {
          setCurrentTrack({
            id: currentChapter.music.id,
            title: currentChapter.music.title,
            src: currentChapter.music.src,
          });
          if (autoPlay) {
            setIsPlaying(true);
          }
        } else {
          // 如果该章节没有音乐，停止播放
          setCurrentTrack(null);
          setIsPlaying(false);
        }
      }
      // 如果音乐相同，保持当前播放状态不变
    }
  }, [currentPage, setCurrentTrack, setIsPlaying, autoPlay]);
};
