'use client';
import { Textarea } from '@nextui-org/react';
import { useState } from 'react';

type Props = {
  title: string;
};

const StudentComment = ({ title }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const isEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      <div>
        <div className='flex mb-4 font-bold'>
          <h3 className='mr-1'>{title}</h3>
          <span onClick={isEdit} className='cursor-pointer'>
            {isEditing ? '✔' : '✏️'}
          </span>
        </div>
      </div>
      <div>
        <Textarea placeholder='내용을 입력하세요' isDisabled={!isEditing} />
      </div>
    </>
  );
};

export default StudentComment;
