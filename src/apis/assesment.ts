import axios from 'axios';
import { assessmentData } from '@/types/types';

const token = sessionStorage.getItem('token');

interface updateAssessmentProps {
  assessmentId: number | undefined;
  reqBody: assessmentData;
}

//평가 수정
export const updateAssessment = async ({
  assessmentId,
  reqBody,
}: updateAssessmentProps) => {
  console.log(assessmentId, reqBody);
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/assessmentItems/${assessmentId}`,
      reqBody,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

//평가 생성
export const createAssessment = async (reqBody: assessmentData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/assessmentItems`,
      reqBody,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
