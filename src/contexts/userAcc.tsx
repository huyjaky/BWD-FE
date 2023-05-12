import { userAcc } from '@/models/userAcc';
import { ReactNode, createContext, useState } from 'react';

interface userAccProps {
  children: ReactNode;
}

const userAccDefaultData: { user: userAcc; setUser: (payload: userAcc) => void } = {
  user: {
    UserId: '',
    UserName: '',
    Password: '',
    Birth: new Date(),
    Gmail: '',
    Sex: '',
    Decentralization: '',
    PersonCode: '',
    CustomerType: '',
    error: ''
  },
  setUser: () => {}
};

export const userAccContext = createContext<{ user: userAcc; setUser: (payload: userAcc) => void }>(
  userAccDefaultData
);

const UserAccProvider = ({ children }: userAccProps) => {
  const [user, setUser_] = useState(userAccDefaultData.user);
  const setUser = (payload: userAcc) => setUser_(payload);

  const userAccDynamicData = { user, setUser };

  return <userAccContext.Provider value={userAccDynamicData}>{children}</userAccContext.Provider>;
};
export default UserAccProvider;
