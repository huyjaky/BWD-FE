// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';


export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  return new Promise(() => {
    // convert cookies to header Authorization
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get('access_token');
    console.log(accessToken);
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
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
