import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   // Do whatever you want here, before the request is passed down to `NextAuth`
//   return await NextAuth(req, res, {
//     session: {
//       strategy: 'jwt',
//       maxAge: 24 * 60 * 60
//       // updateAge: 24 * 60 * 60,
//     },
//     jwt: {
//       maxAge: 24 * 60 * 60
//     },
//     callbacks: {
//       async jwt({ token, user }: { token: JWT; user: User | AdapterUser }): Promise<JWT> {
//         if (user) {
//           token.loginVl = user;
//         }
//         return token;
//       },

//       async session({ session, token, user }) {
//         session.token = { ...token?.loginVl?.token };
//         session.userAcc = { ...token?.loginVl?.userAcc };
//         return session;
//       }
//     },
//     providers: [
//       CredentialsProvider({
//         name: 'Credentials',
//         credentials: {
//           username: { label: 'Username', type: 'text' },
//           password: { label: 'Password', type: 'password' }
//         },
//         async authorize(credentials, req) {
//           const accessToken = await fetch(process.env.API_URL_AUTH + '/api/login', {
//             method: 'POST',
//             body: JSON.stringify(credentials),
//             headers: { 'Content-Type': 'application/json' }
//           });
//           const token = await accessToken.json();

//           if (accessToken.ok && token) {
//             return token;
//           }
//           return null;
//         }
//       })
//     ]
//   });
// }

export const authOptions: NextAuthOptions = {
  // your configs
  secret: process.env.SECRET_COOKIE_PASSWORD,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }): Promise<JWT> {
      if (user) {
        token.loginVl = user; // o day tao mot bien trung gian de khi du lieu fetch ve roi vao day
      }
      return token;
    },

    async session({ session, token, user }) {
      session.token = { ...token?.loginVl?.token }; // chia du lieu ra thanh nhieu phan nho 
      session.userAcc = { ...token?.loginVl?.userAcc };
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const accessToken = await fetch(process.env.API_URL_AUTH + '/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });
        const token = await accessToken.json();

        if (accessToken.ok && token) {
          return token;
        }
        return null;
      }
    })
  ]
};

export default NextAuth(authOptions);
