import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex flex-col justify-center items-center bg-slate-400 w-[200px] h-screen p-6'>
      <div className='mb-8'>
        <Link href={'/'}>
          {' '}
          <Image src={logo} alt='logo' width={200} height={100} />
        </Link>
      </div>
      <div className='flex flex-col justify-between items-end flex-1'>
        <ul className='flex flex-col items-center gap-2'>
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
          <span className='text-3xl'>🚪</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
