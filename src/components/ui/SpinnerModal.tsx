import { Spacer, Spinner } from '@nextui-org/react';
import React from 'react';

interface Props {
  message: string;
}

const Modal = ({ message }: Props) => {
  return (
    <div
      className={`w-[100%] h-[100%] fixed top-0 left-0 z-10 flex justify-center items-center`}
    >
      <div
        className={`z-20 
         rounded-md w-[300px] h-[200px] flex flex-col justify-center items-center opacity-100 absolute bg-opacity-100`}
      >
        <Spinner size='lg' />
        <Spacer y={10} />
        <p>{message}</p>
      </div>
      <div className='absolute w-[100%] h-[100%] bg-gray-900 opacity-50'></div>
    </div>
  );
};

export default Modal;
