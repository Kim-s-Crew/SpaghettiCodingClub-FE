'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import Link from 'next/link';
import { logout } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/store';
import { useQueryClient } from '@tanstack/react-query';
import useRole from '@/hooks/useRole';

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuthStore();

  const HandleLogout = () => {
    logout();
    setIsLoggedIn(false);
    queryClient.removeQueries({ queryKey: ['loggedInUser'] });
    if (typeof window !== 'undefined') router.replace('/');
  };

  const role = useRole();
  console.log(role);
  if (role && role !== 'ADMIN') {
    if (typeof window !== 'undefined') router.replace('/user/askadmin');
  }

  return (
    <header className='flex flex-col justify-center items-center bg-slate-400 w-[200px] min-w-[200px] h-screen p-6'>
      <div className='mb-8'>
        <Link href={'/'}>
          <Image src={logo} alt='logo' width={200} height={100} />
        </Link>
      </div>
      <div className='flex flex-col justify-between items-end flex-1'>
        <ul className='flex flex-col items-center gap-2 font-bold'>
          <li>
            <Link href={'/'}>팀 빌딩</Link>
          </li>
          <li>
            <Link href={'/admin/student'}>수강생 관리</Link>
          </li>
          <li>
            <Link href={'/admin/student/userId'}>수강생 상세</Link>
          </li>
          <li>
            <Link href={'/admin/track'}>트랙 관리</Link>
          </li>
          <li>
            <Link href={'/admin/trackweek'}>주차 관리</Link>
          </li>
          <li>
            <Link href={'/admin/notice'}>공지사항 관리</Link>
          </li>
          <li>
            <Link href={'/admin/schedule'}>일정 관리</Link>
          </li>
          <li>
            <Link href={'/admin/teambuilding'}>팀 빌딩</Link>
          </li>
        </ul>
        <div>
          <span className='text-3xl cursor-pointer' onClick={HandleLogout}>
            🚪
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
