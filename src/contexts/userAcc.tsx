import { userAcc } from '@/models/userAcc';
import { ReactNode, createContext, useState } from 'react';

interface userAccProps {
  children: ReactNode;
}

interface userrAccData {
  user: userAcc;
  setUser: (payload: userAcc) => void;
  resetDataUser: () => void;
}

const userAccDefaultData: userrAccData = {
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
    Image: '',
    error: ''
  },
  setUser: () => {},
  resetDataUser: () => {}
};

export const userAccContext = createContext<userrAccData>(userAccDefaultData);

const UserAccProvider = ({ children }: userAccProps) => {
  const [user, setUser_] = useState(userAccDefaultData.user);
  const setUser = (payload: userAcc) => setUser_(payload);
  const resetDataUser = () => setUser_(userAccDefaultData.user);

  const userAccDynamicData = { user, setUser, resetDataUser };

  return <userAccContext.Provider value={userAccDynamicData}>{children}</userAccContext.Provider>;
};
export default UserAccProvider;
