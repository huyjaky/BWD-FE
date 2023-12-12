

import ChooseTypeHouse from '@/components/createHome/componentCreateHome/chooseTypeHouse/chooseTypeHouse';
import FinishPage from '@/components/createHome/componentCreateHome/finishPage';
import HouseProperties from '@/components/createHome/componentCreateHome/houseProperties/houseProperties';
import ImgCreateHouse from '@/components/createHome/componentCreateHome/imgCreateHouse';
import MapCreateHouse from '@/components/createHome/componentCreateHome/mapCreateHouse';
import FooterCreateHome from '@/components/createHome/footerCreateHome';
import StepCreateHome from '@/components/createHome/stepCreateHome';
import TransitionCreateHome from '@/components/createHome/transitionCreateHome';
import HeaderForm from '@/components/headers/headerForm/HeaderForm';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';
import InputFormEdit from '@/components/main/showHouse/componentShowHouse/inputForm/inputFormEdit';
import { createHouseFormContext } from '@/contexts/createHouseForm';
import { StepCreateHomeContext } from '@/contexts/stepCreate';
import { NextPageWithLayout } from '@/models/layoutprops';
import { initializeSSR } from 'bing-maps-loader';
import { GetServerSideProps, GetStaticProps, GetStaticPropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { Montserrat } from 'next/font/google';
import { useContext, useEffect } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
interface CreateHomeProps {
  keyMapBing: string;
  api_url_path: string;
}

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
});
initializeSSR()

const CreateHouse: NextPageWithLayout<CreateHomeProps> = ({
  keyMapBing,
  api_url_path
}: CreateHomeProps): JSX.Element => {
  initializeSSR()
  const { setStepCreate, stepCreate } = useContext(StepCreateHomeContext)
  const { createHouseForm, setCreateHouseForm, typeHouseId, imgArr } = useContext(createHouseFormContext)
  useEffect(() => {
  }, [createHouseForm]);

  return (
    <>
      <HeaderForm>
        <div></div>
      </HeaderForm>
      <StepCreateHome />

      {/* choose type house */}

      <TransitionCreateHome isShow={stepCreate == 1}>
        {/* <div className="bg-orange-600 w-full h-[18.75rem]"></div> */}
        <HouseProperties />
      </TransitionCreateHome>


      <TransitionCreateHome isShow={stepCreate == 2}>
        <InputFormEdit styleDivAround="" styleFieldset="" styleLegend="" title="Address">
          <MapCreateHouse keyMapBing={keyMapBing} setTempHouse={setCreateHouseForm}
            tempHouse={createHouseForm}
          />
        </InputFormEdit>
      </TransitionCreateHome>

      <TransitionCreateHome isShow={stepCreate == 3}>
        <InputFormEdit styleDivAround=" before:hidden" styleFieldset="" styleLegend="" title="Images">
          <ImgCreateHouse api_url_path={api_url_path} />
        </InputFormEdit>
      </TransitionCreateHome>

      <TransitionCreateHome isShow={stepCreate > 3}>
        <FinishPage api_url_path={api_url_path} />
      </TransitionCreateHome>

      <FooterCreateHome />
    </>
  );
};

CreateHouse.Layout = AuthWithAnimate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  const api_url_path = process.env.NEXTAUTH_URL;
  initializeSSR();
  // if user available not callback api from server
  if (!session?.userAcc) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }
  return {
    props: {
      keyMapBing: keyMapBing,
      api_url_path: api_url_path
    }
  };
};


export default CreateHouse;
