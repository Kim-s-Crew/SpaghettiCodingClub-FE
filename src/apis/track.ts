import axios from 'axios';

export const getTracks = async () => {
  const token = sessionStorage.getItem('token');
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
  } catch (err) {
    console.log(err);
  }
};
