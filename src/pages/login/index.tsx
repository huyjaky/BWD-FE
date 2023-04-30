import HeaderLogin from '@/components/headers/headerLogin/headerLogin';
import EmptyLayout from '@/components/layouts/empty';
import useAuth from '@/hooks/useAuth';
import { NextPageWithLayout } from '@/models/layoutprops';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login: NextPageWithLayout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleOnClick = async () => {
    const Login = await login({ username: username, password: password });
    const cookie = Cookies.set('isLogin', Login.accessToken);
    if (Login.accessToken) {
      router.push('/', undefined, { shallow: true });
    }
  };

  return (
    <main>
      <HeaderLogin/>
      
    </main>
  );
};

Login.Layout = EmptyLayout;

export default Login;
