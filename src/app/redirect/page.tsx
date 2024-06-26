'use client';
import { getLoggedInUserData } from '@/apis/auth';
import { currentUserData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import SpinnerModal from '@/components/ui/SpinnerModal';
import React, { useEffect } from 'react';

const RedirectPage = () => {
  const router = useRouter();

  const {
    data: loggedInUser,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload as currentUserData,
    staleTime: 0,
  });

  if (isFetching) {
    return <SpinnerModal message='로딩중' />;
  }

  if (!isLoading && loggedInUser) {
    if (loggedInUser.role === 'ADMIN') {
      router.replace('/admin/student');
    } else {
      router.replace('/user');
    }
  }

  if (isLoading) {
    return <SpinnerModal message='로그인 중입니다.' />;
  }

  return <div>RedirectPage</div>;
};

export default RedirectPage;
