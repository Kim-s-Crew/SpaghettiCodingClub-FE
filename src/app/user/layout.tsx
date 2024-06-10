import Header from '@/components/user/Header';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <Header />
      <div className='w-screen py-10 px-6 flex justify-center'>
        <div className='w-full max-w-[800px]'>{children}</div>
      </div>
    </div>
  );
}
