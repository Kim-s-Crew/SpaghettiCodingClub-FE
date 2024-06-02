'use client';
import { useState } from 'react';
import TrackSelector from '../TrackSelector';
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { changeTrack } from '@/apis/student';
import { useParams } from 'next/navigation';
import useStore from '@/zustand/store';

interface Props {
  trackName: string;
  trackWeeks: string;
}

const StudentInfo = ({ trackName, trackWeeks }: Props) => {
  const queryClient = useQueryClient();
  const param = useParams();
  const { userId } = param;
  const [isTrackEditing, setIsTrackEditing] = useState(false);
  const { selectedTrack } = useStore((state) => state);

  const { mutate: updateTrackMutation } = useMutation({
    mutationFn: changeTrack,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'userData',
      ] as InvalidateQueryFilters);
    },
  });

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
          {isTrackEditing ? (
            <span
              onClick={() =>
                updateTrackMutation({
                  userId: +userId,
                  oldTrackId: 5, // 이부분 수정해야함!!!!
                  newTrackId: selectedTrack!.trackId,
                })
              }
            >
              ✔
            </span>
          ) : (
            <span>✏️</span>
          )}
        </span>
      </div>
      <div className='flex flex-col'>
        {/* 이부분 trackweek api 완료되면 추가할것. 사용자가 참여해온 trackweek 목록+팀을 보여줄것. */}
        {/* {trackWeeks?.map((item) => (
          <p key={item.trackWeekId}>{item.weekName}</p>
        ))} */}
      </div>
    </>
  );
};

export default StudentInfo;
