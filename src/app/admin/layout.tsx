import Header from '@/components/admin/Header';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <Header />
      <div className='w-screen p-10'>{children}</div>
    </div>
  );
}
