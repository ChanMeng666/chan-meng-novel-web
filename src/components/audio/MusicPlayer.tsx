import { useRef, useEffect, useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useAudioStore } from '@/stores';
import { getBookConfig, getDefaultMusic } from '@/lib/config-loader';
import { cn } from '@/lib/utils';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isPlaying, setIsPlaying, currentTrack, setCurrentTrack } = useAudioStore();

  const { features } = getBookConfig();
  const musicConfig = features?.music;

  // 如果音乐功能被禁用，不渲染
  if (!musicConfig?.enabled) {
    return null;
  }

  // 获取默认音乐
  const defaultMusic = getDefaultMusic();

  // 初始化时设置默认音乐
  useEffect(() => {
    if (!currentTrack && defaultMusic) {
      setCurrentTrack({
        id: defaultMusic.id,
        title: defaultMusic.title,
        src: defaultMusic.src,
      });
    }
  }, [currentTrack, defaultMusic, setCurrentTrack]);

  // 音轨变化时加载音频（只有当 src 真正变化时才重新加载）
  const previousSrcRef = useRef<string | null>(null);
  useEffect(() => {
    const musicToPlay = currentTrack || defaultMusic;
    if (audioRef.current && musicToPlay) {
      // 只有当音乐源真正变化时才重新加载，避免同一首歌重复播放
      if (musicToPlay.src !== previousSrcRef.current) {
        previousSrcRef.current = musicToPlay.src;
        setIsLoaded(false);
        audioRef.current.src = musicToPlay.src;
        audioRef.current.load();
      }
    }
  }, [currentTrack, defaultMusic]);

  // 播放/暂停状态变化
  useEffect(() => {
    if (audioRef.current && isLoaded) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.error('播放失败:', err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLoaded, setIsPlaying]);

  const handleCanPlay = () => setIsLoaded(true);

  const handleToggle = () => {
    setIsPlaying(!isPlaying);
  };

  // 获取当前播放的音乐
  const musicToPlay = currentTrack || defaultMusic;
  const externalUrl = currentTrack
    ? (getDefaultMusic()?.externalUrl || undefined)
    : defaultMusic?.externalUrl;

  // 如果没有音乐配置，不渲染
  if (!musicToPlay) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50",
        "flex items-center gap-1.5",
        "bg-black/30 backdrop-blur-sm",
        "rounded-full px-2 py-1.5",
        "border border-white/10",
        "transition-all duration-300",
        "hover:bg-black/40"
      )}
    >
      <audio
        ref={audioRef}
        loop
        onCanPlay={handleCanPlay}
        preload="auto"
      />

      {/* 播放/暂停按钮 */}
      <button
        onClick={handleToggle}
        className={cn(
          "w-7 h-7 rounded-full",
          "flex items-center justify-center",
          "text-white/80 hover:text-white",
          "transition-all duration-200",
          isPlaying && "text-amber-400 hover:text-amber-300"
        )}
        title={isPlaying ? '暂停' : '播放'}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" />
        )}
      </button>

      {/* 分隔线 */}
      {musicConfig.showExternalLink && externalUrl && (
        <div className="w-px h-4 bg-white/20" />
      )}

      {/* 外部链接 */}
      {musicConfig.showExternalLink && externalUrl && (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1",
            "text-white/60 hover:text-white/90",
            "text-xs transition-colors",
            "pr-1"
          )}
          title="查看音乐来源"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
};
