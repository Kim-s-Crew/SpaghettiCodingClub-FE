import { Spacer } from '@nextui-org/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, setIsOpen }: Props) => {
  const modalCloser = () => {
    setIsOpen(false);
  };
  return (
    <div
      className={`w-[100%] h-[100%] fixed top-0 left-0 z-10 flex justify-center items-center`}
    >
      <div
        className={`z-20 bg-white rounded-md flex flex-col justify-center items-center p-10 relative`}
      >
        {children}
        <span
          className='absolute top-3 right-3 cursor-pointer'
          onClick={modalCloser}
        >
          ❌
        </span>
      </div>
      <div
        onClick={modalCloser}
        className='absolute w-[100%] h-[100%] bg-gray-900 opacity-50'
      ></div>
    </div>
  );
};

export default Modal;
