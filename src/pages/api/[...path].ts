// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import httpProxy from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from './auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise(async () => {
    const session = await getServerSession(req, res, authOptions);
    const temp = session?.token?.accessToken;

    if (temp) {
      req.headers.Authorization = `Bearer ${temp}`;
    }

    // dont send cookies to api server
    req.headers.cookie = '';

    proxy.web(req, res, {
      target: process.env.API_URL_PATH,
      changeOrigin: true,
      selfHandleResponse: false
    });

    proxy.once('proxyRes', () => {});
  });
}
