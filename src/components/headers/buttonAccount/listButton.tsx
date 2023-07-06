import { selectPopoverContext } from '@/contexts';
import { getHouseContext } from '@/contexts/getHouse';
import { userAccContext } from '@/contexts/userAcc';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useContext } from 'react';

const ListButton = () => {
  const { user, resetDataUser } = useContext(userAccContext);
  const { setIsLoginClick } = useContext(selectPopoverContext);
  const { isFilter, setIsFilter } = useContext(getHouseContext);
  return (
    <>
      <div className="w-full h-fit border-b-2">
        {user?.UserId == 'none user' ? (
          <>
            <button
              className="w-full py-4 text-left px-5"
              onClick={(event) => setIsLoginClick(true)}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <Link href={'hosting'}>
              <button className="w-full py-4 text-left px-5">Manage listings</button>
            </Link>
            <button className="w-full py-4 text-left px-5">Account</button>
            <button
              className="w-full py-4 text-left px-5"
              onClick={async () => {
                const logout = await signOut({
                  redirect: false
                });
                resetDataUser();
                setIsFilter('main');
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <div className="w-full h-fit">
        <Link href={'/'}>
          <div className="w-full py-4 text-left px-5">About us</div>
        </Link>
      </div>
    </>
  );
};

export default ListButton;
