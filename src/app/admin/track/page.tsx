'use client';

import { Button, Spacer } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import PlusButton from '@/components/ui/PlusButton';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createTrack, getTracks } from '@/apis/track';
import { tracksInfo } from '@/types/types';
import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from '@/components/ui/Modal';

const TrackManage = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [trackTitle, setTrackTitle] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['track'],
    queryFn: getTracks,
    select: (data) => data.payload,
  });

  const { mutate: newTrack } = useMutation({
    mutationFn: createTrack,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'track',
        trackTitle,
      ] as InvalidateQueryFilters);
    },
  });

  if (isLoading) {
    return <>로딩중</>;
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackTitle(e.target.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    newTrack(trackTitle);
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <Modal setIsOpen={setModalOpen} title={'트랙생성'}>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              placeholder='트랙명을 입력하세요'
              value={trackTitle}
              onChange={(e) => changeHandler(e)}
            />
            <button>저장</button>
          </form>
        </Modal>
      )}
      <form className='flex'>
        <Input type='text' placeholder='트랙명 검색' />
        <Button color='danger'>검색</Button>
      </form>
      <div>
        {data.map((track: tracksInfo) => {
          return (
            <div className='flex' key={track.trackId}>
              <div>{track.trackName}</div>
              <span
                className='cursor-pointer'
                onClick={() => setModalOpen(true)}
              >
                ✏️
              </span>
            </div>
          );
        })}
        <Spacer y={10} />
        <PlusButton onClick={openModal} />
      </div>
    </div>
  );
};

export default TrackManage;
