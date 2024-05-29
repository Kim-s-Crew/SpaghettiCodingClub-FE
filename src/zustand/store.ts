import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Store {
  selectedTrack: {
    trackId: number;
    trackName: string;
  } | null;
  setTrack: (track: { trackId: number; trackName: string }) => void;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        selectedTrack: { trackId: 99, trackName: 'placeholder track' },
        setTrack: (track) => set({ selectedTrack: track }),
      }),
      // localStorage key 이름
      { name: 'selectedTrack' },
    ),
  ),
);

export default useStore;
