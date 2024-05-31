import axios from 'axios';

// 트랙 참여자 전체 조회
export const getStudents = async (trackId: number) => {
  const token = sessionStorage.getItem('token');
  console.log(token);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trackParticipants/${trackId}`,
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
