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

  return <>
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        transition={{ duration: 1 }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: 'circle(0.2% at 100% 0)'
          },
          animateState: {
            opacity: 1,
            clipPath: 'circle(150.0% at 100% 0)'
          }
        }}
      >
        <MapOptions>
          {children}
        </MapOptions>
      </motion.div>
    </AnimatePresence>
  </>;
};

export default authWithoutAnimate;
