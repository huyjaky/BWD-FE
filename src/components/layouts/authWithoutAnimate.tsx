import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { LayoutProps } from '@/models/layoutprops';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import MapOptions from './mapOptions';

const authWithoutAnimate = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const { isFilter } = useContext(getHouseContext);
  const { setUser, user } = useContext(userAccContext);
  const router = useRouter();
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
  }, [isFilter, status]);

  return (
    <>
      <MapOptions>{children}</MapOptions>
    </>
  );
};

export default authWithoutAnimate;
