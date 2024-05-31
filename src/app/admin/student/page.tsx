'use client';
import { Button } from '@nextui-org/react';
import { getStudents } from '@/apis/student';
import React, { useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import TrackSelector from '@/components/admin/TrackSelector';
import useStore from '@/zustand/store';
import { personData } from '@/types/types';
import Link from 'next/link';

const Student = () => {
  const { selectedTrack } = useStore((state) => state);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allStudent'],
    queryFn: () => getStudents(selectedTrack!.trackId),
    enabled: !!selectedTrack,
    select: (data) => data.payload,
  });
  console.log(data);

  if (isLoading) {
    return <>로딩중</>;
  }

  // console.log(data.payload);

  return (
    <div>
      <TrackSelector />
      <Button onClick={() => refetch()}>조회</Button>
      <ul>
        {data.map((person: personData) => (
          <li key={person.userId}>
            <Link href={`/admin/student/${person.userId}`}>
              {person.userName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;
