import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { LayoutProps } from '@/models/layoutprops';
import { useSession } from 'next-auth/react';
import { useContext, useEffect } from 'react';

const Auth = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const { isFilter } = useContext(getHouseContext);
  const { setUser, user } = useContext(userAccContext);
  useEffect(() => {
    const setuser = async () => {
      const temp = await session?.userAcc;
      if (temp) {
        setUser({ ...user, ...temp });
      } else {
        setUser({ ...user, UserId: 'none user' });
      }
    };
    setuser();
    console.log('auth');
  }, [isFilter, status]);

  return <>{children}</>;
};

export default Auth;
