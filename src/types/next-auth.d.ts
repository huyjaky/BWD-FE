import { token } from '@/models/token';
import NextAuth, { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    token?: User.accessToken;
    userAcc?: User.userAcc;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: User.accessToken;
    userAcc?: User.userAcc;
    loginVl?: User.loginVl;
  }
}
