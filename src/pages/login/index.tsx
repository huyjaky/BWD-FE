import FooterRooms from '@/components/footers/footerRooms';
import HeaderLogin from '@/components/headers/headerLogin/headerLogin';
import EmptyLayout from '@/components/layouts/empty';
import LoginPanel from '@/components/loginPanel/LoginPanel';
import { NextPageWithLayout } from '@/models/layoutprops';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import HeaderForm from '@/components/headers/headerForm/HeaderForm';

interface LoginProps {
  keyChatEngine: string
}

const Login: NextPageWithLayout<LoginProps> = ({ keyChatEngine }: LoginProps) => {
  return (
    <main>
      <HeaderForm >
        <div></div>
      </HeaderForm>
      <div className="w-full h-[calc(100vh-5rem)] ">
        <div className="w-full h-full flex">
          <LoginPanel >
            <div></div>
          </LoginPanel>
        </div>
      </div>
      <FooterRooms />
    </main>
  );
};

Login.Layout = EmptyLayout;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyChatEngine = process.env.KEYCHAT_ENGINE;

  if (session?.userAcc) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {
      keyChatEngine: keyChatEngine
    }
  };
};

export default Login;
