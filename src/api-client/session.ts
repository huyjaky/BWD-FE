// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { house_ } from '@/models/house';
import { userAcc } from '@/models/userAcc';
import type { IronSessionData, IronSessionOptions } from 'iron-session';

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'session_ohyeah',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600
  },
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    props?: { user_: userAcc | undefined; props: any };
  }
}