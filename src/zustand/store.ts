import { trackWeekData } from '@/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Store {
  selectedTrack: {
    trackId: number;
    trackName: string;
  } | null;
  selectedTrackWeek: trackWeekData | null; // 새로운 속성 추가
  setTrack: (track: { trackId: number; trackName: string }) => void;
  setTrackWeek: (selectedTrackWeek: trackWeekData) => void; // 새로운 액션 추가
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        selectedTrack: null,
        selectedTrackWeek: null, // 초기값 설정
        setTrack: (track) => set({ selectedTrack: track }),
        setTrackWeek: (week) => set({ selectedTrackWeek: week }), // 액션 구현
      }),
      // localStorage key 이름
      { name: 'selectedTrack' },
    ),
  ),
);

export default useStore;
