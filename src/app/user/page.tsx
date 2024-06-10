'use client';
import { getTracks } from '@/apis/track';
import { useUserStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';

const UserPage = () => {
  const { track } = useUserStore();
  console.log(track);

  return <div>으아악</div>;
};

export default UserPage;
