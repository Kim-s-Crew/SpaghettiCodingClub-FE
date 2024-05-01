'use client';
import useStore from '@/zustand/store';
import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const TrackSelector = () => {
  const dummyTrack = [
    { trackName: 'React 3기' },
    { trackName: 'Spring 3기' },
    { trackName: 'Spring 4기' },
    { trackName: 'React 4기' },
    { trackName: 'Spring 5기' },
  ];

  const { setTrack, selectedTrack } = useStore((state) => state);
  // const setTrack = useStore(state=> state.setTrack)
  console.log('전역변수니?', selectedTrack);

  return (
    <Select
      placeholder='트랙선택'
      aria-label='track-selector'
      onChange={(e) => {
        setTrack(e.target.value);
      }}
      selectedKeys={[selectedTrack]}
    >
      {dummyTrack.map((track) => (
        <SelectItem key={track.trackName} value={track.trackName}>
          {track.trackName}
        </SelectItem>
      ))}
    </Select>
  );
};

export default TrackSelector;
