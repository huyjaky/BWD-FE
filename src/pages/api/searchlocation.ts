import axios from 'axios';
import httpProxy, { ProxyReqCallback, ProxyResCallback } from 'http-proxy';
import type { NextApiRequest, NextApiResponse } from 'next';
import { json } from 'stream/consumers';

const proxy = httpProxy.createProxyServer();

const replaceString = (payload: string | undefined) => {
  if (payload == null) return;
  let place: string = '';
  for (let index = 0; index < payload.length; index++) {
    if (payload.charAt(index) === ' ') {
      place += '%20';
      continue;
    }
    place += payload.charAt(index);
  }
  return place;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST') {
    return res.status(404).json({ message: 'method not supported' });
  }

  const adminDistrict_: string | undefined = req.body.adminDistrict;
  const locality_: string | undefined = req.body.locality;
  const addressLine_: string | undefined = req.body.addressLine;
  const countryRegionIso2_: string | undefined = req.body.countryRegionIso2;

  if (!adminDistrict_ && !locality_ && !addressLine_ && !countryRegionIso2_) {
    return res.status(400).json({ message: 'address not valid' });
  }

  const adminDistrict: string = replaceString(adminDistrict_) || '-';
  const locality: string = replaceString(locality_) || '-';
  const addressLine: string = replaceString(addressLine_) || '-';
  const countryRegionIso2: string = replaceString(countryRegionIso2_) || '-';

  const token = process.env.ACCESS_TOKEN_BINGMAP;
  const urlBingMap: string = `http://dev.virtualearth.net/REST/v1/Locations/${countryRegionIso2}/${adminDistrict}/${locality}/${addressLine}?key=${token}`;
  return new Promise(() => {
    try {
      const handleRequest: ProxyReqCallback = async (proxyReq, req, res, options) => {
        try {
          const response = await axios.get(urlBingMap);
          if (response.status === 200) {
            res.write(JSON.stringify(response.data));
            res.end();
            return;
          }
        } catch (error) {
          return (res as NextApiResponse)
            .status(500)
            .json({ message: 'Internal server error' + error });
        }
      };

      proxy.on('proxyReq', handleRequest);

      proxy.web(req, res, {
        target: 'http://dev.virtualearth.net',
        changeOrigin: true,
        selfHandleResponse: true
      });
    } catch (error) {
      console.log(error);
    }
  });
}
