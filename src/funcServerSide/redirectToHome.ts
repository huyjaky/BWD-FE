import { IncomingMessage, ServerResponse } from 'http';

const redirectToHome = async (
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> },
  res: ServerResponse<IncomingMessage>
) => {
  const isLogin = req.cookies.access_token;
  if (!isLogin) {
    res.writeHead(302, { Location: '/login' });
    res.end();
    return false;
  } else {
    return true;
  }
};

export default redirectToHome;
