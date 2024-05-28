'use client';
import { Button } from '@nextui-org/react';
import { getStudent } from '@/apis/student';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const Student = () => {
  const { data, error } = useQuery({
    queryKey: ['allStudent'],
    queryFn: getStudent,
  });
  useEffect(() => {
    console.log(data, error);
  }, [data, error]);
  return (
    <div>
      <Button>조회</Button>
    </div>
  );
};

export default Student;
