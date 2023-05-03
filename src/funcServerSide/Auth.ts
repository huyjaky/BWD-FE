import { ServerResponse, IncomingMessage } from 'http';
import Cookies from 'js-cookie';

const Auth = (req: any, res: ServerResponse<IncomingMessage>) => {
  const isLogin = Cookies.get('access_token');
  console.log('check');
  if (!isLogin) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }
  return res;
};

export default Auth;
