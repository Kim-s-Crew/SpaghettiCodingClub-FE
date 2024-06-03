import { createScheduleData } from '@/types/types';
import axios from 'axios';

const token = sessionStorage.getItem('token');

// 새 일정 생성 API
export const createSchedule = async (reqData: createScheduleData) => {
  try {
    console.log(reqData);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/schedules`,
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
