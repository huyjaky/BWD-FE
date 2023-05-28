import React, { useState } from 'react';
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

import ProcessBar from '../../components/CreateHome/ProcessBar/ProccessBar';
import { GetServerSideProps } from 'next';
import StepCongratulation from '@/components/CreateHome/Step/StepCongratulation';
function CreateHome(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(1);

  const [isMounted, setIsMounted] = useState(true);

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

  const steps = [
    { number: 1, component: <Step1CHome /> },
    { number: 2, component: <Step2CHome /> },
    { number: 3, component: <Step3CHome /> },
    { number: 4, component: <Step4CHome /> },
    { number: 5, component: <Step5CHome /> },
    { number: 6, component: <Step6CHome /> },
    { number: 7, component: <Step7CHome /> },
    { number: 8, component: <Step8CHome /> },
    { number: 9, component: <Step9CHome /> },
    { number: 10, component: <Step10Home /> },
    { number: 11, component: <Step11CHome /> },
    { number: 12, component: <Step12CHome /> },
    { number: 13, component: <Step13CHome /> },
    { number: 14, component: <Step14CHome /> },
    { number: 15, component: <Step15CHome /> },
    { number: 16, component: <Step16CHome /> },
    { number: 17, component: <Step17CHome /> },
    { number: 18, component: <StepCongratulation /> }
  ];

  return (
    <div className="">
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
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const cookies = req.cookies.access_token;
  // if (!cookies) {
  //   res.setHeader('location', '/login');
  //   res.statusCode = 302;
  //   res.end();
  //   return { props: {} };
  // }

  return { props: {} };
};

export default CreateHome;
