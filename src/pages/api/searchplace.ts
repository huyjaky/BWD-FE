import axios from 'axios';
import httpProxy, { ProxyReqCallback, ProxyResCallback } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';

const proxy = httpProxy.createProxyServer();

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  const que: string | undefined = req.body.address;
  if (!que) return res.status(400).json({ message: 'address not valid' });

  const place: string = encodeURIComponent(que);
  const token = process.env.ACCESS_TOKEN_BINGMAP;
  const urlBingMap: string = `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${place}&maxResults=10&key=${token}`;

  return new Promise(() => {
    try {
      const handleRequest: ProxyReqCallback = async (proxyReq, req, res, options) => {
        try {
          const response = await axios.get(urlBingMap);
          res.write(JSON.stringify(response.data));
          res.end();
          return;
        } catch (error) {
          console.log(error);
          (res as NextApiResponse).status(500).json({ message: 'Internal server error' });
          return;
        }
      };

      proxy.on('proxyReq', handleRequest);

      proxy.web(req, res, {
        target: urlBingMap,
        changeOrigin: true,

        selfHandleResponse: true

      });
    } catch (error) {
      console.log(error);
    }
  });
}
