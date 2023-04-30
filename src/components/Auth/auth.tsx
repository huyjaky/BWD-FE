import { LayoutProps } from '@/models/layoutprops';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isLogin = Cookies.get('isLogin');
  useEffect(() => {
    if (isLogin) {
      router.push('/', undefined, { shallow: true });
    } else {
      router.push('/login', undefined, { shallow: true });
    }
  }, [isLogin]);

  return <div>{children}</div>;
};

export default Auth;
