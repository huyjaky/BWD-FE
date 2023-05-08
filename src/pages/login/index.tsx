import FooterRooms from '@/components/footers/footerRooms';
import HeaderLogin from '@/components/headers/headerLogin/headerLogin';
import EmptyLayout from '@/components/layouts/empty';
import LoginPanel from '@/components/loginPanel/LoginPanel';
import { NextPageWithLayout } from '@/models/layoutprops';

const Login: NextPageWithLayout = () => {
  return (
    <main>
      <HeaderLogin />
      <div className="w-full h-[calc(100vh-80px)] ">
        <div className="w-full h-full flex">
          <LoginPanel>
            <div></div>
          </LoginPanel>
        </div>
      </div>
      <FooterRooms />
    </main>
  );
};

Login.Layout = EmptyLayout;

export default Login;
