'use client';

import { Button, Spacer } from '@nextui-org/react';
import TrackSelector from '@/components/admin/TrackSelector';

import Link from 'next/link';
import useStore from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { getTrackNotices } from '@/apis/trackNotice';
import { noticeData } from '@/types/types';

const Notice = () => {
  const { selectedTrack } = useStore((state) => state);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trackNotices'],
    queryFn: () => getTrackNotices(selectedTrack!.trackId),
    enabled: !!selectedTrack,
    select: (data) => data.payload,
  });
  console.log(data);

  if (isLoading) {
    return <>로딩중</>;
  }

  const dummyNotice = [
    {
      title: '중요한 공지',
      content: '내용을 입력하세요. 이 부분은 중요한 내용입니다.',
      time: '2024-04-24',
    },
    {
      title: '이번 주 이벤트 안내',
      content: '이번 주에는 특별 이벤트가 있습니다. 참여해주세요!',
      time: '2024-04-24',
    },
    {
      title: '서비스 업데이트 안내',
      content: '새로운 기능과 개선 사항이 포함된 업데이트가 출시되었습니다.',
      time: '2024-04-24',
    },
    {
      title: '시스템 점검 안내',
      content: '시스템 점검으로 인해 일시적으로 서비스가 중단될 예정입니다.',
      time: '2024-04-24',
    },
    {
      title: '웹사이트 보안 강화',
      content: '보안을 강화하기 위한 조치가 이루어질 예정입니다. 감사합니다.',
      time: '2024-04-24',
    },
  ];

  return (
    <div>
      <TrackSelector />
      <Button onClick={() => refetch()}>조회</Button>
      <ul>
        {data.map((notice: noticeData) => {
          return (
            <li
              className='flex justify-between w-[1000px]'
              key={notice.noticeId}
            >
              <Link href={`/admin/notice/${notice.noticeId}`}>
                {notice.trackNoticeTitle}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link href={'/admin/notice/write'}>
        <Button color='warning'>글쓰기</Button>
      </Link>
    </div>
  );
};

export default Notice;
