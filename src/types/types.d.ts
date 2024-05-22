export interface registerReqData {
  username: string;
  password: string;
  checkPassword: string;
  email: string;
  track: string;
}

export interface loginReqData {
  password: string;
  email: string;
}
