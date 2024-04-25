import StudentComment from '@/components/admin/student/StudentComment';
import StudentInfo from '@/components/admin/student/StudentInfo';

import { Button, Divider } from '@nextui-org/react';

const UserId = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>김미희</h2>
      <StudentInfo />
      <Divider className='my-6' />
      <StudentComment title={'학습'} />
      <Divider className='my-6' />
      <StudentComment title={'배경'} />
      <Divider className='my-6' />
      <StudentComment title={'관계'} />
      <Divider className='my-6' />
      <Button color='danger'>수강생 삭제</Button>
    </div>
  );
};

export default UserId;
