import { trackWeekData } from '@/types/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TrackStore {
  selectedTrack: {
    trackId: number;
    trackName: string;
  } | null;
  selectedTrackWeek: trackWeekData | null; // 새로운 속성 추가
  setTrack: (track: { trackId: number; trackName: string }) => void;
  setTrackWeek: (selectedTrackWeek: trackWeekData) => void; // 새로운 액션 추가
}

interface AuthStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (auth: boolean) => void; // 새로운 액션 추가
}

export const useTrackStore = create<TrackStore>()(
  devtools(
    persist(
      (set) => ({
        selectedTrack: { trackId: 0, trackName: 'placeholder track' },
        selectedTrackWeek: {
          trackWeekId: 0,
          weekName: 'placeholder week',
          startDate: '',
          endDate: '',
        }, // 초기값 설정
        setTrack: (track) => set({ selectedTrack: track }),
        setTrackWeek: (week) => set({ selectedTrackWeek: week }), // 액션 구현
      }),
      // localStorage key 이름
      { name: 'Track' },
    ),
  ),
);

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        setIsLoggedIn: (auth) => set({ isLoggedIn: auth }), // 액션 구현
      }),
      // localStorage key 이름
      { name: 'Auth' },
    ),
  ),
);
