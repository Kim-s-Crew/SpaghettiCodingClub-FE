'use client';
import { useState } from 'react';
import TrackSelector from '../TrackSelector';

const StudentInfo = () => {
  const [isTrackEditing, setIsTrackEditing] = useState(false);

  return (
    <>
      <div className='flex mb-4 font-bold'>
        {isTrackEditing ? <TrackSelector /> : <span>React 3기</span>}
        <span
          onClick={() => {
            setIsTrackEditing((prev) => !prev);
          }}
          className='text-2xl ml-2 cursor-pointer'
        >
          {isTrackEditing ? '✔' : '✏️'}
        </span>
      </div>
      <div className='flex flex-col'>
        <span>JS 1주차 팀 : 3조 (일주조)</span>
        <span>JS 2주차 팀 : 5조 (달려오조)</span>
        <span>JS 3주차 팀 : 2조 (이렇게하조)</span>
        <span>JS 4주차 팀 : 1조 (일주조)</span>
        <span>JS 5주차 팀 : 3조 (일주조)</span>
        <span>JS 6주차 팀 : 6조 (일주조)</span>
      </div>
    </>
  );
};

export default StudentInfo;
