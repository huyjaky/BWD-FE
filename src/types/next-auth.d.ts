import { token } from '@/models/token';
import NextAuth, { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    userAcc: userAcc,
    token: {
      accessToken: string, refreshToken: string, status: string
    },
    exp: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userAcc: userAcc,
    token: {
      accessToken: string, refreshToken: string, status: string
    },
    exp: number
  }
}
