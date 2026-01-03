import { create } from 'zustand';
import { AudioState, MusicTrack } from '@/types';

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  volume: 0.5,
  isMuted: false,
  currentTrack: null,
  autoPlay: true,

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setCurrentTrack: (track: MusicTrack | null) => set({ currentTrack: track }),
  setAutoPlay: (auto) => set({ autoPlay: auto }),
}));
