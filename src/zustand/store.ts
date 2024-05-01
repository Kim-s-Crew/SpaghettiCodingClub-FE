import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Store {
  selectedTrack: string;
  setTrack: (arg0: string) => void;
}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        selectedTrack: '',
        setTrack: (track) => set(() => ({ selectedTrack: track })),
      }),
      // localStorage key 이름
      { name: 'selectedTrack' }
    )
  )
);

export default useStore;
