'use client';
import { Button } from '@nextui-org/react';
import { getStudent } from '@/apis/student';
import React, { useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import TrackSelector from '@/components/admin/TrackSelector';

const Student = () => {
  // const { data, error } = useQuery({
  //   queryKey: ['allStudent'],
  //   queryFn: getStudent,
  // });
  // useEffect(() => {
  //   console.log(data, error);
  // }, [data, error]);

  // if (error) {
  //   return <>데이터를 조회 오류</>;
  // }

  // console.log(data);

  return (
    <div>
      <TrackSelector />
      <Button onClick={() => getStudent()}>조회</Button>
      {/* <Suspense fallback={<h1>로딩중</h1>}>
        <TempComponent />
        <p>{data}</p>
      </Suspense> */}
    </div>
  );
};

export default Student;
