import React, { useRef, useEffect } from 'react';
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

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    isPlaying,
    volume,
    isMuted,
    currentTrack,
    setIsPlaying,
    setVolume,
    toggleMute,
  } = useAudioStore();

  // 音量变化
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // 音轨变化
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log('Auto-play was prevented:', e);
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, setIsPlaying]);

  // 播放/暂停状态变化
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch((e) => {
          console.log('Play was prevented:', e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, setIsPlaying]);

  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  // 如果没有音轨，不显示播放器
  if (!currentTrack) {
    return null;
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} loop />

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
          {currentTrack.title}
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
