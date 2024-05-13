'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import nbcIcon from '@/assets/images/spaghetti_logo.png';
import { Button, Checkbox, Input, Select, SelectItem } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  selectedTrack: string;
  isAdmin: boolean;
  recommend: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const selectItems = [{ value: 'react 3rd' }, { value: 'vue 3rd' }];
  const [inputs, setInputs] = useState({
    track: '',
    isAdmin: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });

  const watchName = watch('name');
  const watchEmail = watch('email');
  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');
  const watchRecommend = watch('recommend');

  const registerHandler: SubmitHandler<FormValues> = (formData) => {
    const {
      name,
      email,
      password,
      selectedTrack,
      confirmPassword,
      isAdmin,
      recommend,
    } = formData;

    const newUser = {
      ...formData,
      track: inputs.track,
      isAdmin: inputs.isAdmin,
    };

    console.log(newUser);
  };

  const inputHandler = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const inputCheckHandler = (e: any) => {
    console.log(e);
    setInputs({ ...inputs, [e.target.name]: e.target.checked });
  };

  const cancelRegister = () => {
    console.log('회원가입취소');
    router.replace('/');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <Image src={nbcIcon} alt='이미지' width={800} height={400} />
      </div>
      <form
        className='flex flex-col gap-2 justify-center pr-10 items-center w-[600px]'
        onSubmit={handleSubmit(registerHandler)}
      >
        <Input
          aria-label='이름'
          type='text'
          placeholder='name'
          {...register('name', {
            required: '이름을 입력하세요',
            pattern: {
              value: /^[가-힣a-zA-Z]*$/,
              message: '올바른 이름으로 입력해주세요',
            },
          })}
        />
        {errors.name && (
          <p className='text-red-500 text-xs text-center'>
            {errors.name.message}
          </p>
        )}
        <Input
          aria-label='이메일'
          type='text'
          placeholder='email'
          {...register('email', {
            required: '이메일을 입력하세요',
            pattern: {
              value: /^\S+@\S+$/i,
              message: '올바른 메일 형식이 아닙니다',
            },
          })}
        />
        {errors.email && (
          <p className='text-red-500 text-xs text-center'>
            {errors.email.message}
          </p>
        )}
        <Input
          aria-label='비밀번호'
          type='password'
          placeholder='password'
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
              message: '비밀번호는 영문, 숫자 포함 최소 8자 이상 입력해주세요',
            },
          })}
        />
        {errors.password && (
          <p className='text-red-500 text-xs text-center'>
            {errors.password.message}
          </p>
        )}
        <Input
          aria-label='비밀번호 재확인'
          type='password'
          placeholder='confirmPassword'
          {...register('confirmPassword', {
            required: '비밀번호를 입력해주세요',
            validate: (value) => value === watchPassword,
          })}
        />
        {errors.confirmPassword && (
          <p className='text-red-500 text-xs text-center'>
            {errors.confirmPassword.message}
          </p>
        )}
        {errors.confirmPassword &&
          errors.confirmPassword.type === 'validate' && (
            <p className='text-red-500 text-xs text-center'>
              비밀번호가 일치하지 않습니다
            </p>
          )}
        <Select
          aria-label='track'
          name='track'
          items={selectItems}
          placeholder='트랙을 선택하세요'
          onChange={inputHandler}
          value={inputs.track}
        >
          {(selectItem) => (
            <SelectItem key={selectItem.value}>{selectItem.value}</SelectItem>
          )}
        </Select>
        <div>
          <Checkbox
            id='adminCheck'
            name='admin'
            checked={inputs.isAdmin}
            placeholder='adminCheck'
            onChange={inputCheckHandler}
          >
            관리자이신가요?
          </Checkbox>
        </div>
        <Input
          aria-label='추천인 메일'
          type='text'
          placeholder='추천인 email'
          {...register('recommend', {
            required: '이메일을 입력하세요',
            pattern: {
              value: /^\S+@\S+$/i,
              message: '올바른 메일 형식이 아닙니다',
            },
          })}
        />
        {errors.recommend && (
          <p className='text-red-500 text-xs text-center'>
            {errors.recommend.message}
          </p>
        )}
        <div>
          <Button
            type='submit'
            color='danger'
            className='mr-2'
            isDisabled={
              !watchName ||
              !watchEmail ||
              !watchPassword ||
              !watchConfirmPassword ||
              !inputs.track ||
              !watchRecommend
            }
          >
            회원가입
          </Button>
          <Button type='button' onClick={cancelRegister}>
            취소
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
