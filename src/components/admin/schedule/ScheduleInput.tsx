import { Button, Input, Spacer, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  selectedDate: string;
}

const ScheduleInput = ({ selectedDate }: Props) => {
  const [inputs, setInputs] = useState({
    content: '',
    startTime: '',
    endTime: '',
  });
  const { content, startTime, endTime } = inputs;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (startTime > endTime) {
      Swal.fire('시간을 제대로 입력하세요');

      return;
    }
    return { content, startTime, endTime };
  };

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  console.log(inputs);
  return (
    <form className='flex flex-col justify-center' onSubmit={handleSubmit}>
      <h1 className='font-bold text-2xl text-center'>{selectedDate}</h1>
      <Spacer y={10} />
      <div className='flex flex-col'>
        <label htmlFor='startTime'>시작시간</label>
        <input
          type='time'
          id='startTime'
          placeholder='Password'
          value={startTime}
          onChange={HandlerChange}
          name='startTime'
        />
        <Spacer y={4} />
        <label htmlFor='endTime'>끝나는 시간</label>
        <input
          type='time'
          id='endTime'
          placeholder='Password'
          value={endTime}
          onChange={HandlerChange}
          name='endTime'
        />
        <Spacer y={10} />
      </div>
      <Textarea
        type='text'
        id='content'
        maxLength={150}
        placeholder='content'
        value={content}
        onChange={HandlerChange}
        name='content'
      />
      <Spacer y={10} />
      <Button type='submit' color='danger'>
        저장
      </Button>
    </form>
  );
};

export default ScheduleInput;
