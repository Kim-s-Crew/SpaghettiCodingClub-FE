'use client';

import { deleteTrackNotice, getTrackNotice } from '@/apis/trackNotice';
import useStore from '@/zustand/store';
import { Button } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const NoticeDetailPage = () => {
  const queryClient = useQueryClient();
  const { selectedTrack } = useStore((state) => state);
  const params = useParams();
  const router = useRouter();
  const { noticeId } = params;

  const { data, isLoading } = useQuery({
    queryKey: ['trackNotice', noticeId],
    queryFn: () => getTrackNotice(selectedTrack!.trackId, +noticeId),
    enabled: !!noticeId,
    select: (data) => data.payload,
  });

  const { mutate: removeNoticeMutation } = useMutation({
    mutationFn: deleteTrackNotice,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackNotice',
      ] as InvalidateQueryFilters);
      router.replace('/admin/notice');
    },
  });

  if (isLoading) {
    return <>로딩중</>;
  }

  const removeNotice = (trackId: number, noticeId: number) => {
    removeNoticeMutation({ trackId, noticeId });
  };

  return (
    <div>
      <h1 className='text-2xl font-bold'>{data.trackNoticeTitle}</h1>
      <p>{data.trackNoticeContent}</p>
      <Button>수정</Button>
      <Button onClick={() => removeNotice(selectedTrack!.trackId, +noticeId)}>
        삭제
      </Button>
    </div>
  );
};

export default NoticeDetailPage;
