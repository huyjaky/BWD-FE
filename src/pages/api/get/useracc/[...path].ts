// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';
import { resolve } from 'path';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@/api-client/session';

export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = httpProxy.createProxyServer();

const handler = (req: NextApiRequest, res: NextApiResponse<any>) => {
  // convert cookies to header Authorization
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get('access_token');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  // dont send cookies to api server
  req.headers.cookie = '';
  return new Promise(() => {
    const handleUserResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';

      // fetch have err return to client
      if (proxyRes.statusCode != 200) {
        (res as NextApiResponse)
          .status(500)
          .json({ message: 'Something went wrong', error: proxyRes.statusMessage });
        resolve();
      }

      // get chunk and convert to data
      proxyRes.on('data', (chunk) => {
        body += chunk;
      });

      proxyRes.on('end', async () => {
        const user = JSON.parse(body);
        req.session.user = { ...req.session.user, ...user };
        console.log(req.session.user);
        await req.session.save();
        try {
          (res as NextApiResponse).status(200).json({ ...user });
        } catch (error) {
          console.log(error);
          (res as NextApiResponse)
            .status(500)
            .json({ message: 'Something wrong', error: error + '' });
        }
      });
    };

    proxy.web(req, res, {
      target: process.env.API_URL_PATH,
      changeOrigin: true,
      selfHandleResponse: true
    });
    proxy.once('proxyRes', handleUserResponse);
  });
};

export default withIronSessionApiRoute(handler, sessionOptions);
