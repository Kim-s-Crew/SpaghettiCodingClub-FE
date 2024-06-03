'use client';

import { getTrackWeeks } from '@/apis/trackWeek';
import { tracksWeekInfo } from '@/types/types';
import useStore from '@/zustand/store';
import { Select, SelectItem } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const WeekSelector = () => {
  const { setTrackWeek, selectedTrackWeek } = useStore((state) => state);

  const { selectedTrack } = useStore((state) => state);

  const { data, isLoading } = useQuery({
    queryKey: ['allTrackWeeks'],
    queryFn: () => getTrackWeeks(selectedTrack?.trackId!),
  });

  console.log(data);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <Select
      placeholder='주차선택'
      aria-label='week-selector'
      onChange={(e) => {
        console.log('여기', e.target.value);
        let targetName = e.target.value;
        const result = data.payload.find(
          (trackWeek: tracksWeekInfo) => trackWeek.weekName === targetName,
        );
        console.log(result);

        setTrackWeek(result);
      }}
      selectedKeys={[selectedTrackWeek!]}
    >
      {data.payload.map((trackWeek: tracksWeekInfo) => (
        <SelectItem key={trackWeek.weekName}>{trackWeek.weekName}</SelectItem>
      ))}
    </Select>
  );
};

export default WeekSelector;
