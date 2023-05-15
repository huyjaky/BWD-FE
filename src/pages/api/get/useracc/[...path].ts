// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sessionOptions } from '@/api-client/session';
import { userAcc } from '@/models/userAcc';
import Cookies from 'cookies';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import { withIronSessionApiRoute } from 'iron-session/next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';

export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = httpProxy.createProxyServer();

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  // convert cookies to header Authorization
  const cookies = new Cookies(req, res);
  const accessToken = cookies.get('access_token');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  // dont send cookies to api server
  req.headers.cookie = '';

  try {
    const userResponse = await new Promise<string>((resolve, reject) => {
      const handleUserResponse: ProxyResCallback = (proxyRes, req, res) => {
        let body = '';

        // fetch have err return to client
        if (proxyRes.statusCode != 200) {
          reject({
            status: 500,
            message: 'Something went wrong',
            error: proxyRes.statusMessage
          });
        }

        // get chunk and convert to data
        proxyRes.on('data', (chunk) => {
          body += chunk;
        });

        proxyRes.on('end', () => {
          resolve(body);
        });
      };

      proxy.web(req, res, {
        target: process.env.API_URL_PATH,
        changeOrigin: true,
        selfHandleResponse: true
      });
      proxy.once('proxyRes', handleUserResponse);
    });

    const user: userAcc = JSON.parse(userResponse);

    req.session = req.session ?? {};
    req.session.props = {
      user_: user,
      props: undefined
    };
    await req.session.save();

    res.status(200).json({ message: 'fetch Done', data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something wrong', error: error});
  }
};

export default withIronSessionApiRoute(handler, sessionOptions);

