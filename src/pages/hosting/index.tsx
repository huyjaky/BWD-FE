import Header from '@/components/Hosting/components/Header';
import Main from '@/components/Hosting/components/Main';
import FooterRooms from '@/components/footers/footerRooms';
import { GetServerSideProps } from 'next';

interface indexProps{
  keyMapBox: string;
}

function index({keyMapBox}: indexProps): JSX.Element {
  return (
    <div>
      <Header />
      <Main keyMapBox={keyMapBox}/>
      <FooterRooms />
    </div>
  );
}

export default index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const keyMapBox = process.env.ACCESS_TOKEN_MAPBOX;
  return {
    props: {
      keyMapBox: keyMapBox
    }
  };
};