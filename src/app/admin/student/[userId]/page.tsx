'use client';
import { deleteAssessment } from '@/apis/assesment';
import { getUserData } from '@/apis/auth';
import StudentComment from '@/components/admin/student/StudentComment';
import StudentInfo from '@/components/admin/student/StudentInfo';

import { Button, Divider, button } from '@nextui-org/react';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

const UserId = () => {
  const queryClient = useQueryClient();
  const param = useParams();
  const { userId } = param;
  console.log(param);

  const { data, isLoading } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserData(+userId),
    select: (data) => data.payload,
    enabled: !!userId,
  });

  const { mutate: removeAssessmentMutation } = useMutation({
    mutationFn: deleteAssessment,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        'trackNotice',
      ] as InvalidateQueryFilters);
    },
  });

  const deleteAssessmentHandler = async (assessmentId: number) => {
    Swal.fire({
      text: '학습/배경/관계 모든 내용이 삭제됩니다. 이 작업은 되돌릴 수 없습니다',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F31260',
      confirmButtonText: '삭제',
    }).then((result) => {
      if (result.isConfirmed) {
        removeAssessmentMutation(assessmentId);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  console.log(data);

  if (isLoading) {
    return <p>데이터 불러오는중...</p>;
  }

  if (!data) {
    return <p>데이터가 없습니다.</p>;
  }

  const { trackName, email, role, trackWeeks, username, assessments } = data;
  // console.log('평가', assessments[0]);

  //추후 BE 에서 assessments 배열 한꺼풀 벗겨 주기로 합의됨.

  if (!assessments) {
    return <p>여기다 리턴하면 아무고또 안생김</p>;
  }

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>{username}</h2>
      <StudentInfo trackName={trackName} trackWeeks={trackWeeks} />
      <Divider className='my-6' />
      {assessments[0] ? (
        <>
          <div className='flex justify-end'>
            <Button
              size='sm'
              onClick={() =>
                deleteAssessmentHandler(assessments[0].assessmentId)
              }
            >
              로그삭제
            </Button>
          </div>
          <StudentComment
            title={'학습'}
            assessmentId={assessments[0].assessmentId}
            content={assessments[0].guidance}
          />
          <Divider className='my-6' />
          <StudentComment
            title={'배경'}
            assessmentId={assessments[0].assessmentId}
            content={assessments[0].background}
          />
          <Divider className='my-6' />
          <StudentComment
            title={'관계'}
            assessmentId={assessments[0].assessmentId}
            content={assessments[0].relationship}
          />
        </>
      ) : (
        <>
          <StudentComment title={'학습'} />
          <Divider className='my-6' />
          <StudentComment title={'배경'} />
          <Divider className='my-6' />
          <StudentComment title={'관계'} />
        </>
      )}

      <Divider className='my-6' />
      <Button color='danger'>수강생 삭제</Button>
    </div>
  );
};

export default UserId;
