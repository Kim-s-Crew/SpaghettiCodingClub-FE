'use client';
import { getLoggedInUserData } from '@/apis/auth';
import { currentUserData } from '@/types/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import SpinnerModal from '@/components/ui/SpinnerModal';
import React, { useEffect, useState } from 'react';

const RedirectPage = () => {
  // const [role, setRole] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: loggedInUser, isLoading } = useQuery({
    queryKey: ['loggedInUser', sessionStorage.getItem('token')],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload as currentUserData,
  });

  // let role;

  useEffect(() => {
    if (!isLoading && loggedInUser) {
      if (loggedInUser.role === 'ADMIN') {
        router.replace('/admin/student');
      } else {
        router.replace('/user');
      }
    }
  }, [isLoading, loggedInUser, router]);

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
