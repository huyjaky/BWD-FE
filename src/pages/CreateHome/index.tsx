

import ChooseTypeHouse from '@/components/createHome/componentCreateHome/chooseTypeHouse/chooseTypeHouse';
import HouseProperties from '@/components/createHome/componentCreateHome/houseProperties/houseProperties';
import FooterCreateHome from '@/components/createHome/footerCreateHome';
import StepCreateHome from '@/components/createHome/stepCreateHome';
import TransitionCreateHome from '@/components/createHome/transitionCreateHome';
import HeaderForm from '@/components/headers/headerForm/HeaderForm';
import authWithoutAnimate from '@/components/layouts/authWithoutAnimate';
import { StepCreateHomeContext } from '@/contexts/stepCreate';
import { NextPageWithLayout } from '@/models/layoutprops';
import { initializeSSR } from 'bing-maps-loader';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { Montserrat } from 'next/font/google';
import { useContext } from 'react';
interface CreateHomeProps {
  keyMapBing: string;
  api_url_path: string;
}

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});

const CreateHome: NextPageWithLayout<CreateHomeProps> = ({
  keyMapBing,
  api_url_path
}: CreateHomeProps): JSX.Element => {
  const { setStepCreate, stepCreate } = useContext(StepCreateHomeContext)
  return (
    <>
      <HeaderForm>
        <div></div>
      </HeaderForm>
      <StepCreateHome />

      {/* choose type house */}
      <TransitionCreateHome isShow={stepCreate == 1}>
        <div className="w-full h-fit">
          <ChooseTypeHouse />
        </div>
      </TransitionCreateHome>


      <TransitionCreateHome isShow={stepCreate == 2}>
        {/* <div className="bg-orange-600 w-full h-[18.75rem]"></div> */}
        <HouseProperties api_url_path={api_url_path} keyMapBing={keyMapBing}/>
      </TransitionCreateHome>


      <TransitionCreateHome isShow={stepCreate == 3}>
        <div className="bg-blue-500 w-full h-[18.75rem]"></div>
      </TransitionCreateHome>


      <TransitionCreateHome isShow={stepCreate == 4}>
        <div className="bg-blue-500 w-full h-[18.75rem]"></div>
      </TransitionCreateHome>

      <TransitionCreateHome isShow={stepCreate == 5}>
        <div className="bg-blue-500 w-full h-[18.75rem]"></div>
      </TransitionCreateHome>


      <TransitionCreateHome isShow={stepCreate > 5}>
        <div className="bg-blue-500 w-full h-[18.75rem]"></div>
      </TransitionCreateHome>

      <FooterCreateHome />
    </>
  );
};

CreateHome.Layout = authWithoutAnimate;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getServerSession(req, res, authOptions);
//   const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
//   const api_url_path = process.env.API_URL_PATH;
//   initializeSSR();
//   // if user available not callback api from server
//   if (!session?.userAcc) {
//     res.setHeader('location', '/login');
//     res.statusCode = 302;
//     res.end();
//     return { props: {} };
//   }
//   return {
//     props: {
//       keyMapBing: keyMapBing,
//       api_url_path: api_url_path
//     }
//   };
// };

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  initializeSSR();
  const link = process.env.API_URL_PATH;
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  return {
    props: {
      keyMapBing: keyMapBing,
      link: link
    },
    revalidate: 300
  };
};

export default CreateHome;
