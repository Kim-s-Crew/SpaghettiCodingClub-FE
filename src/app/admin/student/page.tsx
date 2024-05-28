'use client';
import { Button } from '@nextui-org/react';
import { getStudent } from '@/apis/student';
import React, { useEffect, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// const TempComponent = async () => {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/todos/1',
//   );
//   console.log('이거', response);

//   let promise = new Promise((resolve, reject) => {
//     // 비동기 작업 수행
//     let success = true; // 예시로 성공 여부를 나타내는 변수

//     if (success) {
//       resolve('작업이 성공했습니다!'); // 작업이 성공하면 resolve 호출
//     } else {
//       reject('작업이 실패했습니다.'); // 작업이 실패하면 reject 호출
//     }
//   });

//   console.log(promise);

//   return <div>{response.data.title}</div>;
// };

const Student = () => {
  const { data, error } = useQuery({
    queryKey: ['allStudent'],
    queryFn: getStudent,
  });
  // useEffect(() => {
  //   console.log(data, error);
  // }, [data, error]);

  // if (error) {
  //   return <>데이터를 조회 오류</>;
  // }

  console.log(data);

  return (
    <div>
      <Button>조회</Button>
      {/* <Suspense fallback={<h1>로딩중</h1>}>
        <TempComponent />
        <p>{data}</p>
      </Suspense> */}
    </div>
  );
};

export default Student;
