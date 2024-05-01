'use client';
import TrackSelector from '@/components/admin/TrackSelector';
import { Input, Spacer, Textarea, Button, Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Notice {
  title: string;
  content: string;
}

const NoticeWritePage = () => {
  const router = useRouter();
  const [notice, setNotice] = useState<Notice>({
    title: '',
    content: '',
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotice({ ...notice, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(notice);
  };

  const cancelHandler = () => {
    router.back();
  };

  return (
    <section>
      <h1 className='text-3xl text-center font-bold'>공지 작성</h1>
      <Spacer y={10} />
      <form onSubmit={submitHandler}>
        <TrackSelector />
        <Spacer y={4} />
        <Divider />
        <Spacer y={4} />
        <div>
          <Input
            type='text'
            name='title'
            label='Title'
            aria-label='Title'
            placeholder='제목을 입력하세요'
            labelPlacement='outside'
            onChange={changeHandler}
            value={notice?.title}
          />
        </div>

        <Spacer y={4} />
        <Textarea
          name='content'
          label='Content'
          aria-label='Content'
          placeholder='내용을 입력하세요'
          minRows={10}
          labelPlacement='outside'
          value={notice?.content}
          onChange={changeHandler}
        />

        <Spacer y={6} />
        <div className='text-right'>
          <Button className='mr-2' type='button' onClick={cancelHandler}>
            돌아가기
          </Button>
          <Button color='danger' type='submit'>
            글쓰기
          </Button>
        </div>
      </form>
    </section>
  );
};

export default NoticeWritePage;
