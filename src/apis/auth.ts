import axios from 'axios';
import { registerReqData, loginReqData } from '@/types/types';

export const loginFn = async (reqData: loginReqData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auths/login`,
      JSON.stringify(reqData),
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

export const registerFn = async (reqData: registerReqData) => {
  console.log('회원가입 펑션 호출됨');
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auths/signup`,
      JSON.stringify(reqData),
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
