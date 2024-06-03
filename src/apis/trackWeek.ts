import { newTrackWeekData } from '@/types/types';
import axios from 'axios';

const token = sessionStorage.getItem('token');

interface createTrackWeekProps {
  trackId: number;
  reqData: newTrackWeekData;
}

interface updateTrackWeekProps {
  trackId: number;
  weekId: number;
  reqData: string;
}

// 모든 주차 가져오기
export const getTrackWeeks = async (trackId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/weeks`,
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

// 새 주차 생성
export const createTrackWeek = async ({
  trackId,
  reqData,
}: createTrackWeekProps) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/weeks`,
      reqData,
      {
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
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

// 주차 수정
export const updateTrackWeek = async ({
  trackId,
  weekId,
  reqData,
}: updateTrackWeekProps) => {
  console.log('주차수정', trackId, weekId, reqData);
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}/weeks/${weekId}`,
      { weekName: reqData },
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
