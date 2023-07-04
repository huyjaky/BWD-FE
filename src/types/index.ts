import { JWT } from 'next-auth/jwt';
import { Session, User } from 'next-auth';
import { userAcc } from '@/models/userAcc';

export enum TokenError {
  RefreshAccessTokenError = 'RefreshAccessTokenError'
}

export interface ExtendedToken extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  user: User;
  error?: TokenError;
}

export interface ExtendedSession extends Session {
  accessToken: ExtendedToken['accessToken'];
  error: ExtendedToken['error'];
}
