import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterRooms from '@/components/footers/footerRooms';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';

interface indexProps{
  keyMapBing: string;
}

function index({keyMapBing}: indexProps): JSX.Element {
  return (
    <div>
      <Header />
      <Main keyMapBing={keyMapBing}/>
      <FooterRooms />
    </div>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;

  if (!session?.userAcc) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: {
      keyMapBing: keyMapBing
    }
  };
};