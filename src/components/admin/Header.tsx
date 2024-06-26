'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import Link from 'next/link';
import { logout } from '@/apis/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/store';
import { useQueryClient } from '@tanstack/react-query';
import useRole from '@/hooks/useRole';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log(pathname);
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

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'bg-gray-200' : '';
  };

  return (
    <header className='flex flex-col justify-center items-center bg-peach w-[200px] min-w-[200px] h-screen p-6'>
      <div className='mb-8'>
        <Link href={'/'}>
          <Image src={logo} alt='logo' width={200} height={100} />
        </Link>
      </div>
      <div className='flex flex-col justify-between items-end flex-1'>
        <ul className='flex flex-col items-center gap-2 font-bold'>
          <li className={isActive('/admin/student')}>
            <Link href={'/admin/student'}>수강생 관리</Link>
          </li>

          <li className={isActive('/admin/track')}>
            <Link href={'/admin/track'}>트랙 관리</Link>
          </li>
          <li className={isActive('/admin/trackweek')}>
            <Link href={'/admin/trackweek'}>주차 관리</Link>
          </li>
          <li className={isActive('/admin/notice')}>
            <Link href={'/admin/notice'}>공지사항 관리</Link>
          </li>
          <li className={isActive('/admin/teambuilding')}>
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
