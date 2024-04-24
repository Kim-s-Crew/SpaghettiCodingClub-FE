'use client';
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

  return (
    <Select placeholder='트랙선택'>
      {dummyTrack.map((track) => (
        <SelectItem key={track.trackName} value={track.trackName}>
          {track.trackName}
        </SelectItem>
      ))}
    </Select>
  );
};

export default TrackSelector;
