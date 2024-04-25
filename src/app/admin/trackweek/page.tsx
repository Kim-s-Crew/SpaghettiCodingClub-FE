'use client';
import React from 'react';
import TrackSelector from '@/components/admin/TrackSelector';
import PlusButton from '@/components/ui/PlusButton';
import { Spacer } from '@nextui-org/react';

const TrackWeek = () => {
  const dummyTrackWeek = [
    {
      title: '1주차 - 미니프로젝트 주차',
      startTime: '2024-04-15',
      endTime: '2024-04-25',
    },
    {
      title: '2주차 - JS 문법종합 주차',
      startTime: '2024-04-26',
      endTime: '2024-05-10',
    },
    {
      title: '3주차 - JS 문법 심화 주차',
      startTime: '2024-05-11',
      endTime: '2024-05-30',
    },
    {
      title: '4주차 - React 입문 주차',
      startTime: '2024-06-01',
      endTime: '2024-06-15',
    },
  ];

  const editHandler = () => {
    console.log('수정버튼 눌림');
    // 트랙 수정 로직
  };
  const deleteHandler = () => {
    console.log('삭제버튼 눌림');
    // 서버로 이 트랙 삭제하라는 요청을 보내는 코드
  };

  return (
    <section>
      <TrackSelector />
      <Spacer y={10} />
      {dummyTrackWeek.map((item) => {
        return (
          <div key={item.title} className='flex w-[100%] text-center'>
            <span className='block w-[40%]'>{item.title}</span>
            <span className='block w-[20%]'>{item.startTime}</span>
            <span className='block w-[20%]'>{item.endTime}</span>
            <div className='block w-[20%]'>
              <span className='cursor-pointer' onClick={editHandler}>
                ✏️
              </span>
              <span className='cursor-pointer' onClick={deleteHandler}>
                ❌
              </span>
            </div>
          </div>
        );
      })}
      <Spacer y={10} />

      <PlusButton />
    </section>
  );
};

export default TrackWeek;
