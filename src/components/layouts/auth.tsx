import { userAccContext } from '@/contexts/userAcc';
import { LayoutProps } from '@/models/layoutprops';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

const Auth = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const { setUser } = useContext(userAccContext);
  if (session?.token && session.userAcc) setUser(session.userAcc);

  return <>{children}</>;
};

export default Auth;
