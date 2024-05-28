import axios from 'axios';

export const getStudent = async () => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/trackParticipants/1`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
      // {
      //   timeout: 5000,
      // },
    );
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
