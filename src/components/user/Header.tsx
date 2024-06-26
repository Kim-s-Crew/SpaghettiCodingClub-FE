'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import logoutIcon from '@/assets/images/logoutIcon.webp';

import Link from 'next/link';
import { logout } from '@/apis/auth';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/zustand/store';
import { useQueryClient } from '@tanstack/react-query';
import { currentUserRawData } from '@/types/types';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<currentUserRawData>([
    'loggedInUser',
  ]);
  const userName = currentUser?.payload.username;

  const { setIsLoggedIn } = useAuthStore();
  const HandleLogout = () => {
    logout();
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') router.replace('/');
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'bg-gray-200' : '';
  };

  return (
    <header className='flex flex-col justify-center items-center bg-peach w-[200px] min-w-[200px] h-screen p-6'>
      <div className='mb-8'>
        <Link href={'/'}>
          {' '}
          <Image src={logo} alt='logo' width={200} height={100} />
        </Link>
      </div>
      <div className='flex flex-col justify-between items-center flex-1'>
        <ul className='flex flex-col items-center gap-2 font-bold'>
          <li className={isActive('/user/notice')}>
            <Link href={'/user/notice'}>공지게시판</Link>
          </li>
          <li className={isActive('/user/schedule')}>
            <Link href={'/user/schedule'}>팀 일정</Link>
          </li>
        </ul>
        <div>
          <Link href={'/user/mypage'}>
            <span>{userName} 님</span>
          </Link>

          <span className='text-3xl cursor-pointer' onClick={HandleLogout}>
            <Image src={logoutIcon} alt='logo' width={40} height={50} />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
