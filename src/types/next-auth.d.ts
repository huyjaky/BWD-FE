import { token } from '@/models/token';
import NextAuth, { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    // token?: {
    //   accessToken?: User.accessToken;
    //   refreshToken?: User.refreshToken;
    //   status?: User.status;
    // };
    // user?: {
    //   UserId?: User.UserId;
    //   UserName?: User.UserName;
    //   Password?: User.Password;
    //   Birth?: Date;
    //   Gmail?: User.Gmail;
    //   Sex?: User.Sex;
    //   Decentralization?: User.Decentralization;
    //   PersonCode?: User.PersonCode;
    //   CustomerType?: User.CustomerType;
    //   error?: any;
    // };

    token?: User.accessToken;
    userAcc?: User.userAcc;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // token?: {
    //   accessToken?: User.accessToken;
    //   refreshToken?: User.refreshToken;
    //   status?: User.status;
    // };
    // user?: {
    //   UserId?: User.UserId;
    //   UserName?: User.UserName;
    //   Password?: User.Password;
    //   Birth?: Date;
    //   Gmail?: User.Gmail;
    //   Sex?: User.Sex;
    //   Decentralization?: User.Decentralization;
    //   PersonCode?: User.PersonCode;
    //   CustomerType?: User.CustomerType;
    //   error?: any;
    // };

    token?: User.accessToken;
    userAcc?: User.userAcc;
    loginVl?: User.loginVl;
  }
}
