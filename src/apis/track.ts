import { trackUpdateData } from '@/types/types';
import axios from 'axios';

const token = sessionStorage.getItem('token');

// 모든 트랙 가져오기(selector)
export const getTracks = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 새 트랙 생성
export const createTrack = async (reqData: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks`,
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
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};

// 트랙 삭제 - 아직 api 없음
// export const deleteTracks = async (trackId: number) => {
//   try {
//     const response = await axios.delete(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tracks/${trackId}`,
//       {
//         headers: {
//           Authorization: `${token}`,
//         },
//       },
//     );
//     console.log(response);
//     return response.data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// 트랙 수정
export const updateTrack = async ({ trackId, reqData }: trackUpdateData) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tracks/${trackId}`,
      { trackName: reqData },
      {
        headers: {
          'Content-Type': 'application/json', // Add Content-Type header
          Authorization: `${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
  }
};
