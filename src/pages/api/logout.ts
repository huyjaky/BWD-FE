// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';

// type Data = {
//   name: string
// }
export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  const cookies = new Cookies(req, res);
  cookies.set('access_token');

  return new Promise(() => {
    // http://localhost:3500
    proxy.web(
      req,
      res,
      {
        target: process.env.API_URL_AUTH,
        changeOrigin: true
      },
      function (err) {
        res.status(500).send('Oops, something went wrong.');
      }
    );
  });

  res.status(200).json({ message: 'Logout successfully' });
}
