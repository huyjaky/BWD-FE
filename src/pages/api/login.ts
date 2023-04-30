// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cookies from 'cookies';
import httpProxy, { ProxyReqCallback, ProxyResCallback } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'Method not supported' });
  }
  return new Promise(() => {
    // dont send cookies to api server
    req.headers.cookie = '';

    // copy at http-proxy docs Miscellaneous
    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = '';
      if (proxyRes.statusCode != 200) {
        (res as NextApiResponse)
          .status(500)
          .json({ message: 'Something went wrong', error: proxyRes.statusMessage });
        resolve();
      }

      proxyRes.on('data', function (chunk) {
        body += chunk;
      });

      proxyRes.on('end', function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);

          // convert to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development' });
          cookies.set('access_token', accessToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(expiredAt)
          });
          console.log(new Date(expiredAt).getHours());

          (res as NextApiResponse)
            .status(200)
            .json({ message: 'login successfully', accessToken: true });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: 'Something wrong', error: error + '' });
        }
        resolve();
      });
    };

    proxy.once('proxyRes', handleLoginResponse);

    // http://localhost:3500
    proxy.web(
      req,
      res,
      {
        target: process.env.API_URL_AUTH,
        changeOrigin: true,
        selfHandleResponse: true
      },
      function (err) {
        res.status(500).send('Oops, something went wrong.');
      }
    );
  });
}
