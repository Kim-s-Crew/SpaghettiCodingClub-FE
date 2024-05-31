// 로그인 & 회원가입
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

// 트랙

export interface tracksInfo {
  trackId: number;
  trackName: string;
}

// 트랙 참여자
export interface personData {
  userId: number;
  userName: string;
  trackId: number;
  trackName: string;
  joinedAt: string;
}

// 트랙 공지
export interface noticeData {
  noticeId: number;
  trackId: number;
  trackNoticeContent: string;
  trackNoticeTitle: string;
  userId: number;
}

export interface newNoticeData {
  trackNoticeTitle: string;
  trackNoticeContent: string;
}

export interface deleteNoticeData {
  trackId: number;
  noticeId: number;
}

// 평가
export interface assessmentData {
  background?: string;
  guidance?: string;
  relationship?: string;
  userId?: number;
}
