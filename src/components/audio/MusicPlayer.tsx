import { useRef, useEffect, useState } from 'react';
import { Play, Pause, ExternalLink, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { useAudioStore } from '@/stores';
import { getBookConfig, getDefaultMusic } from '@/lib/config-loader';
import { cn } from '@/lib/utils';
import type { MusicTrackConfig } from '@/types/config';

// Spotify 嵌入播放器组件
const SpotifyPlayer: React.FC<{
  trackId: string;
  isExpanded: boolean;
  onToggle: () => void;
  externalUrl?: string;
  showExternalLink?: boolean;
}> = ({ trackId, isExpanded, onToggle, externalUrl, showExternalLink }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 控制按钮 */}
      <div
        className={cn(
          "flex items-center gap-1.5",
          "bg-black/30 backdrop-blur-sm",
          "rounded-full px-2 py-1.5",
          "border border-white/10",
          "transition-all duration-300",
          "hover:bg-black/40"
        )}
      >
        {/* Spotify 图标 */}
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-green-400">
          <Music className="w-3.5 h-3.5" />
        </div>

        {/* 展开/收起按钮 */}
        <button
          onClick={onToggle}
          className={cn(
            "w-7 h-7 rounded-full",
            "flex items-center justify-center",
            "text-white/80 hover:text-white",
            "transition-all duration-200"
          )}
          title={isExpanded ? '收起播放器' : '展开播放器'}
        >
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {/* 外部链接 */}
        {showExternalLink && externalUrl && (
          <>
            <div className="w-px h-4 bg-white/20" />
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
              title="在 Spotify 中打开"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </>
        )}
      </div>

      {/* Spotify 嵌入播放器（展开时显示） */}
      {isExpanded && (
        <div
          className={cn(
            "mt-2 rounded-xl overflow-hidden shadow-xl",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
          <iframe
            src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
            width="300"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

// 原生音频播放器组件
const AudioPlayer: React.FC<{
  music: MusicTrackConfig;
  isPlaying: boolean;
  onToggle: () => void;
  externalUrl?: string;
  showExternalLink?: boolean;
}> = ({ music, isPlaying, onToggle, externalUrl, showExternalLink }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const previousSrcRef = useRef<string | null>(null);
  const { setIsPlaying } = useAudioStore();

  // 音轨变化时加载音频
  useEffect(() => {
    if (audioRef.current && music.src) {
      if (music.src !== previousSrcRef.current) {
        previousSrcRef.current = music.src;
        setIsLoaded(false);
        audioRef.current.src = music.src;
        audioRef.current.load();
      }
    }
  }, [music.src]);

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
        onCanPlay={() => setIsLoaded(true)}
        preload="auto"
      />

      {/* 播放/暂停按钮 */}
      <button
        onClick={onToggle}
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

      {/* 外部链接 */}
      {showExternalLink && externalUrl && (
        <>
          <div className="w-px h-4 bg-white/20" />
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
        </>
      )}
    </div>
  );
};

// 主音乐播放器组件
export const MusicPlayer: React.FC = () => {
  const [isSpotifyExpanded, setIsSpotifyExpanded] = useState(false);
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
        type: defaultMusic.type,
        spotifyTrackId: defaultMusic.spotifyTrackId,
        externalUrl: defaultMusic.externalUrl,
      });
    }
  }, [currentTrack, defaultMusic, setCurrentTrack]);

  // 获取当前播放的音乐
  const musicToPlay = currentTrack || defaultMusic;

  // 如果没有音乐配置，不渲染
  if (!musicToPlay) {
    return null;
  }

  // 判断音乐类型
  const isSpotify = musicToPlay.type === 'spotify' && musicToPlay.spotifyTrackId;
  const externalUrl = musicToPlay.externalUrl;

  // Spotify 播放器
  if (isSpotify) {
    return (
      <SpotifyPlayer
        trackId={musicToPlay.spotifyTrackId!}
        isExpanded={isSpotifyExpanded}
        onToggle={() => setIsSpotifyExpanded(!isSpotifyExpanded)}
        externalUrl={externalUrl}
        showExternalLink={musicConfig.showExternalLink}
      />
    );
  }

  // 原生音频播放器
  return (
    <AudioPlayer
      music={musicToPlay}
      isPlaying={isPlaying}
      onToggle={() => setIsPlaying(!isPlaying)}
      externalUrl={externalUrl}
      showExternalLink={musicConfig.showExternalLink}
    />
  );
};
