import { useRef, useEffect, useState } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import { useAudioStore } from '@/stores';
import { cn } from '@/lib/utils';

// 音乐配置
const MUSIC_CONFIG = {
  id: 'music-main',
  title: '战士阿花',
  src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
  sunoUrl: 'https://suno.com/song/7cd0994c-c606-4135-bdd0-2f9f8fb617d3',
};

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isPlaying, setIsPlaying, currentTrack, setCurrentTrack } = useAudioStore();

  // 初始化音乐
  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack(MUSIC_CONFIG);
    }
  }, [currentTrack, setCurrentTrack]);

  // 加载音频
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = MUSIC_CONFIG.src;
      audioRef.current.load();
    }
  }, []);

  // 播放控制
  useEffect(() => {
    if (audioRef.current && isLoaded && hasInteracted) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLoaded, hasInteracted, setIsPlaying]);

  const handleToggle = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleCanPlay = () => setIsLoaded(true);

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
        disabled={!isLoaded}
        className={cn(
          "w-7 h-7 rounded-full",
          "flex items-center justify-center",
          "text-white/80 hover:text-white",
          "transition-all duration-200",
          "disabled:opacity-40 disabled:cursor-not-allowed",
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
      <div className="w-px h-4 bg-white/20" />

      {/* Suno 链接 */}
      <a
        href={MUSIC_CONFIG.sunoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center gap-1",
          "text-white/60 hover:text-white/90",
          "text-xs transition-colors",
          "pr-1"
        )}
        title="在 Suno 上查看"
      >
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};
