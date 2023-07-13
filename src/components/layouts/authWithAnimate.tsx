import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { LayoutProps } from '@/models/layoutprops';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import Animate from './animate';
import MapOptions from './mapOptions';
import axios from 'axios';

const AuthWithAnimate = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const { isFilter } = useContext(getHouseContext);
  const { setUser, user } = useContext(userAccContext);
  useEffect(() => {
    const setuser = async () => {
      const temp = await session?.userAcc;
      if (temp?.UserId && temp?.UserName) {
        await axios.put('https://api.chatengine.io/users/',
          { username: temp.UserName, secret: temp.UserId },
          { headers: { "Private-key": '659aed62-8471-4685-beb3-d0209645877a' } }
        )
      }

      console.log(temp);
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
      <MapOptions>
        <Animate>{children}</Animate>
      </MapOptions>
    </>
  );
};

export default AuthWithAnimate;
