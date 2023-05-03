import httpProxy, { ProxyReqCallback, ProxyResCallback } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

const proxy = httpProxy.createProxyServer();


export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  return new Promise(() => {
    const que: string | undefined = req.body.address;
    try {
      if (que) {
        const place: string = encodeURIComponent(que);
        const token = process.env.ACCESS_TOKEN_BINGMAP;
        const urlBingMap: string = `http://dev.virtualearth.net/REST/v1/Locations?addressLine=${place}&maxResults=10&key=${token}`;
        console.log(urlBingMap);

        const handleResponse:ProxyResCallback = (proxyRes, req, res) => {
          
        }

        const handleLoginRequest:ProxyReqCallback = (proxyReq, req, res) => {
          proxyReq.method = 'GET';

        }

        proxy.on('proxyRes', handleResponse);
        proxy.on('proxyReq', handleLoginRequest);

        proxy.web(req, res, {
          target: urlBingMap,
          changeOrigin: true,
          selfHandleResponse: false,
        });
      } else {
        res.status(400).json({message: 'address not valid'})
      }
    } catch (error) {
      console.log(error);
    }
  });
}
