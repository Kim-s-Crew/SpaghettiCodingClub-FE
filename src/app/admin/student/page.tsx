'use client';
import { Button } from '@nextui-org/react';
import { getStudent } from '@/apis/student';
import React, { useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import TrackSelector from '@/components/admin/TrackSelector';
import useStore from '@/zustand/store';
import { personData } from '@/types/types';

const Student = () => {
  const { selectedTrack } = useStore((state) => state);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allStudent'],
    queryFn: () => getStudent(selectedTrack!.trackId),
    enabled: !!selectedTrack,
    select: (data) => data.payload,
  });
  console.log(data);
  // useEffect(() => {
  //   console.log(data, isLoading);
  // }, [data, error]);

  if (isLoading) {
    return <>로딩중</>;
  }

  // console.log(data.payload);

  return (
    <div>
      <TrackSelector />
      <Button onClick={() => refetch()}>조회</Button>
      {/* <Suspense fallback={<h1>로딩중</h1>}>
        <TempComponent />
        <p>{data}</p>
      </Suspense> */}
      <ul>
        {data.map((person: personData) => (
          <li key={person.userId}>{person.userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Student;
