import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/CreateHome/Step/Header';
import Step1CHome from '../../components/CreateHome/Step/Step1CHome';
import Step2CHome from '../../components/CreateHome/Step/Step2CHome';
import Step3CHome from '../../components/CreateHome/Step/Step3CHome';
import Step4CHome from '../../components/CreateHome/Step/Step4CHome';
import Step5CHome from '../../components/CreateHome/Step/Step5CHome';
import Step6CHome from '../../components/CreateHome/Step/Step6CHome';
import Step7CHome from '../../components/CreateHome/Step/Step7CHome';
import Step8CHome from '../../components/CreateHome/Step/Step8CHome';
import Step9CHome from '../../components/CreateHome/Step/Step9CHome';
import Step10Home from '@/components/CreateHome/Step/Step10Home';
import Step11CHome from '@/components/CreateHome/Step/Step11CHome';
import Step12CHome from '@/components/CreateHome/Step/Step12CHome';
import Step13CHome from '@/components/CreateHome/Step/Step13CHome';
import Step14CHome from '@/components/CreateHome/Step/Step14CHome';
import Step15CHome from '@/components/CreateHome/Step/Step15CHome';
import Step16CHome from '@/components/CreateHome/Step/Step16CHome';
import Step17CHome from '@/components/CreateHome/Step/Step17CHome';
import { AnimatePresence } from 'framer-motion';
import { CreateHouseProvider } from '../../contexts/createHome';
import { newHouseContext } from '../../contexts/createHome';

import ProcessBar from '../../components/CreateHome/ProcessBar/ProccessBar';
import { GetServerSideProps, GetStaticProps, GetStaticPropsContext } from 'next';
import StepCongratulation from '@/components/CreateHome/Step/StepCongratulation';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import { initializeSSR } from 'bing-maps-loader';
import Script from 'next/script';
import { NextPageWithLayout } from '@/models/layoutprops';
import authWithoutAnimate from '@/components/layouts/authWithoutAnimate';
import { Montserrat } from 'next/font/google';
import AuthWithAnimate from '@/components/layouts/authWithAnimate';
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isMounted, setIsMounted] = useState(true);
  initializeSSR();

  const handleNextStep = () => {
    setIsMounted(false); // Gán giá trị false để unmount component
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep + 1);
      setIsMounted(true); // Gán giá trị true để mount component tiếp theo
    }, 1000); // Thời gian delay trước khi chuyển sang component tiếp theo
  };
  const handleBackStep = () => {
    setIsMounted(false); // Gán giá trị false để unmount component
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep - 1);
      setIsMounted(true); // Gán giá trị true để mount component tiếp theo
    }, 1000); // Thời gian delay trước khi chuyển sang component tiếp theo
  };

  const { state } = useContext(newHouseContext);

  let steps = [
    { number: 1, component: <Step1CHome />, data: '' },
    { number: 2, component: <Step2CHome />, data: 'type' },
    { number: 3, component: <Step3CHome />, data: 'place' },
    { number: 4, component: <Step4CHome keyMapBing={keyMapBing} />, data: 'address' },
    { number: 5, component: <Step5CHome keyMapBing={keyMapBing} />, data: 'addressConfirmation' },
    { number: 6, component: <Step6CHome />, data: 'placeInfo' },
    { number: 7, component: <Step7CHome />, data: 'kindOfBathrooms' },
    { number: 8, component: <Step8CHome />, data: 'encounter' },
    { number: 9, component: <Step9CHome />, data: '' },
    { number: 10, component: <Step10Home />, data: 'amenities' },
    { number: 11, component: <Step11CHome api_url_path={api_url_path} />, data: '' },
    { number: 12, component: <Step12CHome />, data: 'title' },
    { number: 13, component: <Step13CHome />, data: 'description' },
    { number: 14, component: <Step14CHome />, data: '' },
    { number: 15, component: <Step15CHome />, data: 'guest' },
    { number: 16, component: <Step16CHome />, data: 'price' },
    { number: 17, component: <Step17CHome />, data: 'note' },
    { number: 18, component: <StepCongratulation api_url_path={api_url_path} />, data: '' }
  ];

  return (
    <>
      <CreateHouseProvider>
        <div className={`${monsterrat.className}`}>
          {currentStep > 0 && currentStep <= 17 && <Header />}

          <AnimatePresence>
            {currentStep > 0 &&
              currentStep <= 18 &&
              currentStep === steps[currentStep - 1].number &&
              isMounted &&
              steps[currentStep - 1].component}
          </AnimatePresence>

          {currentStep > 0 && currentStep <= 17 && (
            <ProcessBar
              steps={steps}
              handleBackStep={handleBackStep}
              handleNextStep={handleNextStep}
              currentStep={currentStep}
              // data={state}
            />
          )}
        </div>
      </CreateHouseProvider>
    </>
  );
};

CreateHome.Layout = AuthWithAnimate;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const keyMapBing = process.env.ACCESS_TOKEN_BINGMAP;
  const api_url_path = process.env.API_URL_PATH;
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

export default CreateHome;
