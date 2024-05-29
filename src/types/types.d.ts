export interface registerReqData {
  username: string;
  password: string;
  checkPassword: string;
  email: string;
  track?: string;
  recommendEmail?: string;
}

export interface loginReqData {
  password: string;
  email: string;
}
