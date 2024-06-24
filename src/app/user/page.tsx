'use client';
import { getTracks } from '@/apis/track';
import { useUserStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import NoticeSection from '@/components/user/notice/NoticeSection';
import TeamSection from '@/components/user/team/TeamSection';
import { Spacer } from '@nextui-org/react';
import { getLoggedInUserData } from '@/apis/auth';
import { currentUserData } from '@/types/types';

const UserPage = () => {
  const { track } = useUserStore();
  console.log(track);

  const { data } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload as currentUserData,
    gcTime: 0,
  });

  return (
    <div>
      <NoticeSection />
      <Spacer y={6} />
      <TeamSection />
    </div>
  );
};

export default UserPage;
