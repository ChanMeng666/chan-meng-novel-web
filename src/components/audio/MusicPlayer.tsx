import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
} from 'lucide-react';
import { useAudioStore } from '@/stores';
import { cn } from '@/lib/utils';

// 默认音乐 - 战士阿花
const DEFAULT_MUSIC = {
  id: 'music-main',
  title: '战士阿花',
  src: 'https://cdn1.suno.ai/7cd0994c-c606-4135-bdd0-2f9f8fb617d3.mp3',
};

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {
    isPlaying,
    volume,
    isMuted,
    currentTrack,
    setIsPlaying,
    setVolume,
    toggleMute,
    setCurrentTrack,
  } = useAudioStore();

  // 使用默认音乐或当前音轨
  const activeTrack = currentTrack || DEFAULT_MUSIC;

  // 初始化时设置默认音乐
  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack(DEFAULT_MUSIC);
    }
  }, [currentTrack, setCurrentTrack]);

  // 音量变化
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // 音轨变化时加载音频
  useEffect(() => {
    if (audioRef.current && activeTrack) {
      setIsLoaded(false);
      setHasError(false);
      audioRef.current.src = activeTrack.src;
      audioRef.current.load();
    }
  }, [activeTrack]);

  // 播放/暂停状态变化
  useEffect(() => {
    if (audioRef.current && isLoaded) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log('Play was prevented:', e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isLoaded, setIsPlaying]);

  const handlePlayPause = () => {
    if (hasError) return;
    setIsPlaying(!isPlaying);
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    console.error('Audio load error');
    setHasError(true);
    setIsPlaying(false);
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        loop
        onCanPlay={handleCanPlay}
        onError={handleError}
        preload="auto"
      />

      {/* 播放/暂停按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full h-8 w-8",
          isPlaying && "music-playing"
        )}
        onClick={handlePlayPause}
        title={isPlaying ? '暂停' : '播放'}
        disabled={hasError || !isLoaded}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>

      {/* 当前曲目 */}
      <div className="hidden sm:flex items-center gap-2 text-sm">
        <Music className="w-4 h-4 text-amber-600" />
        <span className="max-w-24 truncate text-gray-700">
          {hasError ? '加载失败' : (isLoaded ? activeTrack.title : '加载中...')}
        </span>
      </div>

      {/* 音量控制 */}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full h-8 w-8"
        onClick={toggleMute}
        title={isMuted ? '取消静音' : '静音'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4" />
        )}
      </Button>

      <Slider
        className="w-16"
        value={[isMuted ? 0 : volume * 100]}
        max={100}
        step={1}
        onValueChange={([val]) => setVolume(val / 100)}
      />
    </div>
  );
};
