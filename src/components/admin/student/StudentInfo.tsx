'use client';
import { useState } from 'react';
import TrackSelector from '../TrackSelector';

const StudentInfo = ({ trackName, trackWeeks }) => {
  const [isTrackEditing, setIsTrackEditing] = useState(false);
  console.log(trackName, trackWeeks);
  return (
    <>
      <div className='flex mb-4 font-bold'>
        {isTrackEditing ? <TrackSelector /> : <span>{trackName}</span>}
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
        {/* <span>JS 1주차 팀 : 3조 (일주조)</span>
        <span>JS 2주차 팀 : 5조 (달려오조)</span>
        <span>JS 3주차 팀 : 2조 (이렇게하조)</span>
        <span>JS 4주차 팀 : 1조 (일주조)</span>
        <span>JS 5주차 팀 : 3조 (일주조)</span>
        <span>JS 6주차 팀 : 6조 (일주조)</span> */}
        {trackWeeks?.map((item) => (
          <p key={item.trackWeekId}>{item.weekName}</p>
        ))}
      </div>
    </>
  );
};

export default StudentInfo;
