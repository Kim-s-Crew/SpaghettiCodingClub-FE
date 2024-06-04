import Header from '@/components/admin/Header';

export default function AdminLayout({
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
