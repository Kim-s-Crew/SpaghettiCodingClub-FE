'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import TrackSelector from '@/components/admin/TrackSelector';
import PlusButton from '@/components/ui/PlusButton';
import { Button, Spacer } from '@nextui-org/react';
import Modal from '@/components/ui/Modal';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createTrackWeek,
  getTrackWeeks,
  updateTrackWeek,
} from '@/apis/trackWeek';
import useStore from '@/zustand/store';
import { newTrackWeekData, tracksWeekInfo } from '@/types/types';

const TrackWeek = () => {
  const queryClient = useQueryClient();
  const { selectedTrack } = useStore((state) => state);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [weekTitle, setWeekTitle] = useState('');
  const [editWeekId, setEditWeekId] = useState<number | null>(null);
  const [weekDate, setWeekDate] = useState({
    startDate: '',
    endDate: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['trackWeek', selectedTrack!.trackId],
    queryFn: () => getTrackWeeks(selectedTrack!.trackId),
    select: (data) => data.payload,
  });

  const { mutate: createTrackMutation } = useMutation({
    mutationFn: createTrackWeek,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackWeek',
        weekTitle,
      ] as InvalidateQueryFilters);
    },
  });

  const { mutate: updateTrackWeekMutation } = useMutation({
    mutationFn: updateTrackWeek,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'track',
        weekTitle,
      ] as InvalidateQueryFilters);
    },
  });

  const trackEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editWeekId !== null) {
      updateTrackWeekMutation({
        trackId: selectedTrack!.trackId,
        // 하드코딩 -> 고쳐야함
        weekId: 1,
        reqData: weekTitle,
      });
    }
    setModalOpen(false);
  };

  if (isLoading) {
    return <>로딩중</>;
  }

  const openModal = (
    mode: 'create' | 'edit',
    trackWeekId?: number,
    weekName?: string,
  ) => {
    setModalMode(mode);
    if (mode === 'edit' && trackWeekId && weekName) {
      setEditWeekId(trackWeekId);
      setWeekTitle(weekName);
    } else {
      setWeekTitle('');
    }
    setModalOpen(true);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setWeekTitle(e.target.value);
  };

  const dateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setWeekDate({ ...weekDate, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reqData = {
      trackId: selectedTrack!.trackId,
      weekName: weekTitle,
      startDate: weekDate.startDate,
      endDate: weekDate.endDate,
    };
    createTrackMutation({
      trackId: selectedTrack!.trackId,
      reqData,
    });
    setModalOpen(false);
  };

  return (
    <section>
      {modalOpen && (
        <Modal
          setIsOpen={setModalOpen}
          title={modalMode === 'create' ? '주차생성' : '주차수정'}
        >
          <form
            onSubmit={modalMode === 'create' ? submitHandler : trackEditHandler}
          >
            <input
              type='text'
              placeholder='주차명을 입력하세요'
              value={weekTitle}
              onChange={(e) => changeHandler(e)}
            />
            {modalMode === 'create' && (
              <div className='flex flex-col'>
                <Spacer y={4} />
                <label htmlFor='startDate'>시작시간</label>
                <input
                  type='date'
                  id='startDate'
                  value={weekDate.startDate}
                  onChange={dateChangeHandler}
                  name='startDate'
                />
                <Spacer y={4} />
                <label htmlFor='endDate'>끝나는 시간</label>
                <input
                  type='date'
                  id='endDate'
                  value={weekDate.endDate}
                  onChange={dateChangeHandler}
                  name='endDate'
                />
                <Spacer y={4} />
              </div>
            )}
            <Button type='submit'>저장</Button>
          </form>
        </Modal>
      )}
      <TrackSelector />
      <Spacer y={10} />
      {data.map((week: tracksWeekInfo) => {
        return (
          <div key={week.trackWeekId} className='flex w-[100%] text-center'>
            <span className='block w-[40%]'>{week.weekName}</span>
            <span className='block w-[20%]'>{week.startDate}</span>
            <span className='block w-[20%]'>{week.endDate}</span>
            <div className='block w-[20%]'>
              <span
                className='cursor-pointer'
                onClick={() =>
                  openModal('edit', week.trackWeekId, week.weekName)
                }
              >
                ✏️
              </span>
            </div>
          </div>
        );
      })}
      <Spacer y={10} />

      <PlusButton onClick={() => openModal('create')} />
    </section>
  );
};

export default TrackWeek;
