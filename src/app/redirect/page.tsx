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
    refetchOnMount: true,
  });

  // let role;
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

  // console.log('리디렉 롤', role);

  if (isLoading) {
    return <SpinnerModal message='로그인 중입니다.' />;
  }

  // if (role === 'ADMIN') {
  //   router.replace('/admin');
  // } else {
  //   router.replace('/user');
  // }

  return <div>RedirectPage</div>;
};

export default RedirectPage;
